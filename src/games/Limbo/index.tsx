// src/games/Limbo/index.tsx
/*
 * Author: BankkRoll
 */
import {
  GambaUi,
  TokenValue,
  useCurrentPool,
  useCurrentToken,
  useSound,
  useWagerInput,
} from "gamba-react-ui-v2";
import React, { useState } from "react";

import Slider from "./Slider";
import useCustomPlay from "@/hooks/useBankkMatic";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

export default function Limbo() {
  const game = GambaUi.useGame();
  const gambaBPlay = useCustomPlay("limbo");
  const token = useCurrentToken();
  const [wager, setWager] = useWagerInput();
  const [targetMultiplier, setTargetMultiplier] = useState<number>(20);
  const [resultMultiplier, setResultMultiplier] = useState<number>(1);
  const [playing, setPlaying] = useState<boolean>(false);
  const [isWin, setIsWin] = useState<boolean | null>(null);
  const [textColor, setTextColor] = useState<string>("#FFFFFF");
  const walletModal = useWalletModal();
  const wallet = useWallet();
  const sounds = useSound({
    spin: "/games/limbo/numbers.mp3",
    win: "/games/limbo/win.mp3",
    lose: "/games/limbo/lose.mp3",
    tick: "/games/limbo/tick.mp3",
  });

  const pool = useCurrentPool();

  const connect = () => {
    if (wallet.wallet) {
      wallet.connect();
    } else {
      walletModal.setVisible(true);
    }
  };

  const handleMultiplierChange = (value: string | number) => {
    if (typeof value === "string") {
      setTargetMultiplier(Math.max(2, Math.min(100, parseFloat(value))));
    } else {
      setTargetMultiplier(Math.max(2, Math.min(100, value)));
    }
    sounds.play("tick");
  };

  const handleMultiplierInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    handleMultiplierChange(event.target.value);
    sounds.play("tick");
  };

  const play = async () => {
    try {
      setPlaying(true);
      setResultMultiplier(1);
      setTextColor("#FFFFFF");

      await gambaBPlay({
        wager: wager,
        bet: new Array(targetMultiplier)
          .fill(0)
          .map((_, index) => (index === 0 ? targetMultiplier : 0)),
      });

      const result = await game.result();

      const winCondition = result.multiplier >= targetMultiplier;
      setIsWin(winCondition);
      sounds.play("spin", { playbackRate: 0.8 });
      const endMultiplier = winCondition
        ? targetMultiplier + Math.random() * targetMultiplier * 0.2
        : 1 + Math.random() * (targetMultiplier - 1);

      setPlaying(false);
    } catch (error) {
      console.log(error);
      setPlaying(false);
    }
  };

  const maxWin = wager * resultMultiplier;

  const winChance = (1 / targetMultiplier) * 100;
  const payout = wager * targetMultiplier;

  return (
    <>
      <GambaUi.Portal target="screen">
        <GambaUi.Responsive>
          <div className="flex flex-col justify-center items-center h-full transition-all duration-500 ease-in-out">
            <div className="text-8xl font-bold" style={{ color: textColor }}>
              {resultMultiplier.toFixed(2)}x
            </div>
            <div>
              <div className="min-w-[50vw] mt-10 grid grid-cols-3 gap-4 justify-items-center">
                <div className="p-4 text-center">
                  <div>{winChance.toFixed(2)}%</div>
                  <div className="text-sm">Win Chance</div>
                </div>
                <div className="p-4 text-center">
                  <div>
                    {" "}
                    <input
                      type="number"
                      value={targetMultiplier.toString()}
                      onChange={handleMultiplierInputChange}
                      className="text-center max-w-14 bg-transparent text-xl font-bold outline-none"
                      style={{ width: "100px" }}
                    />
                    x
                  </div>
                  <div className="text-sm">Multiplier</div>
                </div>
                <div className="p-4 text-center">
                  {maxWin > pool.maxPayout ? (
                    <div className="text-red-500">Too high</div>
                  ) : (
                    <div className="flex flex-row justify-center items-center gap-2">
                      <TokenValue suffix="" amount={payout} />
                      <p>{token.symbol}</p>
                    </div>
                  )}
                  <div className="text-sm">Possible Payout</div>
                </div>
              </div>
              <div style={{ position: "relative" }}>
                <Slider
                  min={2}
                  max={100}
                  value={targetMultiplier}
                  onChange={handleMultiplierChange}
                  range={[2, 100]}
                />
              </div>
            </div>
          </div>
        </GambaUi.Responsive>
      </GambaUi.Portal>

      <GambaUi.Portal target="controls">
        <GambaUi.WagerInput value={wager} onChange={setWager} />
        {wallet.connected ? (
          <GambaUi.PlayButton onClick={play} disabled={playing}>
            {playing ? "Playing..." : "Play"}
          </GambaUi.PlayButton>
        ) : (
          <GambaUi.Button main onClick={connect}>
            Play
          </GambaUi.Button>
        )}
      </GambaUi.Portal>
    </>
  );
}
