// src/components/sections/Dashboard/GameCard.tsx

import { GameBundle } from "gamba-react-ui-v2";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

interface GameCardProps {
  game: GameBundle;
  key?: string | number;
  featured?: boolean;
  size?: string;
}

export function GameCard({ game, featured = false, size }: GameCardProps) {
  const router = useRouter();
  const imagePath = `/games/${game.id}/logo.png`;
  
  const backgroundStyle = {
    backgroundColor: game.meta.background,
  };

  // Different styles based on card size
  const isFeatured = featured || size?.includes("col-span-2 row-span-2");
  const isWide = size?.includes("col-span-2 row-span-1");
  const isTall = size?.includes("col-span-1 row-span-2");

  return (
    <Link href={`/play/${game.id}`} passHref>
      <div
        className={`
          cursor-pointer game-card w-full h-full bg-cover bg-center rounded-xl text-white font-bold relative overflow-hidden
          ${isFeatured ? 'shadow-2xl ring-2 ring-yellow-400/30' : 'shadow-lg'}
          ${isFeatured ? 'bg-gradient-to-br from-yellow-500/10 to-purple-600/20' : ''}
        `}
        style={backgroundStyle}
      >
        {/* Background Pattern */}
        <div
          className="background absolute top-0 left-0 w-full h-full bg-size-100 bg-center bg-repeat opacity-30"
          style={{ backgroundImage: "url(/stuff.png)" }}
        ></div>
        
        {/* Game Logo/Image */}
        <div
          className={`
            image absolute top-0 left-0 w-full h-full bg-no-repeat bg-center 
            ${isFeatured ? 'bg-contain scale-90' : 'bg-contain scale-75'}
          `}
          style={{ backgroundImage: `url(${imagePath})` }}
        ></div>
        
        {/* Featured Badge */}
        {isFeatured && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold font-gaming">
            FEATURED
          </div>
        )}
        
        {/* Game Title and Play Button */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-3">
          <div className={`
            ${isFeatured ? 'text-xl md:text-2xl' : isWide ? 'text-lg' : 'text-base'}
            font-gaming font-bold mb-2 truncate
          `}>
            {game.meta.name}
          </div>
          
          <div className={`
            play bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-center font-secondary font-semibold
            ${isFeatured ? 'text-base' : 'text-sm'}
            hover:bg-white/30 transition-colors duration-200
          `}>
            {isFeatured ? `Play ${game.meta.name}` : 'Play Now'}
          </div>
        </div>
        
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </Link>
  );
}
