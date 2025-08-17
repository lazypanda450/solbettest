// src/components/platform/GlobalRecent.tsx

import { BPS_PER_WHOLE, GambaTransaction } from "gamba-core-v2";
import { Card, CardContent } from "../ui/card";
import React, { useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TokenValue, useTokenMeta } from "gamba-react-ui-v2";

import { ShareModal } from "../shared/ShareModal";
import { extractMetadata } from "@/utils/utils";
import { useRecentPlays } from "../../hooks/useRecentPlays";

function RecentPlay({ event }: { event: GambaTransaction<"GameSettled"> }) {
  const data = event.data;
  const token = useTokenMeta(data.tokenMint);

  const multiplier = data.bet[data.resultIndex.toNumber()] / BPS_PER_WHOLE;
  const wager = data.wager.toNumber();
  const payout = multiplier * wager;
  const profit = payout - wager;

  const { game } = extractMetadata(event);

  if (!game || !data) {
    return (
      <div className="text-gray-300 flex items-center gap-2">
        No Recent Game Events Found
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center">
        {game ? (
          <img
            src={`/games/${game.id}/logo.png`}
            alt={`Splash for ${game.meta.name}`}
            className="w-20 md:w-32 h-full"
          />
        ) : null}
        <div className="text-base md:text-md text-xs">
          {`${data.user.toBase58().substring(0, 4)}...${data.user
            .toBase58()
            .slice(-4)}`}
        </div>
        <div
          className={`md:text-md text-xs flex gap-1 md:gap-2 items-center rounded-lg p-1 ${
            profit > 0 ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <img src={token.image} className="w-4 md:w-6 rounded-full" />
          <TokenValue amount={Math.abs(profit)} mint={data.tokenMint} />
        </div>
        <div className="hidden md:flex flex-col">
          {data.jackpotPayoutToUser.toNumber() > 0 && (
            <div className="animate-jackpotGradient flex gap-2 items-center text-black rounded-lg p-1">
              +
              <TokenValue
                mint={data.tokenMint}
                amount={data.jackpotPayoutToUser.toNumber()}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function LiveWins() {
  const events = useRecentPlays();
  const [selectedGame, setSelectedGame] =
    useState<GambaTransaction<"GameSettled"> | null>(null);

  return (
    <>
      <div className="w-full relative flex flex-row gap-2.5">
        {selectedGame && (
          <ShareModal
            event={selectedGame}
            onClose={() => setSelectedGame(null)}
          />
        )}
        <ScrollArea className="w-[90svw] md:w-[60svw] lg:w-[70svw] xl:w-[80svw] whitespace-nowrap rounded-md border flex-1  overflow-hidden">
          <div className="absolute top-0 left-0 h-full bg-[#2d364a] rounded-l-md overflow-hidden">
            <div className="flex w-4 h-full flex-col items-center justify-center p-1 gap-8">
              <span className="transform -rotate-90 text-white text-sm font-medium">
                Live Wins
              </span>
              <span className="w-2 h-2 bg-base animate-pulse rounded-full shadow-md ring-1 ring-green-600"></span>
            </div>
          </div>

          <div className="flex w-max space-x-4 p-4 ml-2">
            {events.length === 0 &&
              Array.from({ length: 12 }, (_, i) => (
                <>
                  <Card
                    key={i}
                    className="h-36 w-36 rounded-lg animate-Skeleton bg-gray-300"
                  >
                    <CardContent className="flex flex-col items-center justify-center">
                      <div className="mt-2 mb-1 h-full w-full flex items-center justify-center">
                        <img
                          src="/SOL.png"
                          alt="Solana logo"
                          className="rounded-full w-16 h-16"
                        />
                      </div>
                      <div className="text-xs text-center font-bold">
                        Loading...
                      </div>
                      <div
                        className={`md:text-md text-xs flex gap-1 md:gap-2 items-center rounded-lg p-1 bg-green-500`}
                      >
                        <img
                          src="/SOL.png"
                          className="w-4 md:w-6 rounded-full"
                        />
                        <p>0.0 SOL</p>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ))}
            {events.map((tx, index) => (
              <Card
                key={tx.signature + "-" + index}
                className="flex flex-col rounded-lg bg-accent hover:bg-background border border-base m-0"
              >
                <CardContent
                  onClick={() => setSelectedGame(tx)}
                  className="flex items-center justify-between gap-1 p-2 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <RecentPlay event={tx} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
