// src/pages/staking.tsx

import * as anchor from "@project-serum/anchor";

import { AnchorProvider, Program } from "@project-serum/anchor";
// Card components replaced with custom styling
import { Connection, Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaLock, FaCoins, FaChartLine, FaWallet, FaClock, FaGift, FaInfinity } from "react-icons/fa";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import { Button } from "@/components/ui/button";
import ConfirmStakeSolModal from "@/components/stake/ConfirmStakeSolModal";
import Link from "next/link";
import StakeStats from "@/components/stake/Stake-stats";
import { UserButton } from "@/components/ui/UserButton";
import idl from "@/utils/stakeidl.json";
import { toast } from "sonner";

const Staking = () => {
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(0);
  const [stakeAmount, setStakeAmount] = useState<string>("0.1");
  const [claimAmount, setClaimAmount] = useState<number>(1);
  const [claimableAmount, setClaimableAmount] = useState<number>(0);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
  const wallet = useWallet();

  const parsedStakeAmount = parseFloat(stakeAmount);
  const isStakeAmountValid = !isNaN(parsedStakeAmount) && parsedStakeAmount > 0;

  const programID = new PublicKey(
    "5kP2Xzwtu6tavCubsRcPtrXkuZTNVGcAhd5JSyPhJUVp",
  );
  const vaultID = new PublicKey("H5srDSSLbeXM2kGzwo16tZdsRadgGFtZsgvETNG6TxzE");
  const vaultSplTokenAccount = new PublicKey(
    "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",
  );

  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed",
  );
  const provider = new AnchorProvider(connection, wallet as any, {
    preflightCommitment: "processed",
  });
  const program = new Program(idl as any, programID, provider);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!publicKey) return;
      const balanceInLamports = await connection.getBalance(publicKey);
      setBalance(balanceInLamports / 1e9);
    };

    const fetchclaimableAmount = async () => {
      if (!publicKey) return;
      try {
        const response = await fetch(
          `/api/stake?publickey=${publicKey.toString()}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch claim amount");
        }
        const stakeAccounts = await response.json();
        if (stakeAccounts.length > 0) {
          const totalclaimableAmount = stakeAccounts.reduce(
            (acc: number, curr: { account: { claimableAmount: string } }) => {
              const claimableAmount = parseFloat(curr.account.claimableAmount);
              return acc + (isNaN(claimableAmount) ? 0 : claimableAmount);
            },
            0,
          );
          setClaimableAmount(totalclaimableAmount);
        } else {
          setClaimableAmount(0);
        }
      } catch (error) {
        console.error("Error fetching claim amount:", error);
        setClaimableAmount(0);
      }
    };

    fetchBalance();
    fetchclaimableAmount();
  }, [publicKey, connection]);

  const handleStake = async () => {
    if (!publicKey) {
      toast.error("Please connect your wallet.");
      return;
    }

    if (!isStakeAmountValid) {
      toast.error("Please enter a valid stake amount.");
      return;
    }

    try {
      const stakeAmountLamports = new anchor.BN(parsedStakeAmount * 1e9);

      const stakeAccountKeypair = Keypair.generate();

      await program.rpc.stakeSol(stakeAmountLamports, {
        accounts: {
          vault: vaultID,
          stakeAccount: stakeAccountKeypair.publicKey,
          staker: publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [stakeAccountKeypair],
      });

      setStakeAmount("0");
      setShowConfirmModal(false);
      toast.success(`Successfully staked ${parsedStakeAmount} SOL.`);
    } catch (error) {
      toast.error(`Failed to stake ${parsedStakeAmount} SOL: ${error}`);
    }
  };

  const handleStakeConfirm = () => {
    const amount = parseFloat(stakeAmount);
    if (!isNaN(amount) && amount > 0) {
      setShowConfirmModal(false);
      handleStake();
    } else {
      toast.error("Invalid stake amount.");
    }
  };

  // batch claim all accounts with the same public key as the stake account for the user
  const handleClaim = async () => {
    if (!publicKey) {
      toast.error("Please connect your wallet.");
      return;
    }

    try {
      await program.rpc.claimRewards({
        accounts: {
          vault: vaultID,
          vaultSigner: "YOUR_VAULT_SIGNER_PUBLIC_KEY", // Replace with the public key of the vault signer
          vaultSplTokenAccount: vaultSplTokenAccount,
          stakeAccount: "YOUR_STAKE_ACCOUNT_PUBLIC_KEY", // Replace with the public key of the stake account
          staker: publicKey,
          stakerSplTokenAccount: "YOUR_STAKER_SPL_TOKEN_ACCOUNT_PUBLIC_KEY", // Replace with the public key of the staker's SPL token account
          tokenProgram: new PublicKey(
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          ),
        },
      });

      setClaimableAmount(0);

      toast.success(`Successfully claimed rewards.`);
    } catch (error) {
      toast.error(`Failed to claim rewards: ${error}`);
    }
  };

  const handleStakeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setStakeAmount(value);
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

  const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, ease: "easeOut" }
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
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              rotate: -360,
              scale: [1, 1.2, 1]
            }}
            transition={{
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-l from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              rotate: 180,
              scale: [1, 1.3, 1]
            }}
            transition={{
              rotate: { duration: 30, repeat: Infinity, ease: "linear" },
              scale: { duration: 12, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"
          />
        </div>

        <motion.div 
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="flex-col md:flex relative z-10"
        >
          <div className="mb-16 md:mb-0 flex-1 space-y-8 p-4 md:p-8 md:px-12">
            {/* Hero Section */}
            <motion.div 
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-full border border-green-400/30 w-fit mx-auto mb-6">
                <FaLock className="w-4 h-4 text-green-400 mr-2" />
                <span className="text-sm font-semibold font-secondary text-green-400">Secure Staking Platform</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold font-gaming bg-gradient-to-r from-white via-green-200 to-emerald-400 bg-clip-text text-transparent leading-tight mb-6">
                STAKE & EARN
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed font-secondary mb-8 max-w-4xl mx-auto">
                Stake your <span className="text-yellow-400 font-semibold">SOL</span> and earn <span className="text-green-400 font-semibold">$SOLBET rewards</span> daily. 
                Secure, transparent, and profitable staking with <span className="text-purple-400 font-semibold">100-day rewards cycle</span>.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeInUp}>
              <StakeStats />
            </motion.div>

            {/* Stake Action Area */}
            <motion.div variants={fadeInUp} className="flex justify-center items-center">
              <div className="w-full bg-gray-900/80 backdrop-blur-xl border border-gray-600/50 rounded-2xl shadow-2xl shadow-black/20 overflow-hidden">
                <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 border-b border-gray-600/30 p-8">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-full flex items-center justify-center border border-green-400/30">
                      <FaCoins className="w-6 h-6 text-green-400" />
                    </div>
                    <h2 className="text-3xl font-bold font-gaming text-white text-center">
                      Stake SOL & Earn $SOLBET
                    </h2>
                  </div>
                  
                  <p className="text-center text-gray-300 font-secondary text-lg mb-8 max-w-4xl mx-auto">
                    <span className="text-green-400 font-semibold">Elevate your SOL holdings</span> with our groundbreaking staking mechanism. 
                    Stake 1 SOL and secure <span className="text-yellow-400 font-semibold">800 $SOLBET tokens daily</span>, 
                    directly correlated to your staked amount. Maximize your investment over <span className="text-purple-400 font-semibold">100 days</span> per stake.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <motion.div 
                      variants={scaleIn}
                      className="flex flex-col items-center text-center justify-center p-6 bg-gray-800/50 border border-gray-600/50 rounded-xl shadow-lg backdrop-blur-sm hover:border-yellow-400/50 transition-all duration-300"
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full flex items-center justify-center border border-yellow-400/30 mb-4">
                        <FaWallet className="w-6 h-6 text-yellow-400" />
                      </div>
                      <h4 className="text-yellow-400 text-lg font-bold font-gaming mb-3">
                        Stake Limits
                      </h4>
                      <div className="text-3xl font-extrabold text-white mb-2 font-mono">
                        0.1 - 100
                      </div>
                      <p className="text-sm font-medium text-gray-300 font-secondary">
                        Earn 80 - 80,000 $SOLBET daily
                      </p>
                    </motion.div>

                    <motion.div 
                      variants={scaleIn}
                      className="flex flex-col items-center text-center justify-center p-6 bg-gray-800/50 border border-gray-600/50 rounded-xl shadow-lg backdrop-blur-sm hover:border-green-400/50 transition-all duration-300"
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-full flex items-center justify-center border border-green-400/30 mb-4">
                        <FaInfinity className="w-6 h-6 text-green-400" />
                      </div>
                      <h4 className="text-green-400 text-lg font-bold font-gaming mb-3">
                        Claim Flexibility
                      </h4>
                      <div className="text-4xl font-extrabold text-white mb-2 font-mono">
                        ∞
                      </div>
                      <p className="text-sm font-medium text-gray-300 font-secondary">
                        Claim Anytime
                      </p>
                    </motion.div>

                    <motion.div 
                      variants={scaleIn}
                      className="flex flex-col items-center text-center justify-center p-6 bg-gray-800/50 border border-gray-600/50 rounded-xl shadow-lg backdrop-blur-sm hover:border-purple-400/50 transition-all duration-300"
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-400/20 to-blue-500/20 rounded-full flex items-center justify-center border border-purple-400/30 mb-4">
                        <FaClock className="w-6 h-6 text-purple-400" />
                      </div>
                      <h4 className="text-purple-400 text-lg font-bold font-gaming mb-3">
                        Rewards Duration
                      </h4>
                      <div className="text-3xl font-extrabold text-white mb-2 font-mono">
                        100
                      </div>
                      <p className="text-sm font-medium text-gray-300 font-secondary">
                        Days
                      </p>
                    </motion.div>

                    <motion.div 
                      variants={scaleIn}
                      className="flex flex-col items-center text-center justify-center p-6 bg-gray-800/50 border border-gray-600/50 rounded-xl shadow-lg backdrop-blur-sm hover:border-orange-400/50 transition-all duration-300"
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-400/20 to-red-500/20 rounded-full flex items-center justify-center border border-orange-400/30 mb-4">
                        <FaChartLine className="w-6 h-6 text-orange-400" />
                      </div>
                      <h4 className="text-orange-400 text-lg font-bold font-gaming mb-3">
                        Daily ROI
                      </h4>
                      <div className="text-2xl font-extrabold text-white mb-2 font-mono">
                        $SOLBET
                      </div>
                      <p className="text-sm font-medium text-gray-300 font-secondary">
                        1 SOL = 800 $SOLBET/day
                      </p>
                    </motion.div>
                  </div>
                </div>

                {/* Stake & Claim Sections */}
                <div className="bg-gray-900/50 p-8">
                  <div className="max-w-2xl mx-auto">
                    <Tabs
                      defaultValue="stake"
                      className="flex flex-col items-center justify-center w-full mx-auto"
                    >
                      <TabsList className="flex justify-between w-full max-w-md h-14 mb-8 bg-gray-800/50 border border-gray-600/50 rounded-xl p-1">
                        <TabsTrigger 
                          className="text-lg font-gaming data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-orange-500 data-[state=active]:text-black transition-all duration-300 rounded-lg flex-1" 
                          value="stake"
                        >
                          <FaLock className="w-4 h-4 mr-2" />
                          Stake SOL
                        </TabsTrigger>
                        <TabsTrigger 
                          className="text-lg font-gaming data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-400 data-[state=active]:to-emerald-500 data-[state=active]:text-black transition-all duration-300 rounded-lg flex-1" 
                          value="claim"
                        >
                          <FaGift className="w-4 h-4 mr-2" />
                          Claim $SOLBET
                        </TabsTrigger>
                      </TabsList>

                      {/* Info Banner */}
                      <div className="w-full mb-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/30 rounded-xl p-4 backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                          <FaChartLine className="w-5 h-5 text-blue-400 flex-shrink-0" />
                          <div className="text-sm font-secondary text-gray-300">
                            Explore the benefits of staking: {" "}
                            <Link
                              href="/docs#tokenomics"
                              className="text-blue-400 hover:text-blue-300 font-semibold underline transition-colors duration-300"
                            >
                              Learn More!
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* ROI Banner */}
                      <div className="w-full mb-8 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-400/30 rounded-xl p-6 relative overflow-hidden backdrop-blur-sm">
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-3">
                            <FaCoins className="w-5 h-5 text-yellow-400" />
                            <span className="text-yellow-400 text-sm uppercase font-semibold tracking-wide font-secondary">
                              Projected Daily Yield
                            </span>
                          </div>
                          <div className="text-white text-4xl font-bold font-gaming mb-2">
                            800 $SOLBET / 1 SOL
                          </div>
                          <div className="text-gray-300 text-sm font-secondary">
                            Tokens accumulated daily based on your stake amount
                          </div>
                        </div>
                        <div className="absolute right-4 top-4 w-16 h-16 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-xl"></div>
                        <img
                          src="/favicon.png"
                          alt="Background"
                          className="absolute right-2 -top-2 w-20 h-20 object-contain rounded-lg opacity-20"
                        />
                      </div>

                    {/* Stake & Claim Sections */}
                    {publicKey ? (
                      <>
                        <TabsContent value="stake" className="mb-4 w-full">
                          <div className="flex flex-col items-center justify-center space-y-6">
                            <div className="w-full bg-gray-800/50 border border-gray-600/50 rounded-xl p-6 backdrop-blur-sm">
                              <div className="flex items-center justify-center gap-3 mb-3">
                                <FaWallet className="w-6 h-6 text-yellow-400" />
                                <h4 className="text-yellow-400 text-xl font-bold font-gaming">
                                  Available Balance
                                </h4>
                              </div>
                              <div className="text-center">
                                <div className="text-4xl font-extrabold text-white mb-1 font-mono">
                                  {balance
                                    ? `${balance.toFixed(3)} SOL`
                                    : "Loading..."}
                                </div>
                                <p className="text-gray-400 font-secondary">Ready for staking</p>
                              </div>
                            </div>
                            {/* Stake Input */}
                            <div className="w-full bg-gray-800/50 border border-gray-600/50 rounded-xl p-4 backdrop-blur-sm">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full border border-yellow-400/30">
                                  <img
                                    src="/SOL.png"
                                    alt="SOL"
                                    className="w-6 h-6 rounded-full"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-sm text-gray-400 font-secondary">Token</span>
                                  <span className="text-lg font-semibold text-white font-gaming">SOL</span>
                                </div>
                                <div className="flex-grow">
                                  <input
                                    placeholder="Enter amount to stake"
                                    min="0.1"
                                    max="100"
                                    id="stakeAmount"
                                    className="text-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400/50 w-full px-4 py-3 bg-gray-700/50 text-right text-white placeholder-gray-500 border border-gray-600/50 rounded-lg font-mono transition-all duration-300"
                                    value={stakeAmount}
                                    onChange={handleStakeAmountChange}
                                  />
                                </div>
                              </div>
                              
                              {/* Quick Amount Buttons */}
                              <div className="flex gap-2 mt-4">
                                <Button
                                  onClick={() => {
                                    const halfBalance = ((balance ?? 0) / 2).toString();
                                    setStakeAmount(halfBalance);
                                  }}
                                  size="sm"
                                  variant="outline"
                                  className="flex-1 bg-gray-700/50 border-gray-600/50 text-white hover:bg-gray-600/70 hover:border-yellow-400/50 transition-all duration-300"
                                >
                                  1/2
                                </Button>
                                <Button
                                  onClick={() => {
                                    setStakeAmount((balance ?? 0).toString());
                                  }}
                                  size="sm"
                                  variant="outline"
                                  className="flex-1 bg-gray-700/50 border-gray-600/50 text-white hover:bg-gray-600/70 hover:border-yellow-400/50 transition-all duration-300"
                                >
                                  MAX
                                </Button>
                              </div>
                            </div>
                            <Button
                              className="w-full px-8 py-4 text-xl font-bold font-gaming bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-xl hover:shadow-lg hover:shadow-yellow-400/25 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                              onClick={() => setShowConfirmModal(true)}
                              disabled={
                                !publicKey ||
                                balance === null ||
                                !isStakeAmountValid ||
                                parsedStakeAmount < 0.1 ||
                                parsedStakeAmount > 100 ||
                                parsedStakeAmount > (balance ?? 0)
                              }
                            >
                              <FaLock className="w-5 h-5 mr-2" />
                              {balance === null
                                ? "Balance Not Found!"
                                : !isStakeAmountValid
                                  ? "Enter a valid amount"
                                  : parsedStakeAmount < 0.1
                                    ? "Minimum 0.1 SOL Required"
                                    : parsedStakeAmount > 100
                                      ? "Maximum 100 SOL Allowed"
                                      : parsedStakeAmount > (balance ?? 0)
                                        ? "Insufficient Balance!"
                                        : `Stake ${parsedStakeAmount} SOL`}
                            </Button>

                            {/* ConfirmStakeSolModal */}
                            <ConfirmStakeSolModal
                              show={showConfirmModal}
                              onClose={() => setShowConfirmModal(false)}
                              amount={stakeAmount}
                              onConfirm={handleStakeConfirm}
                              onCheckboxChange={() =>
                                setAgreeTerms(!agreeTerms)
                              }
                              isCheckboxChecked={agreeTerms}
                            />
                          </div>
                        </TabsContent>
                        <TabsContent value="claim" className="mb-4 w-full">
                          <div className="flex flex-col items-center justify-center space-y-6">
                            <div className="w-full bg-gray-800/50 border border-gray-600/50 rounded-xl p-6 backdrop-blur-sm">
                              <div className="flex items-center justify-center gap-3 mb-3">
                                <FaGift className="w-6 h-6 text-green-400" />
                                <h4 className="text-green-400 text-xl font-bold font-gaming">
                                  Claimable Rewards
                                </h4>
                              </div>
                              <div className="text-center">
                                <div className="text-4xl font-extrabold text-white mb-1 font-mono">
                                  {claimableAmount
                                    ? `${claimableAmount.toFixed(2)} $SOLBET`
                                    : "Loading..."}
                                </div>
                                <p className="text-gray-400 font-secondary">Ready for withdrawal</p>
                              </div>
                            </div>
                            {/* Claim Input */}
                            <div className="w-full bg-gray-800/50 border border-gray-600/50 rounded-xl p-4 backdrop-blur-sm">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-full border border-green-400/30">
                                  <img
                                    src="/favicon.png"
                                    alt="SOLBET"
                                    className="w-6 h-6 rounded-full"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-sm text-gray-400 font-secondary">Token</span>
                                  <span className="text-lg font-semibold text-white font-gaming">SOLBET</span>
                                </div>
                                <div className="flex-grow">
                                  <input
                                    placeholder="Enter amount to claim"
                                    min="1"
                                    max={claimableAmount}
                                    id="claimAmount"
                                    className="text-2xl focus:outline-none focus:ring-2 focus:ring-green-400/50 w-full px-4 py-3 bg-gray-700/50 text-right text-white placeholder-gray-500 border border-gray-600/50 rounded-lg font-mono transition-all duration-300"
                                    value={claimAmount}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      setClaimAmount(
                                        value ? parseFloat(value) : 0,
                                      );
                                    }}
                                  />
                                </div>
                              </div>
                              
                              {/* Quick Amount Buttons */}
                              <div className="flex gap-2 mt-4">
                                <Button
                                  onClick={() => {
                                    const halfBalance = (claimableAmount ?? 0) / 2;
                                    setClaimAmount(halfBalance);
                                  }}
                                  size="sm"
                                  variant="outline"
                                  className="flex-1 bg-gray-700/50 border-gray-600/50 text-white hover:bg-gray-600/70 hover:border-green-400/50 transition-all duration-300"
                                >
                                  1/2
                                </Button>
                                <Button
                                  onClick={() => setClaimAmount(claimableAmount)}
                                  size="sm"
                                  variant="outline"
                                  className="flex-1 bg-gray-700/50 border-gray-600/50 text-white hover:bg-gray-600/70 hover:border-green-400/50 transition-all duration-300"
                                >
                                  MAX
                                </Button>
                              </div>
                            </div>
                            <Button
                              className="w-full px-8 py-4 text-xl font-bold font-gaming bg-gradient-to-r from-green-400 to-emerald-500 text-black rounded-xl hover:shadow-lg hover:shadow-green-400/25 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                              onClick={handleClaim}
                              disabled={!claimAmount}
                            >
                              <FaGift className="w-5 h-5 mr-2" />
                              {!claimAmount ? "Enter Amount to Claim" : `Claim ${claimAmount} $SOLBET`}
                            </Button>
                          </div>
                        </TabsContent>
                      </>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="min-h-48 flex justify-center items-center"
                      >
                        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-600/50 rounded-2xl p-8 text-center">
                          <div className="w-20 h-20 bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-full flex items-center justify-center border-2 border-green-400/30 mx-auto mb-6">
                            <FaWallet className="w-10 h-10 text-green-400" />
                          </div>
                          <h3 className="text-2xl font-bold font-gaming text-white mb-4">Connect Wallet to Stake</h3>
                          <p className="text-gray-400 font-secondary mb-6">Connect your wallet to start earning rewards with SOL staking</p>
                          <UserButton />
                        </div>
                      </motion.div>
                    )}
                    </Tabs>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Staking;
