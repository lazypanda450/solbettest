import { PlayerLeaderboard } from "../platform/player-leaderboard";
import React from "react";

export default function LeaderboardInfo() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-0 md:gap-12 mx-auto md:py-12">
      <div className="text-area md:w-1/2 space-y-6 md:p-8 md:px-12">
        <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm border border-base dark:bg-gray-800">
          Leaderboard
        </div>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Climb to Victory.
        </h2>
        <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
          Your skill determines your fortune. As you play, your wins accumulate,
          propelling you up the leaderboard. Compete against others and push for
          the top — every play could be your winning move.
        </p>
        <p className="text-gray-500 md:text-xl/relaxed dark:text-gray-400">
          Showcase your prowess in our suite of games. Each victory inches you
          closer to the summit. Can you outmaneuver and outplay to become the
          ultimate champion? It’s more than a game; it’s a quest for the crown.
        </p>
      </div>

      <div className="md:mb-0 space-y-4 md:p-8 md:px-12">
        <PlayerLeaderboard />
      </div>
    </section>
  );
}
