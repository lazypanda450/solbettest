import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// change images here to swap image in carousel
const images = ["/ads/1.jpg", "/ads/2.jpg", "/ads/3.jpg"];

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === images.length - 1 ? 0 : prevSlide + 1,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? images.length - 1 : prevSlide - 1,
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === images.length - 1 ? 0 : prevSlide + 1,
    );
  };

  return (
    <div className="relative w-full group">
      {/* Premium Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-purple-600/20 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
      
      <div className="relative h-64 md:h-96 lg:h-[500px] overflow-hidden rounded-2xl border border-gray-700 shadow-2xl bg-gray-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={images[currentSlide]}
              className="w-full h-full object-cover object-center"
              alt={`Slide ${currentSlide + 1}`}
            />
            {/* Overlay gradient for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          </motion.div>
        </AnimatePresence>

        {/* Enhanced Navigation Dots */}
        <div className="absolute z-30 flex -translate-x-1/2 bottom-6 left-1/2 space-x-3">
          {images.map((_, index) => (
            <motion.button
              key={index}
              type="button"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? "bg-yellow-400 ring-2 ring-yellow-400/50 ring-offset-2 ring-offset-black/20" 
                  : "bg-gray-400 hover:bg-gray-300"
              }`}
              onClick={() => goToSlide(index)}
            >
              {index === currentSlide && (
                <motion.div
                  layoutId="activeSlide"
                  className="absolute inset-0 bg-yellow-400 rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Premium Navigation Buttons */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-1/2 left-4 -translate-y-1/2 z-30 w-12 h-12 bg-black/50 backdrop-blur-sm border border-gray-600 rounded-full flex items-center justify-center hover:bg-black/70 hover:border-yellow-400 transition-all duration-300 group"
          onClick={goToPrevSlide}
        >
          <ArrowLeftIcon className="w-6 h-6 text-white group-hover:text-yellow-400 transition-colors duration-200" />
        </motion.button>
        
        <motion.button
          type="button"
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-1/2 right-4 -translate-y-1/2 z-30 w-12 h-12 bg-black/50 backdrop-blur-sm border border-gray-600 rounded-full flex items-center justify-center hover:bg-black/70 hover:border-yellow-400 transition-all duration-300 group"
          onClick={goToNextSlide}
        >
          <ArrowRightIcon className="w-6 h-6 text-white group-hover:text-yellow-400 transition-colors duration-200" />
        </motion.button>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
          <motion.div
            key={currentSlide}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear" }}
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
          />
        </div>
      </div>
    </div>
  );
}
