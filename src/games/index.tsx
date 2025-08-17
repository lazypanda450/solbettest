// src/games/index.tsx

import { GameBundle } from "gamba-react-ui-v2";
import dynamic from "next/dynamic";

export const GAMES: GameBundle[] = [
  {
    id: "dice",
    meta: {
      background: "#ff6490",
      name: "Dice",
      image: "/games/logo.png",
      description: `Dice offers an exhilarating challenge where players must forecast the outcome of a roll with a unique twist. By selecting a number, participants aim to roll below it to clinch victory. The dynamic nature of the game allows for adjustments in choices, directly influencing potential payouts and skillfully balancing risk and reward, ensuring an immersive and stimulating gaming experience.`,
    },
    app: dynamic(() => import("./Dice")),
  },
  {
    id: "slots",
    meta: {
      background: "#5465ff",
      name: "Slots",
      image: "/games/logo.png",
      description: `Slots stands as the epitome of chance and anticipation, offering players a captivating journey through its reels. Engage in the timeless thrill of spinning symbols to align and unlock potential rewards, prominently displayed upfront. With its meticulously crafted interface, Slots delivers a fair and riveting casino experience, meticulously tailored for digital enthusiasts, promising moments of pure excitement and suspense.`,
    },
    app: dynamic(() => import("./Slots")),
  },
  {
    id: "flip",
    meta: {
      background: "#ffe694",
      name: "Flip",
      image: "/games/logo.png",
      description: `Flip presents a compelling blend of simplicity and high-stakes excitement, where players face the tantalizing gamble of choosing between Heads or Tails. Every flip of the coin serves as a decisive moment, offering the potential to double one's fortune or lose it all. This straightforward yet adrenaline-inducing game tests players' luck and strategic decision-making prowess, ensuring an electrifying and immersive gaming session.`,
    },
    app: dynamic(() => import("./Flip")),
  },
  {
    id: "hilo",
    meta: {
      background: "#ff4f4f",
      name: "HiLo",
      image: "/games/logo.png",
      description: `HiLo invites players into a world of foresight and chance, where every decision holds the power to unlock untold riches. Embark on a journey of prediction as you forecast whether the next card will ascend or descend in value. Master the art of consecutive correct guesses to amplify winnings, strategically deciding when to cash out for maximum rewards, making each session an exhilarating test of skill and intuition.`,
    },
    app: dynamic(() => import("./HiLo")),
  },
  {
    id: "mines",
    meta: {
      background: "#8376ff",
      name: "Mines",
      image: "/games/logo.png",
      description: `Mines emerges as a strategic masterpiece, where players navigate a perilous landscape in search of hidden treasures. Uncover squares with caution, as lurking mines threaten to abruptly end your quest. With each revelation, the stakes escalate, offering daring players a heart-pounding experience filled with suspense and calculated risk, ensuring an immersive and unforgettable gaming adventure.`,
    },
    app: dynamic(() => import("./Mines")),
  },
  {
    id: "roulette",
    meta: {
      background: "#1de87e",
      name: "Roulette",
      image: "/games/logo.png",
      description: `Roulette breathes new life into the timeless tradition of wheel-spinning, blending elegance with digital innovation. Place your bets and witness the mesmerizing spectacle of the wheel as it determines your fate. With its straightforward yet captivating gameplay and the allure of substantial wins, Roulette stands as a testament to the thrill of chance and fortune, promising endless excitement and anticipation.`,
    },
    app: dynamic(() => import("./Roulette")),
  },
  {
    id: "plinko",
    meta: {
      background: "#7272ff",
      name: "Plinko",
      image: "/games/logo.png",
      description: `⚠️ Under development. Results shown might be incorrect. ⚠️ Plinko transforms the act of dropping chips into an art form, where anticipation and strategy converge to create an endlessly entertaining spectacle. Witness the tension mount with each chip's descent down the pegged board, as they randomly find their place among slots boasting varying win amounts. Each drop offers a delicate balance between luck and skill, making Plinko a captivating odyssey of chance and strategy. `,
    },
    app: dynamic(() => import("./Plinko")),
  },
  {
    id: "limbo",
    meta: {
      background: "#ffa01e",
      name: "Limbo",
      image: "/games/logo.png",
      description: `Limbo challenges players to walk the fine line between ambition and caution, where every decision shapes their destiny. Set a target multiplier and place your bet, daring to defy the odds. As the stakes rise, so does the adrenaline, pushing players to test their strategy and intuition in pursuit of monumental victories, ensuring an immersive and adrenaline-fueled gaming experience.`,
    },
    app: dynamic(() => import("./Limbo")),
  },
  {
    id: "keno",
    meta: {
      background: "#8855fe",
      name: "Keno",
      image: "/games/logo.png",
      description: `Keno beckons players into a world of strategic decision-making and anticipation, where every choice holds the potential for untold riches. Select up to 10 blocks and place your bets, eagerly awaiting the draw that will determine your fate. Whether opting for fewer numbers and the allure of substantial wins or more numbers for increased odds of success, Keno promises a riveting experience filled with excitement and possibility.`,
    },
    app: dynamic(() => import("./Keno")),
  },
  {
    id: "crash",
    meta: {
      background: "#ff4444",
      name: "Crash",
      image: "/games/logo.png",
      description: `Crash takes you on an adrenaline-fueled journey where timing is everything. Watch the rocket soar as the multiplier climbs higher and higher, but beware - it can crash at any moment! Place your bet during the 60-second betting phase, then decide when to cash out before the inevitable crash. The longer you wait, the higher the potential payout, but risk it all and you might lose everything. Master the art of perfect timing in this heart-pounding game of nerves and strategy.`,
    },
    app: dynamic(() => import("./Crash")),
  },
];
