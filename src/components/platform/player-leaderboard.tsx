import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import React, { useEffect, useState } from "react";

import { Card } from "../ui/card";
import { FaCrown } from "react-icons/fa"; // Ensure react-icons is installed
import { PLATFORM_CREATOR_ADDRESS } from "../../../config";

type Player = {
  user: string;
  usd_profit: number;
  usd_volume: number;
};

type PlayersApiResponse = {
  players: Player[];
};

const fetchPlayersData = async (): Promise<PlayersApiResponse> => {
  const response = await fetch(
    `/api/gamba/players?creator=${PLATFORM_CREATOR_ADDRESS}&limit=5&sortBy=usd_profit`,
  );
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

const generateGambaLink = (user: string) =>
  `https://explorer.gamba.so/player/${user}`;

export function PlayerLeaderboard() {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    fetchPlayersData()
      .then((data) => {
        const sortedPlayers = data.players.sort(
          (a, b) => b.usd_profit - a.usd_profit || b.usd_volume - a.usd_volume,
        );
        setPlayers(sortedPlayers);
      })
      .catch((error) => console.error("Failed to fetch players:", error));
  }, []);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <FaCrown className="text-yellow-400" />;
      case 1:
        return <FaCrown className="text-gray-400" />;
      case 2:
        return <FaCrown className="text-amber-800" />;
      default:
        return <span className="text-sm">#{index + 1}</span>;
    }
  };

  return (
    <div className="w-full relative flex flex-col justify-normal items-center gap-2.5">
      <h2 className="text-2xl font-bold text-center mb-4">Leaderboard</h2>
      <Card className="w-96 cursor-pointer bg-accent border border-base p-4 rounded-lg shadow-lg">
        <div className="flex flex-col gap-4">
          {players.map((player, index) => (
            <div
              key={player.user}
              onClick={() =>
                window.open(generateGambaLink(player.user), "_blank")
              }
              className="flex items-center justify-between p-2 bg-accent hover:bg-background border border-base rounded-lg cursor-pointer"
            >
              <div className="flex items-center gap-4">
                {getRankIcon(index)}
                <Avatar className="bg-card h-10 w-10">
                  <AvatarFallback className="bg-card">
                    {player.user.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <p className="font-semibold">
                  {player.user.substring(0, 6)}...{player.user.slice(-4)}
                </p>
              </div>
              <div>
                <p className="text-md font-medium">
                  Profit: ${player.usd_profit.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Volume: ${player.usd_volume.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
