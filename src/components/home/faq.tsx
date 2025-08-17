// AdvancedFAQ.js

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import React from "react";

const faqs = [
  {
    question: "🎲 How do Games work?",
    answer:
      "Games are initiated by the player, with an on-chain Program validating each game for fairness. A random number determines the winner. The structure includes a pool, wager, and bet list of potential outcomes, ensuring fairness and randomness in gameplay.",
  },
  {
    question: "💰 How does the platform ensure profitability?",
    answer:
      "The platform earns through platform fees of approximately 5% on plays. Despite not having a traditional house edge, profitability is maintained by volume, liquidity, and the collection of fees, ensuring a sustainable model for platform and pool contributors.",
  },
  {
    question: "🔐 How is security ensured on the platform?",
    answer:
      "Security on the platform is ensured through multiple layers, including blockchain's inherent security features, smart contract audits, and secure, decentralized storage for sensitive data. Transactions are transparent and tamper-proof, reducing the risk of fraud and ensuring player trust.",
  },
  {
    question: "🤔 What makes your platform unique?",
    answer:
      "Our platform stands out due to its integration of blockchain technology for fairness, security, and transparency. Unlike traditional gaming platforms, ours operates on a decentralized network, offering players verifiable fairness, ownership of assets, and direct earnings distribution, which revolutionizes the gaming experience.",
  },
  {
    question: "📊 How are winnings calculated?",
    answer:
      "Winnings are calculated based on the game's odds and the player's wager. Each game has a predefined set of outcomes with associated multipliers. When a game concludes, the selected outcome's multiplier is applied to the wager, determining the player's payout.",
  },
  {
    question: "🎟️ How do I participate in games?",
    answer:
      "Participation is straightforward: connect your wallet and select a game to play. Each game has clear instructions and betting options. Simply place your bet and initiate the game to start. Winnings are credited directly to your account.",
  },
];

const AdvancedFAQ = () => {
  return (
    <div className="w-full mx-auto p-4">
      <h2 className="text-3xl font-bold flex justify-center items-center">
        F.A.Q
      </h2>
      <Accordion type="single" collapsible>
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-lg font-semibold">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-gray-400">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default AdvancedFAQ;
