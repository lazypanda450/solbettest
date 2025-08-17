import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import Footer from "@/components/Footer";
import { Progress } from "@/components/ui/progress";
import React from "react";
import Roadmap from "@/components/info/Roadmap";
import { motion } from "framer-motion";
import { FaRocket, FaShieldAlt, FaUsers, FaGem, FaTrophy, FaStar } from "react-icons/fa";

const faqs = [
  {
    question: "🔢 What is the total supply of SOLBET tokens?",
    answer:
      "The total supply of SOLBET tokens is 1 billion. This finite supply is designed to prevent inflation and ensure the token's value remains stable over time. The tokens are allocated for platform development, marketing, liquidity pools, and community rewards to support the ecosystem's growth on the Solana blockchain.",
  },
  {
    question: "🔄 How can I trade SOLBET tokens?",
    answer:
      "SOLBET tokens can be traded on several decentralized exchanges (DEXs) within the Solana ecosystem. Thanks to Solana's high throughput and low transaction fees, trading SOLBET tokens is fast and cost-effective, facilitating liquidity and accessibility for token holders.",
  },
  {
    question: "💰 What are the utility and benefits of holding SOLBET tokens?",
    answer:
      "Holding SOLBET tokens offers multiple benefits, including participation in platform governance, access to exclusive games, and eligibility for special promotions and rewards. Additionally, SOLBET tokens may be staked in liquidity pools to earn yield, further incentivizing long-term holding and contribution to the ecosystem's stability.",
  },
  {
    question:
      "🚀 How does the SOLBET token contribute to the platform's growth?",
    answer:
      "The SOLBET token is integral to incentivizing platform growth and user engagement. Through transaction fees, staking rewards, and governance participation, the tokenomics are designed to encourage active involvement and investment in the platform, driving both user adoption and the long-term sustainability of the SOLBET ecosystem on Solana.",
  },
  {
    question: "🔒 Is the minting of SOLBET tokens locked?",
    answer:
      "Yes, the minting of SOLBET tokens is locked after the initial issuance. This means no new SOLBET tokens can be created beyond the total supply of 1 billion. This decision is made to preserve the token's value and ensure a predictable supply, contributing to the ecosystem's economic stability.",
  },
  {
    question:
      "🔥 Is the liquidity pool (LP) for SOLBET tokens burned or locked?",
    answer:
      "The liquidity pool (LP) tokens for SOLBET are locked in a smart contract for a predetermined period. This locking mechanism is implemented to secure the liquidity pool's stability and protect against unauthorized withdrawals, ensuring confidence in the token's market liquidity.",
  },
];

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
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export default function TokenomicsPage() {
  return (
    <div className="mt-16 mb-16 md:mb-0 flex-1 relative overflow-hidden">
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
          className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-l from-yellow-500/10 to-red-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section - Premium */}
      <motion.section 
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="relative px-4 md:px-12 py-20 lg:py-32"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid items-center grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div variants={fadeInUp} className="flex flex-col justify-center space-y-8">
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full border border-yellow-400/30 w-fit"
              >
                <FaStar className="w-4 h-4 text-yellow-400 mr-2" />
                <span className="text-sm font-semibold font-secondary text-yellow-400">Premium Gaming Platform</span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-bold font-gaming bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent leading-tight">
                $SOLBET
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-xl lg:text-2xl text-gray-300 leading-relaxed font-secondary">
                The future of <span className="text-yellow-400 font-semibold">decentralized gaming</span> on Solana. 
                Experience lightning-fast transactions, provably fair gaming, and 
                <span className="text-purple-400 font-semibold"> next-generation casino entertainment</span>.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold font-secondary rounded-xl hover:scale-105 transition-all duration-300 shadow-2xl shadow-yellow-400/25">
                  Start Gaming
                </button>
                <button className="px-8 py-4 border border-gray-600 text-white font-semibold font-secondary rounded-xl hover:bg-gray-800 transition-all duration-300">
                  Learn More
                </button>
              </motion.div>
            </motion.div>
            
            <motion.div variants={scaleIn} className="flex items-center justify-center relative">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-purple-600/20 rounded-full blur-2xl"
              />
              <img
                alt="SOLBET Logo"
                className="w-80 h-80 object-cover rounded-full relative z-10 shadow-2xl ring-4 ring-yellow-400/30"
                src="/favicon.png"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-24 px-4 md:px-12 bg-gradient-to-b from-transparent via-gray-900/50 to-transparent"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold font-gaming mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Why Choose SOLBET?
            </h2>
            <p className="text-xl text-gray-300 font-secondary max-w-3xl mx-auto">
              Experience the next generation of decentralized gaming with cutting-edge features
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FaRocket,
                title: "Lightning Fast",
                description: "Built on Solana for instant transactions and ultra-low fees",
                color: "from-blue-400 to-purple-600"
              },
              {
                icon: FaShieldAlt,
                title: "Provably Fair",
                description: "Transparent, verifiable gaming with blockchain-powered fairness",
                color: "from-green-400 to-blue-500"
              },
              {
                icon: FaUsers,
                title: "Community Driven",
                description: "Decentralized governance with community-first decision making",
                color: "from-purple-400 to-pink-600"
              },
              {
                icon: FaGem,
                title: "Premium Games",
                description: "High-quality games with immersive graphics and smooth gameplay",
                color: "from-yellow-400 to-red-500"
              },
              {
                icon: FaTrophy,
                title: "Rewards System",
                description: "Earn while you play with our innovative staking and reward mechanisms",
                color: "from-orange-400 to-yellow-600"
              },
              {
                icon: FaStar,
                title: "Premium Experience",
                description: "VIP features, exclusive games, and personalized gaming experience",
                color: "from-pink-400 to-purple-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"
                  style={{backgroundImage: `linear-gradient(135deg, ${feature.color.split(' ')[1]}, ${feature.color.split(' ')[3]})`}}
                />
                <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 h-full hover:border-gray-600 transition-all duration-300">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold font-gaming mb-4 text-white">{feature.title}</h3>
                  <p className="text-gray-300 font-secondary leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Tokenomics - Premium Version */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-24 px-4 md:px-12"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl lg:text-6xl font-bold font-gaming mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Tokenomics
              </h2>
              <p className="text-xl text-gray-300 font-secondary leading-relaxed mb-8">
                The SOLBET Token ecosystem is designed for sustainable growth, 
                community governance, and long-term value creation. Our carefully 
                crafted tokenomics ensure fair distribution and incentivize platform development.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                  <span className="text-gray-300 font-secondary">Total Supply: 1 Billion Tokens</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full"></div>
                  <span className="text-gray-300 font-secondary">Locked Minting Authority</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
                  <span className="text-gray-300 font-secondary">Community-First Distribution</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="space-y-6">
              {[
                { label: "Liquidity Pool", percentage: 40, color: "from-blue-400 to-purple-600" },
                { label: "Community", percentage: 20, color: "from-green-400 to-blue-500" },
                { label: "Investors", percentage: 20, color: "from-yellow-400 to-orange-500" },
                { label: "Staking Rewards", percentage: 15, color: "from-purple-400 to-pink-600" },
                { label: "Team", percentage: 5, color: "from-red-400 to-yellow-500" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="relative"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold font-secondary text-white">{item.label}</span>
                    <span className="font-bold font-mono text-white">{item.percentage}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.percentage}%` }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.1 }}
                      className={`h-full bg-gradient-to-r ${item.color} rounded-full relative`}
                    >
                      <motion.div
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Roadmap - Premium */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-24 px-4 md:px-12 bg-gradient-to-b from-transparent via-gray-900/30 to-transparent"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold font-gaming mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Roadmap to the Future
            </h2>
            <p className="text-xl text-gray-300 font-secondary max-w-3xl mx-auto">
              Our journey to revolutionize decentralized gaming
            </p>
          </motion.div>
          <Roadmap />
        </div>
      </motion.section>

      {/* FAQ - Premium */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-24 px-4 md:px-12"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold font-gaming mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-300 font-secondary">
              Everything you need to know about SOLBET
            </p>
          </motion.div>
          
          <motion.div variants={staggerContainer}>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <AccordionItem 
                    value={`item-${index}`} 
                    className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl px-6 hover:border-gray-600 transition-all duration-300"
                  >
                    <AccordionTrigger className="text-lg font-semibold font-secondary text-white py-6 hover:text-yellow-400 transition-colors duration-200">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 font-secondary leading-relaxed pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-24 px-4 md:px-12"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={fadeInUp} className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-12">
              <h2 className="text-4xl lg:text-5xl font-bold font-gaming mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Ready to Experience the Future?
              </h2>
              <p className="text-xl text-gray-300 font-secondary mb-8 max-w-2xl mx-auto">
                Join thousands of players already enjoying the most advanced decentralized casino platform
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold font-secondary rounded-xl shadow-2xl shadow-yellow-400/25"
                >
                  Start Playing Now
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border border-gray-600 text-white font-semibold font-secondary rounded-xl hover:bg-gray-800 transition-all duration-300"
                >
                  View Tokenomics
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
