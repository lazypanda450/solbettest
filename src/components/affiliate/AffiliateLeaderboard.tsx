// src/components/affiliate/AffiliateLeaderboard.tsx

import React from "react";
import { motion } from "framer-motion";
import { FaTrophy, FaCrown, FaMedal, FaStar, FaUsers, FaDollarSign } from "react-icons/fa";

interface LeaderboardEntry {
  rank: number;
  username: string;
  referrals: number;
  earnings: number;
  tier: "Diamond" | "Gold" | "Silver" | "Bronze";
  isCurrentUser?: boolean;
}

const AffiliateLeaderboard: React.FC = () => {
  // Mock leaderboard data
  const leaderboardData: LeaderboardEntry[] = [
    { rank: 1, username: "CryptoWhale***", referrals: 247, earnings: 18542.75, tier: "Diamond" },
    { rank: 2, username: "GameMaster***", referrals: 189, earnings: 14238.50, tier: "Diamond" },
    { rank: 3, username: "LuckyPlayer***", referrals: 156, earnings: 11245.25, tier: "Diamond" },
    { rank: 4, username: "ProGamer***", referrals: 134, earnings: 9876.80, tier: "Diamond" },
    { rank: 5, username: "SolanaKing***", referrals: 98, earnings: 7234.90, tier: "Diamond" },
    { rank: 6, username: "CasinoLord***", referrals: 87, earnings: 6421.45, tier: "Diamond" },
    { rank: 7, username: "BetMaster***", referrals: 76, earnings: 5890.30, tier: "Diamond" },
    { rank: 8, username: "WinStreak***", referrals: 68, earnings: 5124.75, tier: "Gold" },
    { rank: 9, username: "RollDice***", referrals: 54, earnings: 4567.20, tier: "Gold" },
    { rank: 10, username: "You***", referrals: 24, earnings: 1250.75, tier: "Gold", isCurrentUser: true },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <FaCrown className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <FaTrophy className="w-6 h-6 text-gray-400" />;
      case 3:
        return <FaMedal className="w-6 h-6 text-yellow-600" />;
      default:
        return <FaStar className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Diamond":
        return "from-purple-400 to-blue-500";
      case "Gold":
        return "from-yellow-400 to-orange-500";
      case "Silver":
        return "from-gray-400 to-gray-600";
      case "Bronze":
        return "from-orange-600 to-red-600";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-600/50 rounded-2xl p-8 shadow-2xl shadow-black/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full flex items-center justify-center border border-yellow-400/30">
          <FaTrophy className="w-6 h-6 text-yellow-400" />
        </div>
        <h2 className="text-3xl font-bold font-gaming text-white">Top Affiliates</h2>
      </div>

      <p className="text-gray-300 font-secondary mb-8">
        See how you stack up against other top earners. Climb the leaderboard and unlock higher commission rates!
      </p>

      <motion.div 
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="space-y-3"
      >
        {leaderboardData.map((entry, index) => (
          <motion.div
            key={entry.rank}
            variants={fadeInUp}
            className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
              entry.isCurrentUser
                ? "bg-green-500/10 border-green-400/50 shadow-lg shadow-green-400/10"
                : "bg-gray-800/50 border-gray-700/50 hover:bg-gray-700/50 hover:border-gray-600/50"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12">
                {entry.rank <= 3 ? (
                  <div className="relative">
                    {getRankIcon(entry.rank)}
                    {entry.rank === 1 && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                    )}
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-300">#{entry.rank}</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className={`font-bold font-secondary ${entry.isCurrentUser ? 'text-green-400' : 'text-white'}`}>
                      {entry.username}
                    </p>
                    {entry.isCurrentUser && (
                      <span className="px-2 py-1 bg-green-500/20 border border-green-400/50 rounded-full text-xs text-green-400 font-semibold">
                        YOU
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <FaUsers className="w-3 h-3" />
                      <span>{entry.referrals} refs</span>
                    </div>
                    <div className={`px-2 py-1 bg-gradient-to-r ${getTierColor(entry.tier)} text-black text-xs font-bold rounded-full`}>
                      {entry.tier}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-1 text-lg font-bold text-green-400 font-mono">
                <FaDollarSign className="w-4 h-4" />
                {entry.earnings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-gray-400 font-secondary">Total Earnings</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Current User Highlight */}
      <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-400/30 rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
              <FaTrophy className="w-4 h-4 text-black" />
            </div>
            <div>
              <p className="text-white font-bold font-secondary">Your Current Rank</p>
              <p className="text-green-400 text-sm font-secondary">Keep inviting to climb higher!</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-green-400 font-gaming">#10</p>
            <p className="text-sm text-gray-400 font-secondary">out of 1,247</p>
          </div>
        </div>
      </div>

      {/* Next Tier Progress */}
      <div className="mt-6 p-4 bg-gray-800/50 border border-gray-700/50 rounded-xl">
        <div className="flex items-center justify-between mb-3">
          <p className="text-white font-semibold font-secondary">Progress to Diamond Tier</p>
          <p className="text-gray-400 text-sm font-secondary">76 more referrals</p>
        </div>
        <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "24%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-purple-400 to-blue-500 rounded-full relative"
          >
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
          </motion.div>
        </div>
        <div className="flex items-center justify-between mt-2 text-sm">
          <span className="text-green-400 font-semibold">24/100 referrals</span>
          <span className="text-purple-400 font-semibold">30% commission rate</span>
        </div>
      </div>
    </div>
  );
};

export default AffiliateLeaderboard;