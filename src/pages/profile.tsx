// src/pages/profile.tsx

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaChartLine, FaTrophy, FaHistory, FaWallet } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import PlayerStatsCards from "@/components/profile/PlayerStats";
import { PublicKey } from "@solana/web3.js";
import { TopPlays } from "@/components/profile/TopPlays";
import { UserButton } from "@/components/ui/UserButton";
import { UserOverview } from "@/components/profile/BarChart";
import UserRecent from "@/components/profile/UserRecent";
import { truncateString } from "@/utils/utils";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

const RecentUserPlays = () => {
  const { publicKey } = useWallet();
  const walletModal = useWalletModal();
  const wallet = useWallet();
  const [filter, setFilter] = useState("7D");

  const connect = () => {
    if (wallet.wallet) {
      wallet.connect();
    } else {
      walletModal.setVisible(true);
    }
  };

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      <div className="mt-16 flex-1 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              rotate: -360,
              scale: [1, 1.2, 1]
            }}
            transition={{
              rotate: { duration: 30, repeat: Infinity, ease: "linear" },
              scale: { duration: 12, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-l from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl"
          />
        </div>

        {publicKey ? (
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="flex-col md:flex relative z-10"
          >
            <div className="mb-16 md:mb-0 flex-1 space-y-8 p-4 md:p-8 md:px-12">
              {/* Profile Header */}
              <motion.div 
                variants={fadeInUp}
                className="bg-gray-900/80 backdrop-blur-xl border border-gray-600/50 rounded-2xl p-8 shadow-2xl shadow-black/20"
              >
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full flex items-center justify-center border-2 border-yellow-400/30">
                    <FaUser className="w-10 h-10 text-yellow-400" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold font-gaming bg-gradient-to-r from-white via-yellow-200 to-orange-400 bg-clip-text text-transparent mb-2">
                      Player Profile
                    </h1>
                    <div className="flex items-center gap-2">
                      <FaWallet className="w-4 h-4 text-gray-400" />
                      <span className="text-lg font-mono text-gray-300">
                        {truncateString(publicKey.toBase58(), 8, 8)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Stats Cards */}
              <motion.div variants={fadeInUp}>
                <PlayerStatsCards userPublicKey={new PublicKey(publicKey)} />
              </motion.div>

              {/* Charts and Top Plays */}
              <motion.div variants={fadeInUp} className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4">
                  <Card className="border border-gray-600/50 bg-gray-900/80 backdrop-blur-xl shadow-2xl shadow-black/20 rounded-xl overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 border-b border-gray-600/30">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                          <FaChartLine className="w-5 h-5 text-blue-400" />
                        </div>
                        <CardTitle className="text-xl font-gaming text-white">{filter} Overview</CardTitle>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="outline" 
                            className="bg-gray-800/70 border-gray-600/50 text-white hover:bg-gray-700/70 hover:border-yellow-400/50 transition-all duration-300"
                          >
                            {filter}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-gray-800/90 backdrop-blur-xl border-gray-600/50">
                          <DropdownMenuLabel className="text-gray-300">Filter By</DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-gray-600/50" />
                          <DropdownMenuItem onClick={() => setFilter("7D")} className="text-gray-300 hover:bg-gray-700/70">
                            7D
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setFilter("14D")} className="text-gray-300 hover:bg-gray-700/70">
                            14D
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setFilter("30D")} className="text-gray-300 hover:bg-gray-700/70">
                            30D
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setFilter("All")} className="text-gray-300 hover:bg-gray-700/70">
                            All Time
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardHeader>
                    <CardContent className="pl-2 bg-gray-900/50">
                      <UserOverview
                        timeFrame={filter as "7D" | "14D" | "30D" | "All"}
                        userPublicKey={new PublicKey(publicKey)}
                      />
                    </CardContent>
                  </Card>
                </div>

                <div className="col-span-4 md:col-span-3">
                  <Card className="border border-gray-600/50 bg-gray-900/80 backdrop-blur-xl shadow-2xl shadow-black/20 rounded-xl overflow-hidden h-full">
                    <CardHeader className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 border-b border-gray-600/30">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg flex items-center justify-center">
                          <FaTrophy className="w-5 h-5 text-yellow-400" />
                        </div>
                        <CardTitle className="text-xl font-gaming text-white">Top 5 Plays</CardTitle>
                      </div>
                      <CardDescription className="text-gray-400 font-secondary">Top 5 plays by USD profit</CardDescription>
                    </CardHeader>
                    <CardContent className="bg-gray-900/50">
                      <TopPlays userPublicKey={new PublicKey(publicKey)} />
                    </CardContent>
                  </Card>
                </div>
              </motion.div>

              {/* Recent Plays */}
              <motion.div variants={fadeInUp}>
                <UserRecent />
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex min-h-[90svh] justify-center items-center relative z-10"
          >
            <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-600/50 rounded-2xl p-12 shadow-2xl shadow-black/20 text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full flex items-center justify-center border-2 border-yellow-400/30 mx-auto mb-6">
                <FaWallet className="w-12 h-12 text-yellow-400" />
              </div>
              <h2 className="text-2xl font-bold font-gaming text-white mb-4">Connect Your Wallet</h2>
              <p className="text-gray-400 font-secondary mb-8">Connect your wallet to view your gaming profile and statistics</p>
              <UserButton />
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default RecentUserPlays;
