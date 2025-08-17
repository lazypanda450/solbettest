import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TotalBets = () => {
  const [totalBets, setTotalBets] = useState(1247892);

  // Simulate real-time bet count updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalBets(prev => prev + Math.floor(Math.random() * 5) + 1);
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-2 right-2 md:top-4 md:right-4 z-50"
    >
      <motion.div
        key={totalBets}
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-white font-mono text-sm md:text-base font-semibold"
      >
        Total Bets: {totalBets.toLocaleString()}
      </motion.div>
    </motion.div>
  );
};

export default TotalBets;