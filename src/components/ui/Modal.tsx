import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";

import { MdOutlineClose } from "react-icons/md";

interface Props extends React.PropsWithChildren {
  onClose?: () => void;
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  className?: string;
}

export function Modal({
  children,
  onClose,
  showCloseButton = true,
  closeOnBackdropClick = true,
  className = "",
}: Props) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (event.target === event.currentTarget && closeOnBackdropClick) {
      onClose?.();
    }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      y: -100,
      scale: 0.8,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <AnimatePresence>
      <motion.div
        onClick={handleBackdropClick}
        className={`fixed inset-0 bg-black bg-opacity-70 z-[999] h-[120svh] md:h-screen flex items-center justify-center p-2 overflow-y-hidden${className}`}
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <motion.div
          onClick={(e: { stopPropagation: () => any }) => e.stopPropagation()}
          className="flex items-center justify-center"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <div
            tabIndex={-1}
            className="bg-background border border-base outline-primary shadow-2xl relative flex flex-col items-center w-full max-w-md mx-auto rounded-lg z-100 py-5 pb-5 text-white overflow-y-auto max-h-[90vh]"
          >
            {showCloseButton && onClose && (
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-white z-50 absolute top-2 right-2 bg-transparent rounded-full p-2 bg-white bg-opacity-10 transition-all duration-300"
              >
                <MdOutlineClose />
              </button>
            )}
            <div className="flex flex-col items-center justify-center w-full space-y-4 p-5 text-center overflow-y-auto">
              {children}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
