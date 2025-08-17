// src/components/game/CustomRender.tsx

import React, { useEffect, useState } from "react";

import { GambaUi } from "gamba-react-ui-v2";
import { GameSettingsModal } from "./GameSettingsModal";
import { Icon } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal";
import { ProvablyFairModal } from "@/components/shared/ProvablyFairModal";
import { useGamba } from "gamba-react-v2";
import { useUserStore } from "@/hooks/useUserStore";

export function CustomError() {
  return (
    <>
      <GambaUi.Portal target="error">
        <GambaUi.Responsive>
          <h1>😭 Oh no!</h1>
          <p>Something went wrong</p>
          <GambaUi.Button
            onClick={() => {
              window.location.reload();
            }}
          >
            Reload
          </GambaUi.Button>
        </GambaUi.Responsive>
      </GambaUi.Portal>
    </>
  );
}

/**
 * A renderer component to display the contents of the loaded GambaUi.Game
 * Screen
 * Controls
 */
export default function CustomRenderer() {
  const gamba = useGamba();
  const { game } = GambaUi.useGame();
  const [info, setInfo] = useState(false);
  const [settings, setSettings] = useState(false);
  const [provablyFair, setProvablyFair] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const imagePath = `/games/${game.id}/logo.png`;
  const { newcomer, gamesPlayed, set } = useUserStore();

  useEffect(() => {
    if (newcomer || !gamesPlayed.includes(game.id)) {
      setInfo(true);

      set((state) => ({
        newcomer: false,
        gamesPlayed: [...state.gamesPlayed, game.id],
      }));
    }
  }, [game.id, gamesPlayed, newcomer, set]);

  return (
    <>
      {info && (
        <Modal key={game.id + "info"} onClose={() => setInfo(false)}>
          <img
            height="150px"
            src={imagePath}
            alt={`Splash for ${game.meta.name}`}
          />
          <p>{game.meta.description}</p>
        </Modal>
      )}
      {settings && <GameSettingsModal onClose={() => setSettings(false)} />}
      {provablyFair && (
        <ProvablyFairModal onClose={() => setProvablyFair(false)} />
      )}
      <div className="w-full relative grid gap-0">
        {showSplash && (
          <div className="pointer-events-none rounded-lg absolute inset-0 flex justify-center items-center z-10 bg-[#0c0c11] text-6xl font-bold animate-[splashAnimation_1s_ease-out_forwards]">
            <img
              height="150px"
              src={imagePath}
              alt={`Splash for ${game.meta.name}`}
            />
          </div>
        )}
        <div className="border border-base relative flex-grow bg-accent rounded-t-lg overflow-hidden transition-height duration-200 md:min-h-[550px] min-h-[400px]">
          <GambaUi.PortalTarget target="error" />
          <GambaUi.PortalTarget target="screen" />
        </div>

        <div className="border border-base w-full bg-accent text-white rounded-b-lg flex flex-col">
          <div className="relative flex-grow rounded-lg overflow-hidden">
            <div
              className={`relative h-2 overflow-hidden rounded-lg after:content-[' '] after:absolute after:w-[25%] after:h-full after:bg-[#9564ff] after:transition-opacity duration-500 ${
                gamba.isPlaying
                  ? " animate-[loadingAnimation_1.5s_infinite] after:opacity-100"
                  : "after:opacity-0"
              }`}
              key={Number(gamba.isPlaying)}
              data-active={gamba.isPlaying}
            />
          </div>
          <div className="flex flex-wrap p-2 sm:p-5 gap-2">
            <div className="flex gap-2 justify-center">
              <button
                className="p-2 text-primary bg-transparent hover:bg-background transition-all duration-300 rounded-lg cursor-pointer focus:outline-none"
                onClick={() => setSettings(true)}
              >
                <Icon.Info />
              </button>
              <button
                className="p-2 text-primary bg-transparent hover:bg-background transition-all duration-300 rounded-lg cursor-pointer focus:outline-none"
                onClick={() => setProvablyFair(true)}
              >
                <Icon.Fairness />
              </button>
            </div>
            <div className="flex-grow flex items-center justify-start gap-2">
              <GambaUi.PortalTarget target="controls" />
              <GambaUi.PortalTarget target="play" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
