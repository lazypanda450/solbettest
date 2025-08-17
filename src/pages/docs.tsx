// pages/docs.js

import Footer from "@/components/Footer";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { FaBook, FaGamepad, FaCoins, FaListUl, FaShieldAlt, FaChartLine } from "react-icons/fa";

export default function DocsPage() {
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
            className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
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
          className="relative z-10 flex flex-col items-center justify-center mx-auto space-y-8 p-4 md:p-8 md:px-12 max-w-5xl"
        >
          {/* Hero Section */}
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full border border-blue-400/30 w-fit mx-auto mb-6">
              <FaBook className="w-4 h-4 text-blue-400 mr-2" />
              <span className="text-sm font-semibold font-secondary text-blue-400">Platform Documentation</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold font-gaming bg-gradient-to-r from-white via-blue-200 to-purple-400 bg-clip-text text-transparent leading-tight mb-6">
              DOCUMENTATION
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed font-secondary max-w-4xl mx-auto">
              Complete guide to <span className="text-yellow-400 font-semibold">SOLBET Platform</span>. 
              Learn about our casino, tokenomics, and <span className="text-purple-400 font-semibold">decentralized gaming</span> ecosystem.
            </p>
          </motion.div>

          {/* Table of Contents */}
          <motion.section
            variants={fadeInUp}
            id="toc"
            style={{ scrollMarginTop: "4.5rem" }}
            className="w-full bg-gray-900/80 backdrop-blur-xl border border-gray-600/50 rounded-2xl p-8 shadow-2xl shadow-black/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full flex items-center justify-center border border-blue-400/30">
                <FaListUl className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-3xl font-bold font-gaming text-white">Table of Contents</h2>
            </div>
            <ul className="list-none space-y-4">
              <li>
                <a
                  href="#introduction"
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/70 border border-gray-700/50 hover:border-yellow-400/50 transition-all duration-300"
                >
                  <FaBook className="w-4 h-4 text-yellow-400" />
                  <span className="text-gray-300 font-secondary font-semibold">Introduction</span>
                </a>
              </li>
              <li>
                <a
                  href="#casino"
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/70 border border-gray-700/50 hover:border-yellow-400/50 transition-all duration-300"
                >
                  <FaGamepad className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300 font-secondary font-semibold">Casino</span>
                </a>
              </li>
              <li>
                <a
                  href="#tokenomics"
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/70 border border-gray-700/50 hover:border-yellow-400/50 transition-all duration-300"
                >
                  <FaCoins className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-300 font-secondary font-semibold">Tokenomics</span>
                </a>
              </li>
            </ul>
          </motion.section>

          <div className="w-full">
            <Separator className="bg-gray-600/50 mb-8" />
          </div>
          {/* Introduction Section */}
          <motion.section
            variants={fadeInUp}
            id="introduction"
            style={{
              scrollMarginTop: "4.5rem",
              marginBottom: "1rem",
              marginTop: "2rem",
            }}
            className="w-full bg-gray-900/80 backdrop-blur-xl border border-gray-600/50 rounded-2xl p-8 shadow-2xl shadow-black/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full flex items-center justify-center border border-yellow-400/30">
                <FaBook className="w-6 h-6 text-yellow-400" />
              </div>
              <h2 className="text-4xl font-bold font-gaming text-white">
                Introduction
              </h2>
            </div>
            <div className="space-y-6 text-gray-300 font-secondary leading-relaxed">
              <p>
                Welcome to the <span className="text-yellow-400 font-semibold">SOLBET Platform</span> - a pioneering force
                in the decentralized gaming world. At SOLBET, we are more than just
                a platform; we are a vibrant community united by a passion for
                innovative gaming, equitable rewards, and the empowerment of our
                users through the <span className="text-purple-400 font-semibold">$SOLBET token</span>.
              </p>
              <p>
                Our ecosystem is rich with opportunities, from thrilling casino
                games to rewarding staking mechanisms. With SOLBET, you are not just
                participating; you are contributing to the forefront of
                decentralized gaming. This guide will navigate you through the
                essence of SOLBET, including an in-depth look at our Casino,
                Tokenomics, our ambitious Roadmap and much more.
              </p>
              <p>
                Embark on this journey with us, as we explore the endless
                possibilities within the SOLBET ecosystem. Together, let&apos;s
                redefine what it means to engage with <span className="text-green-400 font-semibold">decentralized gaming</span>.
              </p>
            </div>
          </motion.section>

          <div className="w-full">
            <Separator className="bg-gray-600/50 mb-8" />
          </div>

          {/* Casino Section */}
          <motion.section
            variants={fadeInUp}
            id="casino"
            style={{
              scrollMarginTop: "4.5rem",
              marginBottom: "1rem",
              marginTop: "2rem",
            }}
            className="w-full bg-gray-900/80 backdrop-blur-xl border border-gray-600/50 rounded-2xl p-8 shadow-2xl shadow-black/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-full flex items-center justify-center border border-green-400/30">
                <FaGamepad className="w-6 h-6 text-green-400" />
              </div>
              <h2 className="text-4xl font-bold font-gaming text-white">Casino</h2>
            </div>
            <div className="space-y-6 text-gray-300 font-secondary leading-relaxed">
              <p>
                At <span className="text-yellow-400 font-semibold">SOLBET</span>, games are the heart of our platform, designed to ensure
                fairness and security for all players. Utilizing the <span className="text-green-400 font-semibold">Gamba on-chain
                Program</span>, each game is verified to prevent unfair advantages,
                guaranteeing an equitable gaming experience.
              </p>

              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
                <h3 className="text-xl font-bold font-gaming text-white mb-4 flex items-center gap-2">
                  <FaShieldAlt className="w-5 h-5 text-blue-400" />
                  Structure
                </h3>
                <p className="mb-4">
                  Every game within the SOLBET ecosystem is initiated by the player,
                  typically through a frontend application. The structure of a game
                  revolves around three key components:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-yellow-400">pool</strong> - The liquidity pool (and its associated
                      token) utilized for the game.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-green-400">wager</strong> - The amount of tokens staked by the player
                      to commence the game.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-purple-400">bet</strong> - An array representing potential outcomes or
                      multipliers, determining the game&apos;s rewards.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
                <h3 className="text-xl font-bold font-gaming text-white mb-4 flex items-center gap-2">
                  <FaChartLine className="w-5 h-5 text-green-400" />
                  Outcomes
                </h3>
                <p className="mb-4">
                  The essence of each game lies in its outcomes, expressed through
                  potential multipliers within the bet. A random selection from this
                  array, post-game initiation, is multiplied by the wagered amount to
                  calculate the player&apos;s winnings.
                </p>
                <pre className="bg-gray-900/70 border border-gray-600/50 p-4 rounded-lg overflow-auto">
                  <code className="text-green-400">{`// Example: Simulating a coin toss
const coinTossBet = [2, 0]; // 2x multiplier or nothing`}</code>
                </pre>
              </div>

              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
                <h3 className="text-xl font-bold font-gaming text-white mb-4 flex items-center gap-2">
                  <FaShieldAlt className="w-5 h-5 text-purple-400" />
                  Provably Fair RNG
                </h3>
                <p className="mb-4">
                  <span className="text-purple-400 font-semibold">SOLBET</span> champions transparency and trust through provably fair
                  gaming. The outcome of each game is determined by:
                </p>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-blue-400">rng_seed</strong> - A random number seed provided by
                      Gamba&apos;s RNG Provider.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-yellow-400">client_seed</strong> - A customizable seed from the
                      player&apos;s client, ensuring result variability.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-green-400">nonce</strong> - A sequential number that increments with
                      each game, further randomizing outcomes.
                    </div>
                  </li>
                </ul>
                <p className="mb-4">
                  This system guarantees that every game outcome is randomly generated
                  and verifiable, reinforcing our commitment to fairness and integrity
                  in decentralized gaming.
                </p>
                <pre className="bg-gray-900/70 border border-gray-600/50 p-4 rounded-lg overflow-auto">
                  <code className="text-purple-400">{`// Provably fair result calculation
const result = calculateResult(rng_seed, client_seed, nonce, bet);`}</code>
                </pre>

                <p className="mt-4">
                  For more information or to test RNG, please refer to our{" "}
                  <Link href="/provability" className="text-blue-400 hover:text-blue-300 underline font-semibold transition-colors">
                    Provability Explained
                  </Link>
                </p>
              </div>
            </div>
          </motion.section>

          <div className="w-full">
            <Separator className="bg-gray-600/50 mb-8" />
          </div>

          {/* Tokenomics Section */}
          <motion.section
            variants={fadeInUp}
            id="tokenomics"
            style={{
              scrollMarginTop: "4.5rem",
              marginBottom: "1rem",
              marginTop: "2rem",
            }}
            className="w-full bg-gray-900/80 backdrop-blur-xl border border-gray-600/50 rounded-2xl p-8 shadow-2xl shadow-black/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full flex items-center justify-center border border-purple-400/30">
                <FaCoins className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-4xl font-bold font-gaming text-white">Tokenomics</h2>
            </div>
            <div className="space-y-6 text-gray-300 font-secondary leading-relaxed">

              <p>
                At the core of the <span className="text-purple-400 font-semibold">SOLBET ecosystem</span>, the $SOLBET token plays a
                pivotal role in fueling our decentralized platform, serving as the
                backbone for governance, incentive alignment, and seamless value
                transfer among participants.
              </p>
              <p>
                With a total supply capped at <span className="text-yellow-400 font-semibold">1 billion tokens</span>,
                $SOLBET&apos;s design is aimed at preventing inflation, ensuring
                value stability, and fostering ecosystem growth on the <span className="text-green-400 font-semibold">Solana
                blockchain</span>. This strategic allocation supports platform development,
                marketing efforts, liquidity pools, and community rewards.
              </p>
              <p>
                The SOLBET token ecosystem is meticulously structured to promote
                long-term sustainability and platform engagement, rewarding our
                community members, stakeholders, and contributors.
              </p>

              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
                <h3 className="text-xl font-bold font-gaming text-white mb-6">Token Distribution</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-white flex items-center gap-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-yellow-500 rounded-full"></div>
                        Team: 5%
                      </span>
                    </div>
                    <Progress
                      className="w-full rounded-lg h-3 bg-gray-700"
                      value={5}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-white flex items-center gap-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                        Investors: 20%
                      </span>
                    </div>
                    <Progress
                      className="w-full rounded-lg h-3 bg-gray-700"
                      value={20}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-white flex items-center gap-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full"></div>
                        Staking Rewards: 15%
                      </span>
                    </div>
                    <Progress
                      className="w-full rounded-lg h-3 bg-gray-700"
                      value={15}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-white flex items-center gap-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
                        Community Initiatives: 20%
                      </span>
                    </div>
                    <Progress
                      className="w-full rounded-lg h-3 bg-gray-700"
                      value={20}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-white flex items-center gap-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full"></div>
                        Liquidity Pool: 40%
                      </span>
                    </div>
                    <Progress
                      className="w-full rounded-lg h-3 bg-gray-700"
                      value={40}
                    />
                  </div>
                </div>
              </div>

              {/* Key Benefits & Features */}
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
                <h3 className="text-xl font-bold font-gaming text-white mb-4">
                  Key Benefits & Features
                </h3>
                <div className="space-y-4">
                  <p>
                    Holding <span className="text-purple-400 font-semibold">$SOLBET tokens</span> unlocks a myriad of benefits, from
                    governance participation and exclusive game access to special
                    promotions and yield-earning opportunities through staking in
                    liquidity pools.
                  </p>
                  <p>
                    Our commitment to economic stability is underscored by a lock on
                    SOLBET token minting post-initial issuance, ensuring a predictable
                    and finite supply that secures the token&apos;s value.
                  </p>
                  <p>
                    Furthermore, SOLBET liquidity pool tokens are safeguarded within
                    smart contracts for predefined periods, reinforcing market
                    liquidity and ecosystem trust.
                  </p>
                </div>
              </div>

              {/* Trading & Liquidity */}
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
                <h3 className="text-xl font-bold font-gaming text-white mb-4">Trading & Liquidity</h3>
                <div className="space-y-4">
                  <p>
                    Trading <span className="text-purple-400 font-semibold">$SOLBET tokens</span> is swift and efficient on several
                    decentralized exchanges (DEXs) within the <span className="text-green-400 font-semibold">Solana ecosystem</span>,
                    courtesy of Solana&apos;s high throughput and minimal transaction
                    fees.
                  </p>
                  <p>
                    This ecosystem design not only facilitates accessibility and
                    liquidity for token holders but also solidifies $SOLBET as a
                    cornerstone of the decentralized web, powering the SOLBET
                    platform&apos;s ambitious vision.
                  </p>
                </div>
              </div>

              <p className="text-center">
                For more information on $SOLBET, please visit{" "}
                <Link href="/info" className="text-blue-400 hover:text-blue-300 underline font-semibold transition-colors">
                  About Us
                </Link>
              </p>
            </div>
          </motion.section>

          <div className="w-full">
            <Separator className="bg-gray-600/50 mb-8" />
          </div>
        </motion.div>
      </div>
      
      <div className="relative z-10">
        <Footer />
      </div>
    </>
  );
}
