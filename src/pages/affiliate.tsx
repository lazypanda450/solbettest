// src/pages/affiliate.tsx

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FaUsers, 
  FaDollarSign, 
  FaLink, 
  FaCopy, 
  FaChartLine, 
  FaTrophy, 
  FaGift,
  FaUserPlus,
  FaPercentage,
  FaStar,
  FaCheckCircle,
  FaExternalLinkAlt
} from "react-icons/fa";
import { useWallet } from "@solana/wallet-adapter-react";
import { UserButton } from "@/components/ui/UserButton";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Footer from "@/components/Footer";
import AffiliateLeaderboard from "@/components/affiliate/AffiliateLeaderboard";

export default function AffiliatePage() {
  const { publicKey, connected } = useWallet();
  const [referralCode, setReferralCode] = useState<string>("");
  const [copied, setCopied] = useState(false);

  // Mock affiliate stats - in real app, fetch from API
  const [stats, setStats] = useState({
    totalReferrals: 24,
    activeReferrals: 18,
    totalEarnings: 1250.75,
    monthlyEarnings: 420.50,
    pendingCommission: 125.25,
    lifetimeCommission: 3850.90,
    conversionRate: 12.5,
    tier: "Gold"
  });

  // Generate referral code based on wallet address
  useEffect(() => {
    if (publicKey) {
      const code = publicKey.toString().slice(-8).toUpperCase();
      setReferralCode(code);
    }
  }, [publicKey]);

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const copyReferralLink = () => {
    if (!connected) return;
    
    const referralLink = `https://solbet.casino?ref=${referralCode}`;
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied to clipboard!");
    
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnTwitter = () => {
    if (!connected) return;
    
    const text = `Join me on SOLBET Casino - the best Solana gaming platform! 🎰 Play provably fair games and earn $SOLBET tokens. Use my referral link:`;
    const url = `https://solbet.casino?ref=${referralCode}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
  };

  return (
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
          className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-l from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div 
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="relative z-10 space-y-8 p-4 md:p-8 md:px-12 max-w-7xl mx-auto"
      >
        {/* Hero Section */}
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-full border border-green-400/30 w-fit mx-auto mb-6">
            <FaUsers className="w-4 h-4 text-green-400 mr-2" />
            <span className="text-sm font-semibold font-secondary text-green-400">Affiliate Program</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold font-gaming bg-gradient-to-r from-white via-green-200 to-emerald-400 bg-clip-text text-transparent leading-tight mb-6">
            EARN WITH FRIENDS
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed font-secondary max-w-4xl mx-auto">
            Invite friends to <span className="text-green-400 font-semibold">SOLBET Casino</span> and earn 
            <span className="text-yellow-400 font-semibold"> 25% commission</span> on their lifetime gaming activity. 
            Start building your <span className="text-purple-400 font-semibold">passive income</span> today!
          </p>
        </motion.div>

        {connected ? (
          <>
            {/* Stats Dashboard */}
            <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-600/50 rounded-2xl p-6 shadow-2xl shadow-black/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full flex items-center justify-center border border-blue-400/30">
                    <FaUsers className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm font-secondary">Total Referrals</p>
                    <p className="text-2xl font-bold text-white font-gaming">{stats.totalReferrals}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-400 font-secondary">
                  <span className="text-green-400">{stats.activeReferrals} active</span> this month
                </div>
              </div>

              <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-600/50 rounded-2xl p-6 shadow-2xl shadow-black/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-full flex items-center justify-center border border-green-400/30">
                    <FaDollarSign className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm font-secondary">Monthly Earnings</p>
                    <p className="text-2xl font-bold text-white font-gaming">${stats.monthlyEarnings}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-400 font-secondary">
                  <span className="text-green-400">+28%</span> from last month
                </div>
              </div>

              <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-600/50 rounded-2xl p-6 shadow-2xl shadow-black/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full flex items-center justify-center border border-yellow-400/30">
                    <FaChartLine className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm font-secondary">Conversion Rate</p>
                    <p className="text-2xl font-bold text-white font-gaming">{stats.conversionRate}%</p>
                  </div>
                </div>
                <div className="text-sm text-gray-400 font-secondary">
                  Above average <span className="text-green-400">performance</span>
                </div>
              </div>

              <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-600/50 rounded-2xl p-6 shadow-2xl shadow-black/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full flex items-center justify-center border border-purple-400/30">
                    <FaTrophy className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm font-secondary">Affiliate Tier</p>
                    <p className="text-2xl font-bold text-white font-gaming">{stats.tier}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-400 font-secondary">
                  <span className="text-yellow-400">25%</span> commission rate
                </div>
              </div>
            </motion.div>

            {/* Referral Link Section */}
            <motion.div variants={fadeInUp} className="bg-gray-900/80 backdrop-blur-xl border border-gray-600/50 rounded-2xl p-8 shadow-2xl shadow-black/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-full flex items-center justify-center border border-green-400/30">
                  <FaLink className="w-6 h-6 text-green-400" />
                </div>
                <h2 className="text-3xl font-bold font-gaming text-white">Your Referral Link</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-300 font-secondary mb-6">
                    Share your unique referral link and earn <span className="text-yellow-400 font-semibold">25% commission</span> on 
                    all your referrals&apos; gaming activity. The more they play, the more you earn!
                  </p>

                  <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 mb-4">
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Your Referral Code</label>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-900/70 border border-gray-600/50 rounded-lg p-3">
                        <span className="text-white font-mono text-lg">{referralCode}</span>
                      </div>
                      <Button
                        onClick={copyReferralLink}
                        className="px-4 py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-black font-bold rounded-lg hover:scale-105 transition-all duration-300"
                      >
                        {copied ? <FaCheckCircle className="w-4 h-4" /> : <FaCopy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 mb-6">
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Full Referral URL</label>
                    <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-3">
                      <span className="text-gray-400 font-mono text-sm break-all">
                        https://solbet.casino?ref={referralCode}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={copyReferralLink}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-black font-bold font-secondary rounded-xl hover:scale-105 transition-all duration-300"
                    >
                      <FaCopy className="w-4 h-4 mr-2" />
                      Copy Link
                    </Button>
                    <Button
                      onClick={shareOnTwitter}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold font-secondary rounded-xl hover:scale-105 transition-all duration-300"
                    >
                      <FaExternalLinkAlt className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white font-gaming mb-4">Commission Structure</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 font-secondary">Bronze (0-9 refs)</span>
                        <span className="text-yellow-400 font-bold">15%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 font-secondary">Silver (10-24 refs)</span>
                        <span className="text-yellow-400 font-bold">20%</span>
                      </div>
                      <div className="flex justify-between items-center bg-green-500/10 border border-green-400/30 rounded-lg p-2">
                        <span className="text-white font-secondary font-semibold">Gold (25+ refs)</span>
                        <span className="text-green-400 font-bold">25%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 font-secondary">Diamond (100+ refs)</span>
                        <span className="text-purple-400 font-bold">30%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white font-gaming mb-4">Earnings Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 font-secondary">Pending Commission</span>
                        <span className="text-yellow-400 font-bold">${stats.pendingCommission}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 font-secondary">Lifetime Earnings</span>
                        <span className="text-green-400 font-bold">${stats.lifetimeCommission}</span>
                      </div>
                      <div className="pt-3 border-t border-gray-600/50">
                        <Button className="w-full px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold font-secondary rounded-lg hover:scale-105 transition-all duration-300">
                          Withdraw Earnings
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* How It Works */}
            <motion.div variants={fadeInUp} className="bg-gray-900/80 backdrop-blur-xl border border-gray-600/50 rounded-2xl p-8 shadow-2xl shadow-black/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400/20 to-blue-500/20 rounded-full flex items-center justify-center border border-purple-400/30">
                  <FaGift className="w-6 h-6 text-purple-400" />
                </div>
                <h2 className="text-3xl font-bold font-gaming text-white">How It Works</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <motion.div variants={scaleIn} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-full flex items-center justify-center border border-green-400/30 mx-auto mb-4">
                    <FaUserPlus className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-gaming mb-3">1. Share Your Link</h3>
                  <p className="text-gray-300 font-secondary">
                    Share your unique referral link with friends, social media, or gaming communities.
                  </p>
                </motion.div>

                <motion.div variants={scaleIn} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full flex items-center justify-center border border-blue-400/30 mx-auto mb-4">
                    <FaUsers className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-gaming mb-3">2. Friends Join & Play</h3>
                  <p className="text-gray-300 font-secondary">
                    Your referrals sign up using your link and start playing their favorite casino games.
                  </p>
                </motion.div>

                <motion.div variants={scaleIn} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full flex items-center justify-center border border-yellow-400/30 mx-auto mb-4">
                    <FaPercentage className="w-8 h-8 text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-gaming mb-3">3. Earn Commission</h3>
                  <p className="text-gray-300 font-secondary">
                    Earn 25% commission on all their gaming activity for life. Payments are automatic!
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Recent Referrals */}
            <motion.div variants={fadeInUp} className="bg-gray-900/80 backdrop-blur-xl border border-gray-600/50 rounded-2xl p-8 shadow-2xl shadow-black/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full flex items-center justify-center border border-yellow-400/30">
                  <FaStar className="w-6 h-6 text-yellow-400" />
                </div>
                <h2 className="text-3xl font-bold font-gaming text-white">Recent Activity</h2>
              </div>

              <div className="space-y-4">
                {[
                  { user: "Player***1a2b", earnings: 24.50, date: "2 hours ago", status: "active" },
                  { user: "Gamer***8x9c", earnings: 18.75, date: "6 hours ago", status: "active" },
                  { user: "Crypto***5d7f", earnings: 31.25, date: "1 day ago", status: "inactive" },
                  { user: "Lucky***3g4h", earnings: 12.00, date: "2 days ago", status: "active" },
                  { user: "Pro***9j1k", earnings: 45.80, date: "3 days ago", status: "active" }
                ].map((referral, index) => (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    className="flex items-center justify-between bg-gray-800/50 border border-gray-700/50 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${referral.status === 'active' ? 'bg-green-400' : 'bg-gray-500'}`}></div>
                      <div>
                        <p className="text-white font-semibold font-secondary">{referral.user}</p>
                        <p className="text-gray-400 text-sm font-secondary">{referral.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 font-bold font-mono">+${referral.earnings}</p>
                      <p className="text-gray-400 text-sm font-secondary">Commission</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Leaderboard */}
            <motion.div variants={fadeInUp}>
              <AffiliateLeaderboard />
            </motion.div>
          </>
        ) : (
          <motion.div 
            variants={fadeInUp}
            className="flex min-h-[60vh] justify-center items-center"
          >
            <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-600/50 rounded-2xl p-12 shadow-2xl shadow-black/20 text-center max-w-2xl">
              <div className="w-24 h-24 bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-full flex items-center justify-center border-2 border-green-400/30 mx-auto mb-6">
                <FaUsers className="w-12 h-12 text-green-400" />
              </div>
              <h2 className="text-3xl font-bold font-gaming text-white mb-4">Connect Your Wallet</h2>
              <p className="text-gray-300 font-secondary mb-8 text-lg">
                Connect your wallet to access the affiliate program and start earning commissions from your referrals.
              </p>
              <UserButton />
            </div>
          </motion.div>
        )}
      </motion.div>
      
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}