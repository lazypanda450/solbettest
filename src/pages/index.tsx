import AdCarousel from "@/components/home/AdCarousel";
import Footer from "@/components/Footer";
import GameSlide from "@/components/game/carousels/GamesCarousel";
import GlobalRecent from "@/components/platform/GlobalRecent";
import Info from "@/components/home/Info";
import LeaderboardInfo from "@/components/home/leaderboard";
import { motion } from "framer-motion";
import { FaRocket, FaShieldAlt, FaGem, FaTrophy, FaCoins, FaUsers, FaStar, FaGamepad } from "react-icons/fa";

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

export default function Home() {
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
          className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"
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
        <motion.div
          animate={{
            rotate: 180,
            scale: [1, 1.3, 1]
          }}
          transition={{
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            scale: { duration: 12, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-green-500/10 to-purple-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <motion.section 
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="relative px-4 md:px-12 py-16 lg:py-24"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full border border-yellow-400/30 w-fit mx-auto mb-8"
          >
            <FaStar className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-sm font-semibold font-secondary text-yellow-400">Welcome to the Future of Gaming</span>
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className="text-5xl lg:text-8xl font-bold font-gaming bg-gradient-to-r from-white via-yellow-200 to-orange-400 bg-clip-text text-transparent leading-tight mb-8">
            SOLBET CASINO
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-xl lg:text-2xl text-gray-300 leading-relaxed font-secondary mb-12 max-w-4xl mx-auto">
            Experience the most advanced <span className="text-yellow-400 font-semibold">decentralized casino</span> on Solana. 
            Lightning-fast transactions, provably fair gaming, and <span className="text-purple-400 font-semibold">next-generation entertainment</span>.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 193, 7, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold font-secondary text-lg rounded-xl shadow-2xl shadow-yellow-400/25"
            >
              <FaGamepad className="inline-block mr-2" />
              Start Playing Now
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 border-2 border-gray-600 text-white font-semibold font-secondary text-lg rounded-xl hover:bg-gray-800 hover:border-yellow-400 transition-all duration-300"
            >
              <FaCoins className="inline-block mr-2" />
              View Games
            </motion.button>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {[
              { number: "1B+", label: "Token Supply", icon: FaCoins },
              { number: "10K+", label: "Active Players", icon: FaUsers },
              { number: "50+", label: "Games Available", icon: FaGamepad },
              { number: "99.9%", label: "Uptime", icon: FaTrophy }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full flex items-center justify-center border border-yellow-400/30">
                  <stat.icon className="w-8 h-8 text-yellow-400" />
                </div>
                <div className="text-3xl font-bold font-gaming text-white mb-2">{stat.number}</div>
                <div className="text-gray-400 font-secondary">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Sections with Premium Wrappers */}
      <motion.div 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="space-y-24"
      >
        {/* Ad Carousel */}
        <motion.section variants={fadeInUp} className="px-4 md:px-12">
          <AdCarousel />
        </motion.section>

        {/* Leaderboard */}
        <motion.section variants={fadeInUp} className="px-4 md:px-12 py-12 bg-gradient-to-b from-transparent via-gray-900/30 to-transparent">
          <LeaderboardInfo />
        </motion.section>

        {/* Games - Already has premium styling */}
        <motion.section variants={fadeInUp} className="px-4 md:px-12">
          <GameSlide />
        </motion.section>

        {/* Recent Plays */}
        <motion.section variants={fadeInUp} className="px-4 md:px-12 py-12 bg-gradient-to-b from-transparent via-gray-900/30 to-transparent">
          <GlobalRecent />
        </motion.section>

        {/* Info Section */}
        <motion.section variants={fadeInUp} className="px-4 md:px-12">
          <Info />
        </motion.section>
      </motion.div>

      <Footer />
    </div>
  );
}
