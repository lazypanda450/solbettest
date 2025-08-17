import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { GambaPlatformContext, GambaUi } from "gamba-react-ui-v2";
import { useContext, useState } from "react";
import { useGamba, useGambaProgram, useSendTransaction } from "gamba-react-v2";

import { Button } from "../ui/button";
import { FloatingLabelInput } from "../ui/input-floating";
import { Icon } from "@/components/ui/Icon";
import { Input } from "../ui/input";
import Link from "next/link";
import { Modal } from "@/components/ui/Modal";
import { UserButton } from "../ui/UserButton";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

export function ProvablyFairModal(props: { onClose: () => void }) {
  const gamba = useGamba();
  const platform = useContext(GambaPlatformContext);
  const program = useGambaProgram();
  const sendTransaction = useSendTransaction();
  const walletModal = useWalletModal();
  const wallet = useWallet();

  const initialize = async () => {
    sendTransaction(
      program.methods.playerInitialize().accounts({}).instruction(),
    );
  };

  const hmac256 = async (
    secretKey: string | undefined,
    message: string | undefined,
  ) => {
    const encoder = new TextEncoder();
    const messageUint8Array = encoder.encode(message);
    const keyUint8Array = encoder.encode(secretKey);
    const cryptoKey = await window.crypto.subtle.importKey(
      "raw",
      keyUint8Array,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );
    const signature = await window.crypto.subtle.sign(
      "HMAC",
      cryptoKey,
      messageUint8Array,
    );
    return Array.from(new Uint8Array(signature))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  return (
    <Modal onClose={() => props.onClose()}>
      <Card className="bg-background border-none shadow-none my-4">
        <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col">
          {!gamba.userCreated && (
            <>
              <p>
                Provably Fair allows you to verify that the result of each game
                was randomly generated. Since you are playing from this wallet
                for the first time, you can request the initial hashed seed
                ahead of time. After this, it will be done automatically for
                each play.
              </p>
              {wallet.connected ? (
                <Button
                  className="inline-flex items-center justify-center px-4 py-4 bg-gradient-to-r from-base to-teal-400 leading-none rounded hover:from-teal-400 hover:to-base transition-all duration-500 ease-in-out"
                  onClick={initialize}
                >
                  Get hashed seed
                </Button>
              ) : (
                <div className="mt-4 flex justify-center">
                  <UserButton />
                </div>
              )}
            </>
          )}
          {gamba.userCreated && (
            <>
              <p>
                A result is calculated by combining the{" "}
                <strong className="text-[#8efa5c]">rng_seed</strong> provided by
                Gamba, the{" "}
                <strong className="text-[#8efa5c]">client_seed</strong> provided
                by the players client, a{" "}
                <strong className="text-[#8efa5c]">nonce</strong>, which
                increments by 1 for each play and a{" "}
                <strong className="text-[#8efa5c]">bet</strong>.
              </p>
              <p>
                Provably Fair allows you to verify that the result of each game
                was randomly generated. The{" "}
                <strong className="text-[#8efa5c]">rng_seed</strong> will be
                done automatically for each play. Your{" "}
                <strong className="text-[#8efa5c]">client_seed</strong> will
                affect the result of the next game you play.
              </p>
              <div
                style={{
                  display: "grid",
                  gap: "10px",
                  width: "100%",
                  padding: "20px",
                }}
              >
                <div>Next RNG Seed (sha256)</div>
                <FloatingLabelInput
                  id="rngSeed"
                  label="Next RNG Seed"
                  value={gamba.nextRngSeedHashed || ""}
                  disabled
                />
                <div>Client Seed</div>
                <div className="relative w-full">
                  <FloatingLabelInput
                    className="w-full pr-10"
                    id="clientSeed"
                    label="Client Seed"
                    value={platform.clientSeed}
                    disabled={gamba.isPlaying}
                    maxLength={32}
                    onChange={(event) =>
                      platform.setClientSeed(event.target.value)
                    }
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute inset-y-0 right-0 p-2"
                    disabled={gamba.isPlaying}
                    onClick={() =>
                      platform.setClientSeed(String((Math.random() * 1e9) | 0))
                    }
                  >
                    <Icon.Shuffle />
                  </Button>
                </div>
              </div>
            </>
          )}
          <p className="text-xs">
            Visit{" "}
            <Link
              href="/provability"
              className="text-xs text-[#8efa5c] underline"
            >
              Provability
            </Link>{" "}
            to learn more.
          </p>
        </CardContent>
      </Card>
    </Modal>
  );
}
