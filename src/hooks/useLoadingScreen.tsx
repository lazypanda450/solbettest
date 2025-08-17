import { useEffect, useState } from "react";

import { motion } from "framer-motion";

export const useLoadingScreen = () => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    initial: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 1 } },
  };

  const logoVariants = {
    initial: { x: "-100vw" },
    animate: {
      x: 0,
      transition: { type: "spring", stiffness: 120, damping: 20 },
    },
  };

  const LoadingUI = () => {
    if (!showLoading) return null;

    return (
      <motion.div
        className="z-[9999] fixed inset-0 bg-background flex items-center justify-center"
        variants={containerVariants}
        initial="initial"
        animate="initial"
        exit="exit"
      >
        <motion.img
          src="/logo.png"
          alt="Loading..."
          className="w-64 h-32"
          variants={logoVariants}
          initial="initial"
          animate="animate"
        />
      </motion.div>
    );
  };

  return { showLoading, setShowLoading, LoadingUI };
};

export default useLoadingScreen;
