import "@/styles/globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  PLATFORM_CREATOR_ADDRESS,
  PLATFORM_CREATOR_FEE,
  PLATFORM_JACKPOT_FEE,
} from "../../config";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import React, { useMemo } from "react";

import { AppProps } from "next/app";
import DisclaimerModal from "@/components/shared/DisclaimerModal";
import { GAMES } from "../games";
import { GambaPlatformProvider } from "gamba-react-ui-v2";
import { GambaProvider } from "gamba-react-v2";
import Header from "@/components/Navbar";
import SideNav from "@/components/SideNav";
import ChatPanel from "@/components/Chat/ChatPanel";
import TotalBets from "@/components/TotalBets";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "sonner";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { useDisclaimer } from "@/hooks/useDisclaimer";
import useLoadingScreen from "@/hooks/useLoadingScreen";

function MyApp({ Component, pageProps }: AppProps) {
  const {
    showDisclaimer,
    handleDisclaimerClose,
    isCheckboxChecked,
    handleCheckboxChange,
  } = useDisclaimer();
  const { LoadingUI } = useLoadingScreen();

  const RPC_ENDPOINT =
    process.env.NEXT_PUBLIC_RPC_ENDPOINT ??
    "https://api.mainnet-beta.solana.com";

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    [],
  );

  return (
    <ConnectionProvider
      endpoint={RPC_ENDPOINT}
      config={{ commitment: "processed" }}
    >
      <WalletProvider autoConnect wallets={wallets}>
        <WalletModalProvider>
          <GambaProvider>
            <GambaPlatformProvider
              creator={PLATFORM_CREATOR_ADDRESS}
              games={GAMES}
              defaultCreatorFee={PLATFORM_CREATOR_FEE}
              defaultJackpotFee={PLATFORM_JACKPOT_FEE}
            >
              <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                disableTransitionOnChange
              >
                <TotalBets />
                <Header />
                <div className="flex relative">
                  <SideNav />
                  <div className="main-content flex-1">
                    <Component {...pageProps} />
                  </div>
                  <ChatPanel />
                </div>
                <Toaster
                  position="bottom-right"
                  richColors
                  theme="dark"
                  toastOptions={{
                    className: "border border-base bg-background text-primary",
                  }}
                />
                <LoadingUI />
                {showDisclaimer && (
                  <DisclaimerModal
                    show={showDisclaimer}
                    onClose={handleDisclaimerClose}
                    isCheckboxChecked={isCheckboxChecked}
                    onCheckboxChange={handleCheckboxChange}
                  />
                )}
              </ThemeProvider>
            </GambaPlatformProvider>
          </GambaProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default MyApp;
