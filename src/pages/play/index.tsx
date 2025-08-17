// src/pages/play/index.tsx
import { GameGrid } from "@/components/game/GameGrid";
import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { FaGamepad, FaDice, FaStar } from "react-icons/fa";

function PlayPage() {
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
    <div className="mt-16 flex-1 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            scale: { duration: 12, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.2, 1]
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-l from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div 
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="relative z-10 mx-auto flex flex-col gap-8 mb-12 md:mb-0 pb-10 px-4 md:px-8 lg:px-12 max-w-7xl"
      >
        {/* Hero Section */}
        <motion.div 
          variants={fadeInUp}
          className="text-center py-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-400/20 to-blue-500/20 rounded-full border border-purple-400/30 w-fit mx-auto mb-6">
            <FaGamepad className="w-4 h-4 text-purple-400 mr-2" />
            <span className="text-sm font-semibold font-secondary text-purple-400">Premium Gaming Collection</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold font-gaming bg-gradient-to-r from-white via-purple-200 to-blue-400 bg-clip-text text-transparent leading-tight mb-6">
            ALL GAMES
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed font-secondary max-w-4xl mx-auto">
            Discover our complete collection of <span className="text-yellow-400 font-semibold">provably fair games</span>. 
            From classic favorites to innovative new experiences, all powered by <span className="text-purple-400 font-semibold">Solana blockchain</span>.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-600/50 rounded-2xl p-6 text-center shadow-2xl shadow-black/20">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full flex items-center justify-center border border-blue-400/30 mx-auto mb-4">
              <FaDice className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold font-gaming text-white mb-2">9+ Games</h3>
            <p className="text-gray-400 font-secondary">Diverse gaming portfolio</p>
          </div>
          
          <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-600/50 rounded-2xl p-6 text-center shadow-2xl shadow-black/20">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-full flex items-center justify-center border border-green-400/30 mx-auto mb-4">
              <FaStar className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold font-gaming text-white mb-2">Provably Fair</h3>
            <p className="text-gray-400 font-secondary">Transparent & verifiable</p>
          </div>
          
          <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-600/50 rounded-2xl p-6 text-center shadow-2xl shadow-black/20">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full flex items-center justify-center border border-yellow-400/30 mx-auto mb-4">
              <FaGamepad className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="text-2xl font-bold font-gaming text-white mb-2">Instant Play</h3>
            <p className="text-gray-400 font-secondary">No downloads required</p>
          </div>
        </motion.div>

        {/* Games Grid */}
        <motion.div variants={fadeInUp}>
          <GameGrid />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(PlayPage), { ssr: false });
