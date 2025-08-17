// src/games/ExampleGame/ExampleGame.tsx
import { GambaUi, useWagerInput } from "gamba-react-ui-v2";

import React from "react";
import useCustomPlay from "@/hooks/useBankkMatic";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

export default function ExampleGame() {
  const [wager, setWager] = useWagerInput();
  const gambaBPlay = useCustomPlay("exampleGame");
  const game = GambaUi.useGame();
  const walletModal = useWalletModal();
  const wallet = useWallet();

  const play = async () => {
    const tx = await gambaBPlay({
      wager: wager,
      bet: [2, 0],
    });

    console.log("Sent", tx);
    const result = await game.result();
    console.log(result);
  };

  const connect = () => {
    if (wallet.wallet) {
      wallet.connect();
    } else {
      walletModal.setVisible(true);
    }
  };

  return (
    <>
      <GambaUi.Portal target="screen"></GambaUi.Portal>
      <GambaUi.Portal target="controls">
        <GambaUi.WagerInput value={wager} onChange={setWager} />
        {wallet.connected ? (
          <GambaUi.PlayButton onClick={play}>
            Double or Nothing
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
