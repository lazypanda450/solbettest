// src/components/sections/RecentPlays/ShareModal.tsx

import { GambaUi, TokenValue, useTokenMeta } from "gamba-react-ui-v2";
import React, { useRef, useState } from "react";

import { Button } from "../ui/button";
import { GambaTransaction } from "gamba-core-v2";
import { Modal } from "@/components/ui/Modal";
import { PLATFORM_SHARABLE_URL } from "../../../config";
import { extractMetadata } from "@/utils/utils";
import html2canvas from "html2canvas";
import { toast } from "sonner";
import { useRouter } from "next/router";

const canvasToClipboard = async (canvas: HTMLCanvasElement) => {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        return reject(new Error("Canvas to Blob conversion failed"));
      }
      navigator.clipboard
        .write([new ClipboardItem({ "image/png": blob })])
        .then(resolve)
        .catch(reject);
    });
  });
};

export function ShareModal({
  event,
  onClose,
}: {
  event: GambaTransaction<"GameSettled">;
  onClose: () => void;
}) {
  const router = useRouter();
  const tokenMeta = useTokenMeta(event.data.tokenMint);
  const ref = useRef<HTMLDivElement>(null);
  const profit = event.data.payout.sub(event.data.wager).toNumber();
  const percentChange = profit / event.data.wager.toNumber();
  const [copying, setCopying] = useState(false);
  const { game } = extractMetadata(event);

  const gotoGame = () => {
    router.push(`/play/${game?.id}`);
    onClose();
  };

  const copyImage = async () => {
    if (ref.current) {
      setCopying(true);
      try {
        const canvas = await html2canvas(ref.current, {
          removeContainer: true,
          backgroundColor: "#000",
        });
        await canvasToClipboard(canvas);
        toast.success(
          "📋 Copied image to clipboard. You can paste it in Twitter or Telegram etc.",
        );
      } catch (error) {
        console.error("Error copying the image: ", error);
      } finally {
        setCopying(false);
      }
    }
  };

  if (!game) {
    return null;
  }

  const imagePath = `/games/${game.id}/logo.png`;

  return (
    <Modal onClose={() => onClose()}>
      <div className="grid gap-2.5 pb-0 w-full mt-4">
        <div
          className={`bg-blue-500 rounded-lg overflow-hidden shadow-lg transform transition duration-500 ${
            copying ? "border-4 border-dashed border-blue-500" : ""
          }`}
        >
          <div
            ref={ref}
            className="bg-gradient-to-r from-base to-teal-400 font-medium text-lg leading-none rounded-lg overflow-hidden shadow-lg transform transition duration-500"
          >
            <div className="p-5 bg-black bg-opacity-40">
              <div className="grid grid-cols-2 items-center gap-4">
                <div className="col-span-1">
                  <img
                    src={imagePath}
                    alt="Game Image"
                    className="h-full w-full"
                  />
                </div>

                <div className="flex justify-between items-center gap-4">
                  <div className="flex flex-col">
                    <div
                      className={`flex items-center gap-2 text-2xl font-bold ${
                        percentChange >= 0 ? "text-green-500" : "text-red-500"
                      } transition-colors duration-300`}
                    >
                      {profit >= 0 ? "+" : "-"}
                      <TokenValue
                        exact
                        amount={Math.abs(profit)}
                        mint={event.data.tokenMint}
                      />
                      <img
                        src={tokenMeta.image}
                        alt="Token Image"
                        className="rounded-full border-2 border-gray-700 shadow-sm h-6 w-6"
                      />
                    </div>
                    <div
                      className={`text-base font-medium ${
                        percentChange >= 0 ? "text-green-400" : "text-red-400"
                      } transition-colors duration-300`}
                    >
                      {profit >= 0 ? "+" : "-"}
                      {(Math.abs(percentChange) * 100).toFixed(2)}%
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 whitespace-nowrap items-center bg-black bg-opacity-20 backdrop-filter backdrop-blur-md rounded-lg p-3 flex md:gap-2">
                <img src="/gamba.svg" alt="Platform Icon" className="h-8 w-8" />
                <span className="text-white text-md md:text-lg">
                  play on {PLATFORM_SHARABLE_URL}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            className="inline-flex items-center justify-center px-4 py-4 bg-gradient-to-r from-base to-teal-400 leading-none rounded hover:from-teal-400 hover:to-base transition-all duration-500 ease-in-out"
            onClick={() =>
              window.open(
                `https://explorer.gamba.so/tx/${event.signature}`,
                "_blank",
              )
            }
          >
            Verify
          </Button>
          <Button
            className="inline-flex items-center justify-center px-4 py-4 bg-gradient-to-r from-base to-teal-400 leading-none rounded hover:from-teal-400 hover:to-base transition-all duration-500 ease-in-out"
            onClick={gotoGame}
          >
            Play {game?.meta?.name}
          </Button>
          <Button
            className="inline-flex items-center justify-center px-4 py-4 bg-gradient-to-r from-base to-teal-400 leading-none rounded hover:from-teal-400 hover:to-base transition-all duration-500 ease-in-out"
            disabled={copying}
            onClick={copyImage}
          >
            Copy Image
          </Button>
        </div>
      </div>
    </Modal>
  );
}
