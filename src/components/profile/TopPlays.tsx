// src/components/profile/TopPlays.tsx
import { Avatar, AvatarFallback } from "../ui/avatar";
import React, { useEffect, useState } from "react";

import { Card } from "../ui/card";
import { PublicKey } from "@solana/web3.js";

type Play = {
  signature: string;
  user: string;
  usd_profit: number;
  jackpot: number;
  multiplier: number;
};

const fetchTopPlaysData = async (userAddress: PublicKey): Promise<Play[]> => {
  const response = await fetch(
    `/api/gamba/top-plays?player=${encodeURIComponent(
      userAddress.toString(),
    )}&limit=5`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch top plays data");
  }
  return response.json();
};

interface TopPlaysProps {
  userPublicKey: PublicKey;
}

export const TopPlays: React.FC<TopPlaysProps> = ({ userPublicKey }) => {
  const [topPlays, setTopPlays] = useState<Play[]>([]);

  useEffect(() => {
    if (userPublicKey) {
      fetchTopPlaysData(userPublicKey)
        .then((data) => {
          const topFivePlays = data.slice(0, 5);
          setTopPlays(topFivePlays);
        })
        .catch((error) => {
          console.error("Failed to fetch top plays:", error);
        });
    }
  }, [userPublicKey]);

  const generateSolanaLink = (signature: string) => {
    return `https://explorer.gamba.so/tx/${signature}`;
  };

  return (
    <div className="space-y-4">
      {topPlays.map((play, index) => (
        <Card
          key={play.signature + "-" + index}
          onClick={() =>
            window.open(generateSolanaLink(play.signature), "_blank")
          }
          className="cursor-pointer flex items-center justify-between p-2 rounded-lg bg-accent hover:bg-background border border-base"
        >
          <div className="flex items-center gap-4">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-card">
                {play.user.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                Multiplier: {play.multiplier}x
              </p>
              {play.jackpot > 0 && (
                <span className="hidden md:flex all-unset cursor-pointer text-[#003c00] rounded-lg bg-[#03ffa4] px-2.5 py-0.5 text-xs uppercase font-bold">
                  Jackpot!
                </span>
              )}
            </div>
          </div>
          <div className="font-medium">
            Profit: +${play.usd_profit.toFixed(2)}
          </div>
        </Card>
      ))}
    </div>
  );
};
