// src/components/sections/UserButton.tsx

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTrigger,
} from "./credenza";
import {
  GambaPlatformContext,
  GambaUi,
  TokenValue,
  useCurrentToken,
  useUserBalance,
} from "gamba-react-ui-v2";
import React, { useContext, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { FaWallet, FaCopy, FaSignOutAlt, FaCoins, FaCheckCircle } from "react-icons/fa";
import { Modal } from "@/components/ui/Modal";
import { PublicKey } from "@solana/web3.js";
import { TOKENS } from "../../../config";
import dynamic from "next/dynamic";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletAddress } from "gamba-react-v2";
import { motion } from "framer-motion";
import { toast } from "sonner";

function ConnectedButton() {
  const [modal, setModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const wallet = useWallet();
  const ref = useRef<HTMLDivElement>(null!);
  const address = useWalletAddress();
  const tokensArray = Object.values(TOKENS);

  const context = useContext(GambaPlatformContext);
  const selectedToken = useCurrentToken();
  const balance = useUserBalance();
  const [visible, setVisible] = useState(false);

  const setToken = (token: PublicKey) => {
    context.setToken(token);
    setVisible(false);
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(address.toBase58());
    setCopied(true);
    toast.success("Address copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const disconnect = () => {
    wallet.disconnect();
    setModal(false);
    toast.success("Wallet disconnected");
  };

  return (
    <>
      {modal && (
        <Modal closeOnBackdropClick={true} onClose={() => setModal(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-96 bg-gray-900/95 backdrop-blur-xl border border-gray-600/50 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 border-b border-gray-600/30 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full flex items-center justify-center border border-yellow-400/30">
                  <FaWallet className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-gaming text-white">Wallet Connected</h3>
                  <p className="text-gray-400 text-sm font-secondary">Manage your wallet and tokens</p>
                </div>
              </div>
              
              {/* Wallet Address */}
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm font-secondary mb-1">Wallet Address</p>
                    <p className="text-white font-mono text-sm">
                      {`${address.toBase58().slice(0, 6)}...${address.toBase58().slice(-6)}`}
                    </p>
                  </div>
                  <button
                    onClick={copyAddress}
                    className="p-2 bg-gray-700/50 hover:bg-gray-600/70 border border-gray-600/50 hover:border-yellow-400/50 rounded-lg transition-all duration-300"
                  >
                    {copied ? (
                      <FaCheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <FaCopy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Current Balance */}
              {selectedToken && (
                <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 mt-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        className="w-8 h-8 rounded-full border border-gray-600/50"
                        src={selectedToken.image}
                        alt="Token"
                      />
                      <div>
                        <p className="text-gray-300 text-sm font-secondary">Current Balance</p>
                        <p className="text-white font-bold font-mono">
                          <TokenValue amount={balance.balance} />
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-xs font-secondary">{selectedToken.symbol}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Token Selection */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaCoins className="w-5 h-5 text-purple-400" />
                <p className="text-white font-bold font-gaming">Select Token</p>
              </div>
              
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {tokensArray.map((token, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 w-full ${
                      selectedToken?.mint.equals(token.mint)
                        ? "bg-yellow-500/10 border-yellow-400/50 shadow-lg shadow-yellow-400/10"
                        : "bg-gray-800/30 border-gray-700/50 hover:bg-gray-700/50 hover:border-gray-600/50"
                    }`}
                    onClick={() => setToken(token.mint)}
                  >
                    <img
                      className="w-6 h-6 rounded-full"
                      src={token.image}
                      alt={token.symbol}
                    />
                    <div className="flex-1 text-left">
                      <p className="text-white font-semibold font-secondary">{token.symbol}</p>
                      <p className="text-gray-400 text-xs font-secondary">{token.name}</p>
                    </div>
                    {selectedToken?.mint.equals(token.mint) && (
                      <FaCheckCircle className="w-4 h-4 text-yellow-400" />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="border-t border-gray-700/50 p-6">
              <button
                onClick={disconnect}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500/80 to-red-600/80 hover:from-red-500 hover:to-red-600 text-white font-bold font-secondary rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-red-500/20"
              >
                <FaSignOutAlt className="w-4 h-4" />
                Disconnect Wallet
              </button>
            </div>
          </motion.div>
        </Modal>
      )}
      <div className="max-sm:text-xs whitespace-nowrap" ref={ref}>
        <button
          onClick={() => setModal(true)}
          className="flex items-center gap-3 px-4 py-2 bg-gray-800/70 hover:bg-gray-700/80 border border-gray-600/50 hover:border-yellow-400/50 rounded-xl transition-all duration-300 backdrop-blur-sm shadow-lg hover:scale-105"
        >
          <img 
            src={wallet.wallet?.adapter.icon} 
            width={20} 
            height={20}
            className="rounded-full"
            alt="Wallet"
          />
          <span className="text-white font-secondary font-semibold">
            {`${address.toBase58().slice(0, 4)}...${address.toBase58().slice(-4)}`}
          </span>
        </button>
      </div>
    </>
  );
}

export function UserButton() {
  const wallet = useWallet();
  const { select, wallets } = useWallet();
  const [showModal, setShowModal] = useState(false);

  const connect = () => {
    if (wallet.wallet) {
      wallet.connect();
    } else {
      setShowModal(true);
    }
  };

  const handleWalletSelect = (walletName: string) => {
    select(walletName as any);
    setShowModal(false);
  };

  return (
    <>
      {wallet.connected ? (
        <ConnectedButton />
      ) : (
        <>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={connect}
            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold font-gaming rounded-xl transition-all duration-300 shadow-lg shadow-yellow-400/25"
          >
            <FaWallet className="w-4 h-4" />
            {wallet.connecting ? "Connecting..." : "Connect Wallet"}
          </motion.button>

          {showModal && (
            <Modal closeOnBackdropClick={true} onClose={() => setShowModal(false)}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-96 bg-gray-900/95 backdrop-blur-xl border border-gray-600/50 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 border-b border-gray-600/30 p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="flex items-center gap-3">
                      <img src="/logo.png" alt="SOLBET" className="h-12" />
                      <div className="text-2xl font-bold font-gaming bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                        SOLBET
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold font-gaming text-white mb-2">Connect Your Wallet</h3>
                  <p className="text-gray-400 text-sm font-secondary">Choose your preferred wallet to get started</p>
                </div>

                {/* Wallet Options */}
                <div className="p-6">
                  <div className="space-y-3">
                    {wallets.map((walletOption) => (
                      <motion.button
                        key={walletOption.adapter.name}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleWalletSelect(walletOption.adapter.name)}
                        className="flex items-center justify-between p-4 bg-gray-800/50 hover:bg-gray-700/70 border border-gray-700/50 hover:border-yellow-400/50 rounded-xl transition-all duration-300 w-full group"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            className="w-8 h-8 rounded-full"
                            src={walletOption.adapter.icon}
                            alt={walletOption.adapter.name}
                          />
                          <div className="text-left">
                            <p className="text-white font-semibold font-secondary group-hover:text-yellow-400 transition-colors duration-300">
                              {walletOption.adapter.name}
                            </p>
                            {walletOption.readyState === "Installed" && (
                              <p className="text-green-400 text-xs font-secondary">✓ Detected</p>
                            )}
                          </div>
                        </div>
                        <div className="text-gray-400 group-hover:text-yellow-400 transition-colors duration-300">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Solana Branding */}
                  <div className="flex items-center justify-center mt-8 pt-6 border-t border-gray-700/50">
                    <div className="flex items-center gap-2 text-gray-400">
                      <span className="text-sm font-secondary">Powered by</span>
                      <img
                        src="https://bitspawn.io/images/solana-white.png"
                        alt="Solana"
                        className="h-6 opacity-70"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Modal>
          )}
        </>
      )}
    </>
  );
}
