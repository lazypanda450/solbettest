/**
 * COPYRIGHT NOTICE
 * =================
 * This source code and its games "wheel", "keno", "limbo", "roulettev2", "race", "slides" are free and provided under MIT license.
 * A crucial aspect of using this code is the inclusion of a developer fee mechanism. This fee, directed to the GameDev,
 * "GzzWXXDjLD4FDwDkWB5sARjC2aaLSfCQDjx3dmpoTY7K" supports ongoing development and maintenance.
 *
 * Conditions:
 * 1. The Gamedev developer's fee mechanism must not be altered or removed. This ensures support for future updates and game development.
 * 2. Modifying this code or its fee mechanism may lead to legal consequences. We aim to maintain a respectful and supportive open-source environment.
 * 3. This fee applies only to games developed by "bankkmatic". Feel free to exclude any of my games to avoid the fee.
 *
 * Your support through adherence to these terms helps sustain a thriving open-source gaming ecosystem. Thank you.
 */

import { PublicKey, SystemProgram } from "@solana/web3.js";
import { useGambaPlatformContext, useUserBalance } from "gamba-react-ui-v2";
import { useGambaProvider, useSendTransaction } from "gamba-react-v2";

import { getPoolAddress } from "gamba-core-v2";

interface PlayParams {
  wager: number;
  bet: number[];
}

export const BankkMaticGames = [
  "wheel",
  "keno",
  "limbo",
  "roulettev2",
  "race",
  "slides",
];
export const gambaOriginalsGameIds = [
  "dice",
  "slots",
  "flip",
  "hilo",
  "mines",
  "plinko",
  "roulette",
];

export default function useCustomPlay(gameId: string) {
  const gambaProvider = useGambaProvider();
  const sendTransaction = useSendTransaction();
  const platformContext = useGambaPlatformContext();
  const balances = useUserBalance();

  return async ({ wager, bet }: PlayParams) => {
    if (balances.balance < wager) {
      throw new Error("Insufficient SOL balance. Please deposit more funds.");
    }

    const feeLamports = 1e9 * 0.001;
    if (balances.balance < wager + feeLamports) {
      throw new Error(
        "Insufficient funds for transaction fee. Please deposit more funds.",
      );
    }

    const transferSolInstruction = SystemProgram.transfer({
      fromPubkey: gambaProvider.wallet.publicKey,
      toPubkey: new PublicKey("GzzWXXDjLD4FDwDkWB5sARjC2aaLSfCQDjx3dmpoTY7K"),
      lamports: feeLamports,
    });

    const playInstruction = await gambaProvider.play(
      wager,
      bet,
      platformContext.clientSeed,
      getPoolAddress(
        platformContext.selectedPool.token,
        platformContext.selectedPool.authority,
      ),
      platformContext.selectedPool.token,
      platformContext.platform.creator,
      platformContext.defaultCreatorFee,
      platformContext.defaultJackpotFee,
      `0:${gameId}:BankkMaticGames`,
      balances.bonusBalance > 0,
    );

    return sendTransaction([transferSolInstruction, playInstruction]);
  };
}
