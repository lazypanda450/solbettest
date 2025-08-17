// src/pages/play/[gameId].tsx
import CustomRenderer, { CustomError } from "@/components/game/CustomRender";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { GAMES } from "@/games";
import { GambaUi } from "gamba-react-ui-v2";
import GameRecent from "@/components/game/GameRecent";
import GameSlide from "@/components/game/carousels/GamesCarousel";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const Game: React.FC<{ gameId: string; isLoading: boolean }> = ({
  gameId,
  isLoading,
}) => {
  const game = GAMES.find((x) => x.id === gameId);

  return (
    <>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            scale: { duration: 12, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.2, 1]
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-l from-yellow-500/5 to-orange-500/5 rounded-full blur-3xl"
        />
      </div>

      {isLoading ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative flex-grow transition-height duration-200 p-4 justify-center items-center mx-auto max-w-7xl pt-20 z-10"
        >
          <div className="w-full relative grid gap-0">
            <div className="flex justify-center items-center bg-gray-900/80 backdrop-blur-xl border border-gray-600/50 shadow-2xl shadow-black/20 relative flex-grow rounded-t-2xl overflow-hidden transition-height duration-200 md:min-h-[550px] min-h-[400px] max-w-7xl">
              <div className="animate-spin w-8 h-8 border-4 border-yellow-400/30 border-t-yellow-400 rounded-full"></div>
            </div>

            <div className="border border-gray-600/50 border-t-0 w-full bg-gray-900/80 backdrop-blur-xl text-white rounded-b-2xl flex flex-col shadow-2xl shadow-black/20">
              <div className="h-[5.8rem] w-full flex justify-center items-center">
                <div className="w-24 h-6 bg-gray-700/50 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : game ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative flex-grow transition-height duration-200 p-4 justify-center items-center mx-auto max-w-7xl pt-20 z-10"
        >
          <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-600/50 rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
            <GambaUi.Game game={game} errorFallback={<CustomError />}>
              <CustomRenderer />
            </GambaUi.Game>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative flex-grow transition-height duration-200 p-4 justify-center items-center mx-auto max-w-7xl pt-20 z-10"
        >
          <div className="w-full relative grid gap-0">
            <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-600/50 shadow-2xl shadow-black/20 animate-pulse flex justify-center items-center relative flex-grow rounded-2xl overflow-hidden transition-height md:min-h-[500px] min-h-[400px] max-w-7xl">
              <video
                src="/gamba.mp4"
                className="w-full h-full object-cover rounded-2xl"
                autoPlay
                muted
                playsInline
                loop
                preload="auto"
              />
            </div>
          </div>
        </motion.div>
      )}
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex justify-center items-center relative z-10"
      >
        <div className="space-y-6 relative flex-grow p-4 justify-center items-center max-w-7xl">
          <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-600/50 rounded-2xl p-6 shadow-2xl shadow-black/20">
            <GameSlide />
          </div>
          <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-600/50 rounded-2xl p-6 shadow-2xl shadow-black/20">
            <GameRecent gameId={gameId} />
          </div>
        </div>
      </motion.div>
    </>
  );
};

const GamePage: React.FC = () => {
  const router = useRouter();
  const { gameId } = router.query;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleRouteChangeStart = () => setIsLoading(true);
    const handleRouteChangeComplete = () => setIsLoading(false);

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    if (gameId) setIsLoading(false);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [gameId, router.events]);

  return (
    <div className="md:ml-6 mb-16 md:mb-0 md:mt-4 overflow-x-hidden relative">
      <Game gameId={gameId as string} isLoading={isLoading} />
    </div>
  );
};

export default dynamic(() => Promise.resolve(GamePage), { ssr: false });
