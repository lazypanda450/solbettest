// src/components/layout/Header.tsx

import React, { useState } from "react";
import {
  TokenValue,
  useCurrentPool,
  useCurrentToken,
  useUserBalance,
} from "gamba-react-ui-v2";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Modal } from "@/components/ui/Modal";
import TokenSelect from "@/components/ui/TokenSelect";
import { UserButton } from "@/components/ui/UserButton";
import { useWallet } from "@solana/wallet-adapter-react";

export default function Header() {
  const pool = useCurrentPool();
  const token = useCurrentToken();
  const balance = useUserBalance();
  const [bonusHelp, setBonusHelp] = useState(false);
  const [jackpotHelp, setJackpotHelp] = useState(false);
  const { wallet } = useWallet();
  return (
    <>
      {bonusHelp && (
        <Modal onClose={() => setBonusHelp(false)}>
          <h1 className="font-gaming text-xl">You have a bonus!</h1>
          <p>
            You have{" "}
            <b>
              <TokenValue amount={balance.bonusBalance} />
            </b>{" "}
            worth of free plays. This bonus will be applied automatically when
            you play.
          </p>
        </Modal>
      )}
      {jackpotHelp && (
        <Modal onClose={() => setJackpotHelp(false)}>
          <div className="text-lg font-semibold text-center font-gaming">
            {token.name} Jackpot Details
          </div>
          {pool.jackpotBalance > 0 && (
            <div className="flex text-[#003c00] rounded-lg bg-[#03ffa4] px-2.5 py-0.5 uppercase font-bold font-mono">
              <TokenValue amount={pool.jackpotBalance} />
            </div>
          )}
          <div className="mt-4">
            <p>
              The Jackpot grows with each game played, funded by fees from
              unsuccessful attempts to win it. Winning the jackpot not only
              grants substantial rewards but also recycles a tiny portion of the
              winnings back into the main liquidity pool, sustaining the games
              economy.
            </p>
            <div className="mt-4">
              <div>
                <strong>Pool Fee:</strong> {pool.poolFee}%
              </div>
              <div>
                <strong>Liquidity:</strong>{" "}
                <TokenValue amount={Number(pool.liquidity)} />
              </div>
              <div>
                <strong>Minimum Wager:</strong>{" "}
                <TokenValue amount={pool.minWager} />
              </div>
              <div>
                <strong>Maximum Payout:</strong>{" "}
                <TokenValue amount={pool.maxPayout} />
              </div>
            </div>
            <div className="mt-4 text-center">
              <Button className="inline-flex items-center justify-center px-4 py-4 bg-gradient-to-r from-base to-teal-400 leading-none rounded hover:from-teal-400 hover:to-base transition-all duration-500 ease-in-out">
                <a
                  href={`https://explorer.gamba.so/pool/${pool.publicKey.toString()}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Pool on Explorer
                </a>
              </Button>
            </div>
          </div>
        </Modal>
      )}
      <div className="md:bg-background fixed top-0 left-0 w-full h-16 z-40">
        <div className="md:border border-gray-600/50 border-b border-x md:rounded-xl rounded-b-xl bg-gray-900/80 backdrop-blur-xl flex items-center justify-between w-full md:w-[calc(100%-2rem)] p-3 fixed top-0 left-0 z-50 md:m-4 shadow-2xl shadow-black/20 md:bg-gradient-to-r md:from-gray-900/90 md:to-gray-800/90">
          <div className="flex gap-5 items-center">
            <Link href="/" passHref>
              <div className="flex items-center gap-3 cursor-pointer transition-transform duration-300 hover:scale-105">
                <div className="h-10 m-0">
                  <img alt="Gamba logo" src="/logo.png" className="h-full drop-shadow-lg" />
                </div>
                <div className="text-2xl font-bold font-gaming bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
                  SOLBET
                </div>
              </div>
            </Link>
          </div>
          <div className="max-sm:text-xs max-sm:gap-1 flex gap-2.5 items-center relative">
            {wallet && (
              <>
                {pool.jackpotBalance > 0 && (
                  <button
                    onClick={() => setJackpotHelp(true)}
                    className="hidden md:flex all-unset cursor-pointer text-black rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 px-3 py-2 text-xs uppercase font-bold font-mono transition-all duration-300 hover:shadow-lg hover:shadow-green-400/25 hover:scale-105 border border-green-300/30"
                  >
                    <TokenValue amount={pool.jackpotBalance} />
                  </button>
                )}
                {balance.bonusBalance > 0 && (
                  <button
                    onClick={() => setBonusHelp(true)}
                    className="hidden md:flex all-unset cursor-pointer text-black rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-2 text-xs uppercase font-bold font-mono transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/25 hover:scale-105 border border-yellow-300/30"
                  >
                    +<TokenValue amount={balance.bonusBalance} />
                  </button>
                )}
                <TokenSelect />
              </>
            )}

            <UserButton />
          </div>
        </div>
      </div>
    </>
  );
}
