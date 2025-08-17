/* eslint-disable @next/next/no-img-element */

import { motion } from "framer-motion";
import { FaRocket, FaUsers, FaHandshake, FaCheck, FaClock, FaCalendarAlt } from "react-icons/fa";

const Roadmap = () => {
  const cards = [];
  const cardInfo = [
    {
      icon: FaUsers,
      index: "01",
      date: "Q1 2024",
      title: "Brand and Community Building",
      status: "completed",
      features: [
        "Launch of social media platforms",
        "Community growth initiatives", 
        "$SOLBET brand establishment",
        "Core team formation"
      ],
    },
    {
      icon: FaRocket,
      index: "02",
      date: "Q2 2024", 
      title: "Platform Launch & Tokenomics",
      status: "completed",
      features: [
        "Official website launch",
        "$SOLBET token deployment",
        "Casino gaming platform",
        "Marketing campaign rollout"
      ],
    },
    {
      icon: FaHandshake,
      index: "03",
      date: "Q3 2024",
      title: "Strategic Partnerships",
      status: "in-progress",
      features: [
        "Gaming industry partnerships",
        "Influencer collaborations",
        "Exclusive member benefits",
        "Platform integrations"
      ],
    },
    {
      icon: FaClock,
      index: "04",
      date: "Q4 2024",
      title: "Advanced Features",
      status: "planned",
      features: [
        "Mobile app development",
        "Advanced gaming mechanics",
        "Governance system launch",
        "Staking enhancements"
      ],
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

  const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'from-green-400 to-emerald-500';
      case 'in-progress':
        return 'from-yellow-400 to-orange-500';
      case 'planned':
        return 'from-blue-400 to-purple-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <FaCheck className="w-4 h-4" />;
      case 'in-progress':
        return <FaClock className="w-4 h-4" />;
      case 'planned':
        return <FaCalendarAlt className="w-4 h-4" />;
      default:
        return <FaClock className="w-4 h-4" />;
    }
  };

  for (let i = 0; i < cardInfo.length; i++) {
    const item = cardInfo[i];
    const IconComponent = item.icon;
    
    cards.push(
      <motion.div
        key={i}
        variants={fadeInUp}
        className="relative w-full max-w-4xl mb-8"
      >
        {/* Connection Line */}
        {i < cardInfo.length - 1 && (
          <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-1 h-16 bg-gradient-to-b from-gray-600 to-transparent z-10"></div>
        )}
        
        <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-600/50 rounded-2xl shadow-2xl shadow-black/20 overflow-hidden hover:border-yellow-400/50 transition-all duration-300 group">
          {/* Header Section */}
          <div className={`bg-gradient-to-r ${getStatusColor(item.status)} p-1`}>
            <div className="bg-gray-900/90 backdrop-blur-xl rounded-xl p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${getStatusColor(item.status)} rounded-full flex items-center justify-center text-black shadow-lg`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-mono text-gray-400">Phase {item.index}</span>
                      <div className={`flex items-center gap-2 px-3 py-1 bg-gradient-to-r ${getStatusColor(item.status)} rounded-full text-black text-sm font-semibold`}>
                        {getStatusIcon(item.status)}
                        <span className="capitalize">{item.status.replace('-', ' ')}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold font-gaming text-white group-hover:text-yellow-400 transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <FaCalendarAlt className="w-4 h-4" />
                    <span className="text-sm font-secondary">Timeline</span>
                  </div>
                  <span className="text-xl font-bold font-gaming text-white">{item.date}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="p-6">
            <h4 className="text-lg font-semibold font-gaming text-gray-300 mb-4">Key Milestones</h4>
            <div className="grid md:grid-cols-2 gap-3">
              {item.features.map((feature, featureIndex) => (
                <motion.div
                  key={featureIndex}
                  variants={scaleIn}
                  className="flex items-center gap-3 p-3 bg-gray-800/50 border border-gray-700/50 rounded-lg hover:bg-gray-700/50 hover:border-gray-600/50 transition-all duration-300"
                >
                  <div className={`w-2 h-2 bg-gradient-to-r ${getStatusColor(item.status)} rounded-full flex-shrink-0`}></div>
                  <span className="text-sm font-secondary text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      className="w-full flex justify-center flex-col items-center px-4 md:px-8"
      id="roadmap"
    >
      <div className="w-full max-w-6xl">
        {cards}
      </div>
    </motion.div>
  );
};

export default Roadmap;
