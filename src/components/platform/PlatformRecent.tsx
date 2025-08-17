// src/components/platform/PlatformRecent.tsx

import { Card, CardContent } from "../ui/card";
import React, { useState } from "react";

import { Button } from "../ui/button";
import { GambaTransaction } from "gamba-core-v2";
import { PLATFORM_EXPLORER_URL } from "../../../config";
import { RecentPlay } from "@/utils/RecentPlay";
import { ShareModal } from "../shared/ShareModal";
import { TimeDiff } from "@/utils/TimeDiff";
import { useRecentPlays } from "../../hooks/useRecentPlays";

export default function PlatformRecent() {
  const events = useRecentPlays(true);
  const [selectedGame, setSelectedGame] =
    useState<GambaTransaction<"GameSettled"> | null>(null);

  return (
    <div className="w-full relative flex flex-col gap-2.5">
      <h2 className="text-2xl font-bold text-center pt-4">Recent Games</h2>
      {selectedGame && (
        <ShareModal
          event={selectedGame}
          onClose={() => setSelectedGame(null)}
        />
      )}
      {events.length === 0 &&
        Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className="h-10 w-full rounded-lg animate-Skeleton bg-gray-300"
          ></div>
        ))}
      {events.map((tx, index) => (
        <Card
          key={tx.signature + "-" + index}
          className="rounded-lg bg-accent hover:bg-background border border-base m-0"
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
      ))}
      <Button
        className="inline-flex items-center justify-center px-4 py-4 bg-gradient-to-r from-base to-teal-400 leading-none rounded hover:from-teal-400 hover:to-base transition-all duration-500 ease-in-out"
        onClick={() => window.open(PLATFORM_EXPLORER_URL)}
      >
        🚀 View All
      </Button>
    </div>
  );
}
