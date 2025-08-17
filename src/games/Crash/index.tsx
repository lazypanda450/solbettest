// src/games/Crash/index.tsx

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GambaUi,
  useCurrentToken,
  useSound,
  useWagerInput,
  TokenValue,
} from "gamba-react-ui-v2";
import { useGamba } from "gamba-react-v2";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { 
  FaClock, 
  FaChartLine,
} from "react-icons/fa";
import BetsDisplay, { Bet } from "./BetsDisplay";

// Game phases
enum GamePhase {
  BETTING = "betting",
  PLAYING = "playing", 
  CRASHED = "crashed",
  WAITING = "waiting"
}

interface GameHistory {
  multiplier: number;
  timestamp: number;
}

const SOUND_ROCKET = "/games/crash/rocket.mp3";
const SOUND_CASH_OUT = "/games/crash/cashout.mp3";
const SOUND_CRASH = "/games/crash/crash.mp3";
const SOUND_COUNTDOWN = "/games/crash/countdown.mp3";

function Crash() {
  const wallet = useWallet();
  const walletModal = useWalletModal();

  // Game state
  const [gamePhase, setGamePhase] = useState<GamePhase>(GamePhase.BETTING);
  const [currentMultiplier, setCurrentMultiplier] = useState(1.00);
  const [crashMultiplier, setCrashMultiplier] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStartTime, setGameStartTime] = useState<number | null>(null);
  
  // Betting state
  const [wager, setWager] = useWagerInput();
  const [hasActiveBet, setHasActiveBet] = useState(false);
  const [cashoutAt, setCashoutAt] = useState(2.0);
  const [autoCashout, setAutoCashout] = useState(false);
  const [hasCashedOut, setHasCashedOut] = useState(false);
  
  // Game data
  const [currentBets, setCurrentBets] = useState<Bet[]>([]);
  const [previousRoundBets, setPreviousRoundBets] = useState<Bet[]>([]);
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([
    { multiplier: 2.45, timestamp: Date.now() - 60000 },
    { multiplier: 1.23, timestamp: Date.now() - 120000 },
    { multiplier: 5.67, timestamp: Date.now() - 180000 },
    { multiplier: 1.89, timestamp: Date.now() - 240000 },
    { multiplier: 3.21, timestamp: Date.now() - 300000 },
  ]);

  // Refs for animation
  const rocketRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLCanvasElement>(null);

  const sounds = useSound({
    rocket: SOUND_ROCKET,
    cashout: SOUND_CASH_OUT,
    crash: SOUND_CRASH,
    countdown: SOUND_COUNTDOWN,
  });

  // Connect wallet
  const connect = () => {
    if (wallet.wallet) {
      wallet.connect();
    } else {
      walletModal.setVisible(true);
    }
  };

  // Place bet
  const placeBet = async () => {
    if (!wallet.connected || hasActiveBet) return;
    
    try {
      setHasActiveBet(true);
      
      // Add bet to current bets
      const newBet: Bet = {
        id: Math.random().toString(36).substr(2, 9),
        player: wallet.publicKey?.toString().slice(-6) || "Player",
        amount: wager,
        status: "active"
      };
      
      setCurrentBets(prev => [...prev, newBet]);
      
    } catch (error) {
      console.error("Failed to place bet:", error);
      setHasActiveBet(false);
    }
  };

  // Cash out
  const cashOut = async () => {
    if (!hasActiveBet || hasCashedOut) return;
    
    try {
      setHasCashedOut(true);
      sounds.play("cashout");
      
      // Update bet status
      setCurrentBets(prev => 
        prev.map(bet => 
          bet.player === wallet.publicKey?.toString().slice(-6) 
            ? { 
                ...bet, 
                status: "cashed_out", 
                cashoutMultiplier: currentMultiplier,
                profit: bet.amount * (currentMultiplier - 1)
              }
            : bet
        )
      );
      
    } catch (error) {
      console.error("Failed to cash out:", error);
    }
  };

  // Game timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (gamePhase === GamePhase.BETTING && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGamePhase(GamePhase.PLAYING);
            setGameStartTime(Date.now());
            sounds.play("rocket");
            return 0;
          }
          if (prev <= 5) {
            sounds.play("countdown");
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [gamePhase, timeLeft, sounds]);

  // Game multiplier effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (gamePhase === GamePhase.PLAYING) {
      interval = setInterval(() => {
        setCurrentMultiplier(prev => {
          const newMultiplier = prev + 0.01;
          
          // Check auto cashout
          if (autoCashout && !hasCashedOut && hasActiveBet && newMultiplier >= cashoutAt) {
            cashOut();
          }
          
          // Random crash (for demo - replace with actual game logic)
          const crashChance = Math.random();
          const crashThreshold = 0.001 * Math.pow(newMultiplier, 1.5);
          
          if (crashChance < crashThreshold) {
            setGamePhase(GamePhase.CRASHED);
            setCrashMultiplier(newMultiplier);
            sounds.play("crash");
            
            // Mark all remaining active bets as crashed
            setCurrentBets(prev => 
              prev.map(bet => 
                bet.status === "active" 
                  ? { ...bet, status: "crashed" as const }
                  : bet
              )
            );
            
            // Add to history
            setGameHistory(prev => [
              { multiplier: newMultiplier, timestamp: Date.now() },
              ...prev.slice(0, 9)
            ]);
            
            // Reset after crash - save previous round results
            setTimeout(() => {
              // Save the current round results to show in previous round
              setPreviousRoundBets(currentBets.map(bet => 
                bet.status === "active" 
                  ? { ...bet, status: "crashed" as const }
                  : bet
              ));
              
              // Reset for new round
              setGamePhase(GamePhase.BETTING);
              setCurrentMultiplier(1.00);
              setTimeLeft(60);
              setHasActiveBet(false);
              setHasCashedOut(false);
              setCurrentBets([]);
            }, 3000);
          }
          
          return newMultiplier;
        });
      }, 100);
    }
    
    return () => clearInterval(interval);
  }, [gamePhase, autoCashout, hasCashedOut, hasActiveBet, cashoutAt, sounds]);

  // Chart drawing effect
  useEffect(() => {
    if (!chartRef.current) return;
    
    const canvas = chartRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    
    if (gamePhase === GamePhase.PLAYING || gamePhase === GamePhase.CRASHED) {
      // Draw multiplier line
      const gradient = ctx.createLinearGradient(0, 0, canvas.offsetWidth, 0);
      gradient.addColorStop(0, "#10b981");
      gradient.addColorStop(0.7, "#f59e0b");
      gradient.addColorStop(1, "#ef4444");
      
      ctx.strokeStyle = gamePhase === GamePhase.CRASHED ? "#ef4444" : gradient;
      ctx.lineWidth = 3;
      ctx.beginPath();
      
      const maxTime = 30000; // 30 seconds max display
      const currentTime = gameStartTime ? Date.now() - gameStartTime : 0;
      const progress = Math.min(currentTime / maxTime, 1);
      
      // Draw curve based on multiplier growth
      for (let i = 0; i <= progress * 100; i++) {
        const x = (i / 100) * canvas.offsetWidth;
        const multiplierAtPoint = 1 + (currentMultiplier - 1) * (i / 100);
        const y = canvas.offsetHeight - (multiplierAtPoint - 1) * 50;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
      
      // Draw crash point
      if (gamePhase === GamePhase.CRASHED) {
        ctx.fillStyle = "#ef4444";
        ctx.beginPath();
        ctx.arc(progress * canvas.offsetWidth, canvas.offsetHeight - (crashMultiplier - 1) * 50, 8, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }, [currentMultiplier, gamePhase, gameStartTime, crashMultiplier]);

  return (
    <>
      <GambaUi.Portal target="screen">
        <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <motion.div
              animate={{
                rotate: gamePhase === GamePhase.PLAYING ? 360 : 0,
                scale: gamePhase === GamePhase.CRASHED ? [1, 1.2, 1] : 1
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 0.5 }
              }}
              className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                rotate: gamePhase === GamePhase.PLAYING ? -360 : 0,
                scale: gamePhase === GamePhase.CRASHED ? [1, 0.8, 1] : 1
              }}
              transition={{
                rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                scale: { duration: 0.5 }
              }}
              className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-l from-green-500/10 to-yellow-500/10 rounded-full blur-3xl"
            />
          </div>

          {/* Main Game Area */}
          <div className="relative z-10 h-full flex flex-col">
            {/* Status Bar */}
            <div className="flex items-center justify-between p-6 bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50">
              <div className="flex items-center gap-6">
                {/* Game Phase Indicator */}
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    gamePhase === GamePhase.BETTING ? 'bg-yellow-400 animate-pulse' :
                    gamePhase === GamePhase.PLAYING ? 'bg-green-400 animate-pulse' :
                    'bg-red-400'
                  }`} />
                  <span className="text-white font-gaming font-semibold">
                    {gamePhase === GamePhase.BETTING ? 'BETTING PHASE' :
                     gamePhase === GamePhase.PLAYING ? 'ROCKET FLYING' :
                     gamePhase === GamePhase.CRASHED ? 'CRASHED' : 'WAITING'}
                  </span>
                </div>

                {/* Timer */}
                {gamePhase === GamePhase.BETTING && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 border border-yellow-400/50 rounded-lg">
                    <FaClock className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 font-mono font-bold">
                      {timeLeft}s
                    </span>
                  </div>
                )}
              </div>

              {/* Current Multiplier */}
              <div className="text-right">
                <div className="text-4xl font-bold font-gaming text-white">
                  {gamePhase === GamePhase.CRASHED ? (
                    <span className="text-red-400">{crashMultiplier.toFixed(2)}x</span>
                  ) : (
                    <span className={currentMultiplier > 2 ? 'text-yellow-400' : 'text-green-400'}>
                      {currentMultiplier.toFixed(2)}x
                    </span>
                  )}
                </div>
                <div className="text-gray-400 text-sm font-secondary">
                  {gamePhase === GamePhase.CRASHED ? 'CRASHED!' : 'Multiplier'}
                </div>
              </div>
            </div>

            {/* Chart Area */}
            <div className="flex-1 relative">
              <canvas
                ref={chartRef}
                className="absolute inset-0 w-full h-full"
                style={{ width: '100%', height: '100%' }}
              />
              
              {/* Rocket Animation */}
              <motion.div
                ref={rocketRef}
                animate={{
                  x: gamePhase === GamePhase.PLAYING ? 300 : 0,
                  y: gamePhase === GamePhase.PLAYING ? -200 : 0,
                  rotate: gamePhase === GamePhase.PLAYING ? 45 : 0,
                  scale: gamePhase === GamePhase.CRASHED ? [1, 0.5, 0] : 1
                }}
                transition={{
                  duration: gamePhase === GamePhase.CRASHED ? 0.5 : 20,
                  ease: "easeOut"
                }}
                className="absolute bottom-20 left-20 text-6xl"
              >
                🚀
              </motion.div>

              {/* Crash Effect */}
              <AnimatePresence>
                {gamePhase === GamePhase.CRASHED && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="text-8xl animate-bounce">💥</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </GambaUi.Portal>

      <GambaUi.Portal target="controls">
        <div className="space-y-4">
          {/* Betting Controls */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Bet Amount</label>
              <GambaUi.WagerInput value={wager} onChange={setWager} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Auto Cashout</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1.01"
                  step="0.01"
                  value={cashoutAt}
                  onChange={(e) => setCashoutAt(parseFloat(e.target.value) || 1.01)}
                  className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  placeholder="2.00"
                />
                <button
                  onClick={() => setAutoCashout(!autoCashout)}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    autoCashout 
                      ? 'bg-green-500 text-black' 
                      : 'bg-gray-600 text-white'
                  }`}
                >
                  {autoCashout ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {!wallet.connected ? (
              <GambaUi.Button main onClick={connect}>
                Connect Wallet
              </GambaUi.Button>
            ) : gamePhase === GamePhase.BETTING ? (
              <GambaUi.Button 
                main 
                onClick={placeBet}
                disabled={hasActiveBet}
              >
                {hasActiveBet ? 'Bet Placed' : 'Place Bet'}
              </GambaUi.Button>
            ) : hasActiveBet && !hasCashedOut ? (
              <GambaUi.Button 
                main 
                onClick={cashOut}
              >
                Cash Out - {currentMultiplier.toFixed(2)}x
              </GambaUi.Button>
            ) : (
              <div className="flex-1 bg-gray-600 text-center py-3 rounded-lg text-gray-300">
                {hasCashedOut ? 'Cashed Out!' : 'Waiting for next round...'}
              </div>
            )}
          </div>
        </div>
      </GambaUi.Portal>

      <GambaUi.Portal target="sidebar">
        <div className="space-y-6">
          {/* Current Round Bets */}
          <BetsDisplay 
            currentBets={currentBets} 
            gamePhase={gamePhase}
          />

          {/* Previous Round Results (only show if there are any) */}
          {previousRoundBets.length > 0 && (
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <FaChartLine className="w-4 h-4 text-purple-400" />
                <h3 className="font-bold text-white font-gaming">Previous Round</h3>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {previousRoundBets.map((bet) => (
                  <div key={bet.id} className="flex items-center justify-between p-2 bg-gray-700/50 rounded-lg">
                    <div>
                      <div className="text-sm font-semibold text-white">{bet.player}</div>
                      <div className="text-xs text-gray-400">
                        <TokenValue amount={bet.amount} />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-bold ${
                        bet.status === 'cashed_out' ? 'text-green-400' :
                        bet.status === 'crashed' ? 'text-red-400' :
                        'text-yellow-400'
                      }`}>
                        {bet.status === 'cashed_out' ? `${bet.cashoutMultiplier?.toFixed(2)}x` :
                         bet.status === 'crashed' ? 'LOST' :
                         'ACTIVE'}
                      </div>
                      {bet.profit && (
                        <div className="text-xs text-green-400">
                          +<TokenValue amount={bet.profit} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Game History */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-4">
              <FaChartLine className="w-4 h-4 text-purple-400" />
              <h3 className="font-bold text-white font-gaming">Recent Games</h3>
            </div>
            <div className="space-y-2">
              {gameHistory.map((game, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-700/50 rounded-lg">
                  <div className={`font-bold ${
                    game.multiplier >= 2 ? 'text-green-400' :
                    game.multiplier >= 1.5 ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {game.multiplier.toFixed(2)}x
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(game.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </GambaUi.Portal>
    </>
  );
}

export default Crash;