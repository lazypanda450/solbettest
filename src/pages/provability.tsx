import { GambaPlatformContext, GambaUi } from "gamba-react-ui-v2";
import { useContext, useEffect, useState } from "react";
import { useGamba, useGambaProgram, useSendTransaction } from "gamba-react-v2";
import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button";
import { FloatingLabelInput } from "@/components/ui/input-floating";
import Footer from "@/components/Footer";
import { Icon } from "@/components/ui/Icon";
import React from "react";
import { UserButton } from "@/components/ui/UserButton";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { motion } from "framer-motion";
import { FaShieldAlt, FaDice, FaLock, FaCog, FaRandom, FaCheckCircle } from "react-icons/fa";

function ProvabilityPage() {
  const gamba = useGamba();
  const platform = useContext(GambaPlatformContext);
  const program = useGambaProgram();
  const sendTransaction = useSendTransaction();
  const walletModal = useWalletModal();
  const wallet = useWallet();
  const [customClientSeed, setCustomClientSeed] = useState("");
  const [customRngSeed, setCustomRngSeed] = useState("");
  const [nonce, setNonce] = useState(Number(gamba.nonce));
  const [betArray, setBetArray] = useState("[5, 0, 0, 0, 0]");
  const [simulationResult, setSimulationResult] = useState<number | null>(null);
  const [validationMessage, setValidationMessage] = useState("");
  const [validationMessageType, setValidationMessageType] = useState("");

  useEffect(() => {
    validateBetArray(betArray);
  }, [betArray]);

  function validateBetArray(input: string) {
    try {
      const array: number[] = JSON.parse(input);

      if (
        !Array.isArray(array) ||
        !array.every((item) => typeof item === "number")
      ) {
        setValidationMessage(
          "Input must be an array of numbers. Example: [5, 0, 0, 0, 0]",
        );
        setValidationMessageType("error");
        return;
      }
      const sumOfArray = array.reduce((acc, curr) => acc + curr, 0);
      const expectedValue = sumOfArray / array.length;

      if (expectedValue > 1) {
        setValidationMessage("Player has an edge = Not allowed ❌");
        setValidationMessageType("error");
      } else if (expectedValue < 1) {
        setValidationMessage("House has an edge = Not allowed ❌");
        setValidationMessageType("error");
      } else if (expectedValue === 1) {
        setValidationMessage("Equal odds = Allowed ✅");
        setValidationMessageType("success");
      } else {
        setValidationMessage(
          "Unexpected outcome. Please check your bet array.",
        );
        setValidationMessageType("warning");
      }
    } catch (error) {
      setValidationMessage(
        "Invalid format. Make sure it follows the syntax: [2, 0]",
      );
      setValidationMessageType("error");
    }
  }

  const initialize = async () => {
    sendTransaction(
      program.methods.playerInitialize().accounts({}).instruction(),
    );
  };

  const hmac256 = async (
    secretKey: string | undefined,
    message: string | undefined,
  ) => {
    const encoder = new TextEncoder();
    const messageUint8Array = encoder.encode(message);
    const keyUint8Array = encoder.encode(secretKey);
    const cryptoKey = await window.crypto.subtle.importKey(
      "raw",
      keyUint8Array,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );
    const signature = await window.crypto.subtle.sign(
      "HMAC",
      cryptoKey,
      messageUint8Array,
    );
    return Array.from(new Uint8Array(signature))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  const simulateBetOutcome = async () => {
    const bet = JSON.parse(betArray);
    const rngSeed = gamba.nextRngSeedHashed;
    const combinedInput = `${customClientSeed}-${nonce}`;
    const hash = await hmac256(rngSeed, combinedInput);
    const result = parseInt(hash.substring(0, 5), 16) % bet.length;
    setSimulationResult(result);
  };

  const renderBetArrayWithHighlight = () => {
    let bet;
    try {
      bet = JSON.parse(betArray);
    } catch (error) {
      bet = [];
    }
    // Calculate grid columns based on the bet array length to maintain a balanced layout
    const gridTemplateColumns =
      bet.length <= 10
        ? "repeat(auto-fill, minmax(26px, 1fr))"
        : "repeat(auto-fill, minmax(30px, 1fr))";

    return (
      <div className="mt-8 max-w-md mx-auto">
        <p className="text-center mb-4 font-bold">Simulation Result:</p>
        <div
          style={{ gridTemplateColumns }}
          className="p-2 grid gap-2 justify-center items-center max-w-xl mx-auto overflow-x-auto"
        >
          {bet.map(
            (
              value:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | Promise<React.AwaitedReactNode>
                | null
                | undefined,
              index: React.Key | null | undefined,
            ) => (
              <span
                key={index}
                className={`flex justify-center items-center p-3 w-8 h-8 rounded-full ${
                  index === simulationResult
                    ? "bg-green-500 animate-pulse"
                    : "bg-red-500"
                }`}
              >
                {value}x
              </span>
            ),
          )}
        </div>
      </div>
    );
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
          className="absolute top-20 right-10 w-80 h-80 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full blur-3xl"
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
          className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-l from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div 
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="relative z-10 space-y-8 p-4 md:p-8 md:px-12 max-w-6xl mx-auto"
      >
        {/* Hero Section */}
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-full border border-green-400/30 w-fit mx-auto mb-6">
            <FaShieldAlt className="w-4 h-4 text-green-400 mr-2" />
            <span className="text-sm font-semibold font-secondary text-green-400">Provably Fair Gaming</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold font-gaming bg-gradient-to-r from-white via-green-200 to-blue-400 bg-clip-text text-transparent leading-tight mb-6">
            PROVABLY FAIR RNG
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed font-secondary max-w-4xl mx-auto">
            Experience <span className="text-green-400 font-semibold">complete transparency</span> in gaming. 
            Verify every outcome with our <span className="text-blue-400 font-semibold">provably fair system</span>.
          </p>
        </motion.div>

        <div className="min-h-[50svh]">
          <motion.section variants={fadeInUp} className="w-full bg-gray-900/80 backdrop-blur-xl border border-gray-600/50 rounded-2xl p-8 shadow-2xl shadow-black/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-full flex items-center justify-center border border-green-400/30">
                <FaRandom className="w-6 h-6 text-green-400" />
              </div>
              <h2 className="text-3xl font-bold font-gaming text-white">Provably Fair System</h2>
            </div>
            <div className="space-y-6 text-gray-300 font-secondary leading-relaxed">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <FaShieldAlt className="w-5 h-5 text-green-400" />
                    <h3 className="text-lg font-bold font-gaming text-white">How It Works</h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="text-green-400 font-semibold">RNG Seed</span> - Random number from Gamba&apos;s provider
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="text-blue-400 font-semibold">Client Seed</span> - Your customizable seed for variability
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="text-purple-400 font-semibold">Nonce</span> - Sequential number that increments each game
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="text-yellow-400 font-semibold">Bet Array</span> - Your game&apos;s possible outcomes
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <FaCheckCircle className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-bold font-gaming text-white">Verification</h3>
                  </div>
                  <p className="text-sm mb-4">
                    Every game result can be independently verified using cryptographic hashing, ensuring complete transparency and fairness.
                  </p>
                  <div className="bg-gray-900/70 border border-gray-600/50 p-3 rounded-lg">
                    <code className="text-xs text-green-400">
                      result = hash(rng_seed + client_seed + nonce)
                    </code>
                  </div>
                </div>
              </div>

            {!gamba.userCreated ? (
              <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FaLock className="w-5 h-5 text-yellow-400" />
                  <h3 className="text-lg font-bold font-gaming text-white">First Time Setup</h3>
                </div>
                <p className="mb-4">
                  Since this is your first time, you can request the initial hashed seed ahead of time. 
                  After this, seeds will be generated automatically for each play.
                </p>
                {wallet.connected ? (
                  <Button
                    className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold font-secondary rounded-xl hover:scale-105 transition-all duration-300"
                    onClick={initialize}
                  >
                    <FaLock className="w-4 h-4 mr-2" />
                    Get Hashed Seed
                  </Button>
                ) : (
                  <div className="flex justify-center">
                    <UserButton />
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-green-500/10 border border-green-400/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FaCheckCircle className="w-5 h-5 text-green-400" />
                  <h3 className="text-lg font-bold font-gaming text-white">Active Session</h3>
                </div>
                <p className="mb-6">
                  Your provably fair system is active. The <span className="text-green-400 font-semibold">RNG seed</span> is generated automatically for each play. 
                  Your <span className="text-blue-400 font-semibold">client seed</span> affects the result of your next game.
                </p>
                <div className="grid gap-6">
                  <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Next RNG Seed (SHA256)</label>
                    <FloatingLabelInput
                      id="rngSeed"
                      label="Next RNG Seed"
                      value={gamba.nextRngSeedHashed || ""}
                      disabled
                      className="bg-gray-900/70 border-gray-600/50"
                    />
                  </div>
                  <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Client Seed (Customizable)</label>
                    <div className="relative w-full">
                      <FloatingLabelInput
                        className="w-full pr-12 bg-gray-900/70 border-gray-600/50"
                        id="clientSeed"
                        label="Client Seed"
                        value={platform.clientSeed}
                        disabled={gamba.isPlaying}
                        maxLength={32}
                        onChange={(event: { target: { value: string } }) =>
                          platform.setClientSeed(event.target.value)
                        }
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute inset-y-0 right-2 p-2 bg-gray-800/70 border-gray-600/50 hover:bg-gray-700/70"
                        disabled={gamba.isPlaying}
                        onClick={() =>
                          platform.setClientSeed(
                            String((Math.random() * 1e9) | 0),
                          )
                        }
                      >
                        <Icon.Shuffle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            </div>
          </motion.section>

        {wallet.connected && (
          <motion.section variants={fadeInUp} className="w-full bg-gray-900/80 backdrop-blur-xl border border-gray-600/50 rounded-2xl p-8 shadow-2xl shadow-black/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400/20 to-blue-500/20 rounded-full flex items-center justify-center border border-purple-400/30">
                <FaCog className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-3xl font-bold font-gaming text-white">Test RNG Simulator</h2>
            </div>
            <div className="space-y-6 text-gray-300 font-secondary leading-relaxed">
              <p className="mb-6">
                Test the RNG system with custom parameters. Enter your own{" "}
                <span className="text-purple-400 font-semibold">rng_seed</span>,{" "}
                <span className="text-blue-400 font-semibold">client_seed</span>,{" "}
                <span className="text-green-400 font-semibold">nonce</span>, and{" "}
                <span className="text-yellow-400 font-semibold">bet array</span> to simulate game outcomes.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Custom RNG Seed</label>
                  <FloatingLabelInput
                    id="rngSeed"
                    label="RNG Seed"
                    value={customRngSeed}
                    onChange={(event: {
                      target: { value: React.SetStateAction<string> };
                    }) => setCustomClientSeed(event.target.value)}
                    className="bg-gray-900/70 border-gray-600/50"
                  />
                </div>
                <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Client Seed</label>
                  <div className="relative w-full">
                    <FloatingLabelInput
                      className="w-full pr-12 bg-gray-900/70 border-gray-600/50"
                      id="clientSeed"
                      label="Client Seed"
                      value={platform.clientSeed}
                      disabled={gamba.isPlaying}
                      maxLength={32}
                      onChange={(event: { target: { value: string } }) =>
                        platform.setClientSeed(event.target.value)
                      }
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute inset-y-0 right-2 p-2 bg-gray-800/70 border-gray-600/50 hover:bg-gray-700/70"
                      disabled={gamba.isPlaying}
                      onClick={() =>
                        platform.setClientSeed(String((Math.random() * 1e9) | 0))
                      }
                    >
                      <Icon.Shuffle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Nonce (Game Counter)</label>
                  <FloatingLabelInput
                    id="nonce"
                    label="Nonce"
                    type="number"
                    value={nonce}
                    onChange={(event: { target: { value: any } }) =>
                      setNonce(Number(event.target.value))
                    }
                    className="bg-gray-900/70 border-gray-600/50"
                  />
                </div>
                <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Bet Array (JSON Format)</label>
                  <FloatingLabelInput
                    id="betArray"
                    label="Bet Array"
                    value={betArray}
                    onChange={(e: {
                      target: { value: React.SetStateAction<string> };
                    }) => setBetArray(e.target.value)}
                    className="bg-gray-900/70 border-gray-600/50"
                  />
                </div>
              </div>
              
              <div className={`p-4 rounded-xl border ${
                validationMessageType === "error"
                  ? "bg-red-500/10 border-red-400/30 text-red-400"
                  : validationMessageType === "success"
                    ? "bg-green-500/10 border-green-400/30 text-green-400"
                    : validationMessageType === "warning"
                      ? "bg-yellow-500/10 border-yellow-400/30 text-yellow-400"
                      : "bg-gray-800/50 border-gray-600/50 text-gray-400"
              }`}>
                <div className="flex items-center gap-2">
                  {validationMessageType === "success" && <FaCheckCircle className="w-4 h-4" />}
                  {validationMessageType === "error" && <FaDice className="w-4 h-4" />}
                  <span className="font-semibold">{validationMessage}</span>
                </div>
              </div>
              
              <Button
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-400 to-blue-500 text-white font-bold font-secondary rounded-xl hover:scale-105 transition-all duration-300"
                onClick={simulateBetOutcome}
              >
                <FaDice className="w-4 h-4 mr-2" />
                Simulate Outcome
              </Button>
              {simulationResult !== null && (
                <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-bold font-gaming text-white mb-4 text-center">Simulation Result</h3>
                  {renderBetArrayWithHighlight()}
                </div>
              )}
            </div>
          </motion.section>
        )}
        </div>
      </motion.div>
      
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(ProvabilityPage), { ssr: false });
