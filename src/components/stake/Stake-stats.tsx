import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import React, { useEffect, useState } from "react";

const StakeStats = () => {
  const [totalUsersStaked, setTotalUsersStaked] = useState(0);
  const [totalSOLStaked, setTotalSOLStaked] = useState(0);
  const [totalSPLClaimable, setTotalSPLClaimable] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/stake");
        if (!response.ok) throw new Error("Failed to fetch stake data");

        const stakeData = await response.json();
        const totalUsers = stakeData.length;
        const totalSOL =
          stakeData.reduce(
            (acc: number, { account }: any) =>
              acc + parseInt(account.solStaked),
            0,
          ) / 1e9;
        const totalSPL = stakeData.reduce(
          (acc: number, { account }: any) =>
            acc + parseFloat(account.claimableAmount),
          0,
        );

        setTotalUsersStaked(totalUsers);
        setTotalSOLStaked(totalSOL);
        setTotalSPLClaimable(totalSPL);
      } catch (error) {
        console.error("Error fetching stake data:", error);
      }
    };
    fetchData();
  }, []);

  function formatNumber(num: number) {
    if (num < 1000) return num.toString();
    const units = ["K", "M", "B", "T"];
    const exp = Math.floor(Math.log(num) / Math.log(1000));
    return (num / Math.pow(1000, exp)).toFixed(2) + units[exp - 1];
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        {/* Users Staked */}
        <Card className="bg-accent border border-base col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Users Staked:</CardTitle>
            <FaUser className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(totalUsersStaked)}
            </div>
          </CardContent>
        </Card>

        {/* SOL Staked */}
        <Card className="bg-accent border border-base col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SOL Staked:</CardTitle>
            <FaSignInAlt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(totalSOLStaked)} SOL
            </div>
          </CardContent>
        </Card>

        {/* SPL Paid Out */}
        <Card className="bg-accent border border-base col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              $SOLBET Claimable:
            </CardTitle>
            <FaSignOutAlt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isNaN(totalSPLClaimable)
                ? "NaN"
                : formatNumber(totalSPLClaimable)}{" "}
              $SOLBET
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default StakeStats;
