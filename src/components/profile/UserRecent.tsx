// src/components/profile/UserRecent.tsx

import { Card, CardContent } from "../ui/card";
import React, { useEffect, useState } from "react";

import { Button } from "../ui/button";
import { GambaTransaction } from "gamba-core-v2";
import { RecentPlay } from "@/utils/RecentPlay";
import { ShareModal } from "../shared/ShareModal";
import { TimeDiff } from "@/utils/TimeDiff";
import { useRecentPlays } from "../../hooks/useRecentPlays";
import { useWallet } from "@solana/wallet-adapter-react";

export default function UserRecentPlays() {
  const { publicKey } = useWallet();
  const events = useRecentPlays(true, publicKey?.toBase58());
  const [selectedGame, setSelectedGame] =
    useState<GambaTransaction<"GameSettled"> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (events) {
      setIsLoading(false);
    }
  }, [events]);

  if (!publicKey) {
    return <div>Please connect your wallet to view recent plays.</div>;
  }

  return (
    <div className="w-full relative flex flex-col gap-2.5">
      {selectedGame && (
        <ShareModal
          event={selectedGame}
          onClose={() => setSelectedGame(null)}
        />
      )}

      {isLoading ? (
        Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className="h-10 w-full rounded-lg animate-Skeleton bg-gray-300"
          ></div>
        ))
      ) : events.length === 0 ? (
        <div className="w-full relative flex flex-col gap-2.5">
          <Card className="rounded-lg bg-card m-0">
            <CardContent className="flex items-center justify-between gap-2 p-2.5">
              <div className="text-gray-300 flex items-center gap-2">
                No Recent Game Events Found
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        events.map((tx, index) => (
          <Card
            key={tx.signature + "-" + index}
            className="rounded-lg bg-accent hover:bg-background m-0"
          >
            <CardContent
              onClick={() => setSelectedGame(tx)}
              className="flex items-center justify-between gap-2 p-2.5 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <RecentPlay event={tx} />
              </div>
              <TimeDiff time={tx.time} />
            </CardContent>
          </Card>
        ))
      )}

      <Button
        className="inline-flex items-center justify-center px-4 py-4 bg-gradient-to-r from-base to-teal-400 leading-none rounded hover:from-teal-400 hover:to-base transition-all duration-500 ease-in-out"
        onClick={() =>
          window.open(
            `https://explorer.gamba.so/player/${publicKey?.toBase58()}`,
          )
        }
      >
        🚀 View All
      </Button>
    </div>
  );
}
