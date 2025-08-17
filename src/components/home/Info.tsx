import React from "react";

export default function Info() {
  return (
    <section className="w-full py-12 md:py-24 bg-white dark:bg-gray-900">
      <div className="mx-auto px-4">
        <div className="grid gap-10 md:gap-16 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm border border-base dark:bg-gray-800">
              Blockchain Technology
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] lg:leading-tighter">
              Instant Play. Secure Wins.
            </h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              Experience the thrill of online gambling with the speed and
              security of the Solana blockchain. Enjoy instant transactions and
              provably fair games.
            </p>
            <p className="text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              Engage in games designed on fairness and transparency. Each game
              leverages Solana&apos;s blockchain for verifiable fairness, with
              outcomes determined by secure RNG technology.
            </p>
          </div>
          <div className="flex flex-col items-start space-y-4">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm border border-base dark:bg-gray-800">
              Innovation & Fairness
            </div>
            <ul className="list-disc space-y-2 pl-5 text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              <li>
                Games ensure player fairness with an array of potential outcomes
                for equal odds.
              </li>
              <li>
                Outcomes are determined by a combination of RNG seed, provided
                by the platform, and client seed, adjustable by players.
              </li>
              <li>
                Before each game, players receive an encrypted hash of the RNG
                seed, allowing verification that game outcomes are not
                manipulated.
              </li>
            </ul>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Our platform pioneers the future of online casinos, leveraging
              Solana to offer a gaming experience that’s fast, transparent, and
              unstoppable. Discover a new era of fair gaming.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
