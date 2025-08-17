// src/games/Crash/BetsDisplay.tsx

import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaDollarSign, FaCheckCircle, FaTimes } from "react-icons/fa";
import { TokenValue } from "gamba-react-ui-v2";

export interface Bet {
  id: string;
  player: string;
  amount: number;
  cashoutAt?: number;
  cashoutMultiplier?: number;
  profit?: number;
  status: "active" | "cashed_out" | "crashed";
}

interface BetsDisplayProps {
  currentBets: Bet[];
  gamePhase: string;
}

const BetsDisplay: React.FC<BetsDisplayProps> = ({ currentBets, gamePhase }) => {
  const activeBets = currentBets.filter(bet => bet.status === "active");
  const cashedOutBets = currentBets.filter(bet => bet.status === "cashed_out");
  const crashedBets = currentBets.filter(bet => bet.status === "crashed");

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
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
    <div className="space-y-6">
      {/* Active Bets Section */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FaUsers className="w-4 h-4 text-blue-400" />
            <h3 className="font-bold text-white font-gaming">Active Bets</h3>
          </div>
          <div className="bg-blue-500/20 border border-blue-400/50 rounded-full px-3 py-1">
            <span className="text-blue-400 font-bold text-sm">{activeBets.length}</span>
          </div>
        </div>
        
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-2 max-h-64 overflow-y-auto"
        >
          {activeBets.map((bet) => (
            <motion.div 
              key={bet.id} 
              variants={fadeInUp}
              className="flex items-center justify-between p-3 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg border border-gray-600/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <div>
                  <div className="text-sm font-semibold text-white">{bet.player}</div>
                  <div className="text-xs text-gray-400">
                    <TokenValue amount={bet.amount} />
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-green-400">ACTIVE</div>
                {bet.cashoutAt && (
                  <div className="text-xs text-yellow-400">
                    Auto @ {bet.cashoutAt.toFixed(2)}x
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          {activeBets.length === 0 && (
            <div className="text-center text-gray-400 py-4">
              No active bets this round
            </div>
          )}
        </motion.div>
      </div>

      {/* Cashed Out Bets Section */}
      {cashedOutBets.length > 0 && (
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="w-4 h-4 text-green-400" />
              <h3 className="font-bold text-white font-gaming">Successful Cashouts</h3>
            </div>
            <div className="bg-green-500/20 border border-green-400/50 rounded-full px-3 py-1">
              <span className="text-green-400 font-bold text-sm">{cashedOutBets.length}</span>
            </div>
          </div>
          
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-2 max-h-64 overflow-y-auto"
          >
            {cashedOutBets.map((bet) => (
              <motion.div 
                key={bet.id} 
                variants={fadeInUp}
                className="flex items-center justify-between p-3 bg-green-500/10 border border-green-400/30 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="w-4 h-4 text-green-400" />
                  <div>
                    <div className="text-sm font-semibold text-white">{bet.player}</div>
                    <div className="text-xs text-gray-400">
                      <TokenValue amount={bet.amount} />
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-green-400">
                    {bet.cashoutMultiplier?.toFixed(2)}x
                  </div>
                  <div className="text-xs text-green-400">
                    +<TokenValue amount={bet.profit || 0} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* Crashed Bets Section */}
      {crashedBets.length > 0 && (
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FaTimes className="w-4 h-4 text-red-400" />
              <h3 className="font-bold text-white font-gaming">Crashed Bets</h3>
            </div>
            <div className="bg-red-500/20 border border-red-400/50 rounded-full px-3 py-1">
              <span className="text-red-400 font-bold text-sm">{crashedBets.length}</span>
            </div>
          </div>
          
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-2 max-h-64 overflow-y-auto"
          >
            {crashedBets.map((bet) => (
              <motion.div 
                key={bet.id} 
                variants={fadeInUp}
                className="flex items-center justify-between p-3 bg-red-500/10 border border-red-400/30 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <FaTimes className="w-4 h-4 text-red-400" />
                  <div>
                    <div className="text-sm font-semibold text-white">{bet.player}</div>
                    <div className="text-xs text-gray-400">
                      <TokenValue amount={bet.amount} />
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-red-400">LOST</div>
                  <div className="text-xs text-red-400">
                    -<TokenValue amount={bet.amount} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* Round Statistics */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <FaDollarSign className="w-4 h-4 text-yellow-400" />
          <h3 className="font-bold text-white font-gaming">Round Statistics</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gray-700/30 rounded-lg">
            <div className="text-2xl font-bold text-white font-gaming">
              {currentBets.length}
            </div>
            <div className="text-xs text-gray-400 font-secondary">Total Bets</div>
          </div>
          
          <div className="text-center p-3 bg-gray-700/30 rounded-lg">
            <div className="text-2xl font-bold text-green-400 font-gaming">
              <TokenValue 
                amount={currentBets.reduce((sum, bet) => sum + bet.amount, 0)} 
              />
            </div>
            <div className="text-xs text-gray-400 font-secondary">Total Volume</div>
          </div>
          
          <div className="text-center p-3 bg-gray-700/30 rounded-lg">
            <div className="text-2xl font-bold text-green-400 font-gaming">
              {cashedOutBets.length}
            </div>
            <div className="text-xs text-gray-400 font-secondary">Cashed Out</div>
          </div>
          
          <div className="text-center p-3 bg-gray-700/30 rounded-lg">
            <div className="text-2xl font-bold text-red-400 font-gaming">
              {crashedBets.length}
            </div>
            <div className="text-xs text-gray-400 font-secondary">Lost</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetsDisplay;