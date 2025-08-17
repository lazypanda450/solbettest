import {
  GambaPlatformContext,
  GambaUi,
  useGambaAudioStore,
  useSound,
} from "gamba-react-ui-v2";
import React, { useContext } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { BankkMaticGames } from "@/hooks/useBankkMatic";
import { Modal } from "@/components/ui/Modal";
import { PublicKey } from "@solana/web3.js";
import { TOKENS } from "../../../config";
import { useRouter } from "next/router";

export function GameSettingsModal(props: { onClose: () => void }) {
  const { game } = GambaUi.useGame();
  const audioStore = useGambaAudioStore();
  const imagePath = `/games/${game.id}/logo.png`;
  const tokensArray = Object.values(TOKENS);
  const context = useContext(GambaPlatformContext);
  const sounds = useSound({
    tick: "/assets/tick.mp3",
  });

  const setToken = (token: PublicKey) => {
    context.setToken(token);
  };

  const router = useRouter();
  const currentPath = router.asPath;
  const shouldRenderBankkmaticGames = BankkMaticGames.some((path) =>
    currentPath.includes(path),
  );

  return (
    <Modal onClose={() => props.onClose()}>
      <img
        className="w-64 justify-center items-center"
        src={imagePath}
        alt={`Splash for ${game.meta.name}`}
      />
      <p className="mb-4">{game.meta.description}</p>
    </Modal>
  );
}
