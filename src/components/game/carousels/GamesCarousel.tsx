import React, { useState } from "react";
import { GAMES } from "../../../games";
import { GameCard } from "../GameCard";

type GameProvider = "all" | "bankkmatic" | "gambaOriginals";

interface GameSlideProps {
  gameProvider?: GameProvider;
  title?: string;
}

// Define different card sizes for asymmetric layout
const getCardSize = (index: number) => {
  const patterns = [
    // Mobile: smaller spans, Desktop: full spans
    "col-span-2 row-span-2 md:col-span-3 md:row-span-2", // Large featured card
    "col-span-1 row-span-1 md:col-span-2 md:row-span-1", // Small/Medium card
    "col-span-1 row-span-2 md:col-span-2 md:row-span-2", // Tall card
    "col-span-2 row-span-1 md:col-span-3 md:row-span-1", // Wide card
    "col-span-1 row-span-1", // Small card
    "col-span-1 row-span-1", // Small card
  ];
  return patterns[index % patterns.length];
};

const GameSlide: React.FC<GameSlideProps> = ({ title = "Featured Games" }) => {
  const [filteredGames] = useState(GAMES);

  return (
    <div className="relative w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold font-gaming">{title}</h2>
      </div>
      
      {/* Asymmetric Grid Layout */}
      <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 auto-rows-[180px] md:auto-rows-[200px] gap-3 md:gap-4 overflow-hidden">
        {filteredGames.slice(0, 12).map((game, index) => (
          <div
            key={`${game.id}_${index}`}
            className={`${getCardSize(index)} min-h-[180px] md:min-h-[200px] transition-all duration-300 hover:scale-[1.02] hover:z-10 relative`}
          >
            <GameCard 
              game={game} 
              featured={index === 0} // First card is featured
              size={getCardSize(index)}
            />
          </div>
        ))}
      </div>
      
      {/* Show more button for remaining games */}
      {filteredGames.length > 12 && (
        <div className="flex justify-center mt-8">
          <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-secondary font-semibold transition-colors duration-200">
            View All Games ({filteredGames.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default GameSlide;
