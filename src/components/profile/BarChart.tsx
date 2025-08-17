// src/components/profile/BarChart.tsx
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import React, { useEffect, useState } from "react";

import { PublicKey } from "@solana/web3.js";

interface ChartDataItem {
  name: string;
  profit: number;
  loss: number;
}

interface UserOverviewProps {
  userPublicKey: PublicKey;
  timeFrame: "7D" | "14D" | "30D" | "All";
}

export const UserOverview: React.FC<UserOverviewProps> = ({
  userPublicKey,
  timeFrame,
}) => {
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);

  useEffect(() => {
    const fetchAllDataAndAggregate = async () => {
      if (!userPublicKey) return;

      let allData = [];
      let currentPage = 0;
      let hasMoreData = true;

      while (hasMoreData) {
        const response = await fetch(
          `/api/gamba/events/settledGames?page=${currentPage}&itemsPerPage=200&user=${encodeURIComponent(
            userPublicKey.toString(),
          )}`,
        );
        if (!response.ok) throw new Error("Failed to fetch settled games data");
        const { results, total } = await response.json();

        if (results.length === 0 || allData.length >= total) {
          hasMoreData = false;
        } else {
          allData.push(...results);
          currentPage++;
        }
      }

      const now = Date.now();
      const filteredData = allData.filter((item) => {
        const itemDate = new Date(item.time).getTime();
        switch (timeFrame) {
          case "7D":
            return now - itemDate < 604800000; // 7 * 24 * 60 * 60 * 1000
          case "14D":
            return now - itemDate < 1209600000; // 14 * 24 * 60 * 60 * 1000
          case "30D":
            return now - itemDate < 2592000000; // 30 * 24 * 60 * 60 * 1000
          case "All":
          default:
            return true;
        }
      });

      const aggregatedData = filteredData.reduce((acc, item) => {
        const dateStr = new Date(item.time).toLocaleDateString("en-US");
        let entry = acc.find(
          (entry: { name: string }) => entry.name === dateStr,
        );
        if (!entry) {
          entry = { name: dateStr, profit: 0, loss: 0 };
          acc.push(entry);
        }
        const profitInUsd = item.usd_payout - item.usd_wager;
        if (profitInUsd > 0) {
          entry.profit += profitInUsd;
        } else {
          entry.loss += Math.abs(profitInUsd);
        }
        return acc;
      }, [] as ChartDataItem[]);

      setChartData(
        aggregatedData.sort(
          (
            a: { name: string | number | Date },
            b: { name: string | number | Date },
          ) => +new Date(a.name) - +new Date(b.name),
        ),
      );
    };

    fetchAllDataAndAggregate().catch(console.error);
  }, [userPublicKey, timeFrame]);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickFormatter={(value: number) => `$${value.toFixed(2)}`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-card p-4 rounded-lg text-white font-sans space-y-1">
                  <div className="flex gap-2 justify-between">
                    <span>Won:</span>
                    <strong className="text-green-500">
                      +${payload[0].payload.profit.toFixed(2)}
                    </strong>
                  </div>
                  <div className="flex gap-2 justify-between">
                    <span>Spent:</span>
                    <strong className="text-red-500">
                      -${payload[0].payload.loss.toFixed(2)}
                    </strong>
                  </div>
                  <div className="flex gap-2 justify-between pt-2 border-t border-gray-400">
                    <span>Profit:</span>
                    <strong
                      className={` ${
                        payload[0].payload.profit - payload[0].payload.loss >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      } `}
                    >
                      $
                      {(
                        payload[0].payload.profit - payload[0].payload.loss
                      ).toFixed(2)}
                    </strong>
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        <Legend />
        <Bar
          dataKey="profit"
          fill="#4caf50"
          name="Profit"
          radius={[10, 10, 0, 0]}
        />
        <Bar
          dataKey="loss"
          fill="#f44336"
          name="Loss"
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
