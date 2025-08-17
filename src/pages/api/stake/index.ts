// api/stake/index.ts

import { AnchorProvider, Program, web3 } from "@project-serum/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
import { NextApiRequest, NextApiResponse } from "next";

import { NodeWallet } from "../../../utils/walletUtils";
import idl from "../../../utils/stakeidl.json";

// Define the type of stakeAccount
interface StakeAccount {
  publicKey: string;
  account: {
    owner: string;
    solStaked: bigint;
    startTime: bigint;
    lastClaimTime: bigint;
    claimableAmount: string;
  };
}

async function fetchStakeAccounts(req: NextApiRequest, res: NextApiResponse) {
  try {
    const serverKeypair = web3.Keypair.generate();
    const wallet = new NodeWallet(serverKeypair);
    const programID = new PublicKey(
      "5kP2Xzwtu6tavCubsRcPtrXkuZTNVGcAhd5JSyPhJUVp",
    );

    const connection = new Connection(
      "https://api.devnet.solana.com",
      "confirmed",
    );
    const provider = new AnchorProvider(connection, wallet as any, {
      preflightCommitment: "processed",
    });
    const program = new Program(idl as any, programID, provider);

    // Fetch all stake accounts
    const programAccounts = await program.account.stakeAccount.all();

    const now = Math.floor(Date.now() / 1000);
    const stakeAccounts: StakeAccount[] = programAccounts.map((account) => {
      const acc: any = account.account;

      const solStaked = parseInt(acc.solStaked) / 1e9;
      const startTime = parseInt(acc.startTime);
      const elapsedSeconds = now - startTime;
      const claimAmount = solStaked * elapsedSeconds * (80 / (24 * 60 * 60));
      const claimAmountToFixed = claimAmount.toFixed(2);

      return {
        publicKey: account.publicKey.toString(),
        account: {
          owner: acc.owner.toString(),
          solStaked: acc.solStaked.toString(),
          startTime: acc.startTime.toString(),
          lastClaimTime: acc.lastClaimTime.toString(),
          claimableAmount: claimAmountToFixed,
        },
      };
    });

    // Filter by owner if publicKey query param is provided
    const publicKey = req.query.publickey as string;
    if (publicKey) {
      const filteredAccounts = stakeAccounts.filter(
        (account) => account.account.owner === publicKey,
      );
      if (filteredAccounts.length > 0) {
        res.status(200).json(filteredAccounts);
      } else {
        res
          .status(404)
          .json({ error: "No stake accounts found for the provided owner" });
      }
    } else {
      res.status(200).json(stakeAccounts);
    }
  } catch (error) {
    console.error("Failed to fetch stake accounts:", error);
    res.status(500).json({ error: "Failed to fetch stake accounts" });
  }
}

export default fetchStakeAccounts;
