// src/components/layout/SideNav.tsx

import {
  FaBars,
  FaTimes,
  FaUser,
  FaLock,
  FaInfoCircle,
  FaHome,
  FaGamepad,
  FaDice,
  FaCoins,
  FaCrosshairs,
  FaBomb,
  FaCircle,
  FaInfinity,
  FaTh,
  FaCogs,
  FaSpinner,
  FaUsers,
} from "react-icons/fa";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { IconContext } from "react-icons";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
// Removed framer-motion import - no longer using animations
import { useRouter } from "next/router";

const Sidenav = () => {
  const router = useRouter();
  const [solPrice, setSolPrice] = useState<number | null>(null);
  const [activeLink, setActiveLink] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    setActiveLink(window.location.pathname);

    const handleRouteChange = () => {
      setActiveLink(window.location.pathname);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    fetch("/api/solanaPrice")
      .then((response) => response.json())
      .then((data) => setSolPrice(data.solanaPrice))
      .catch((error) => console.error("Failed to fetch Solana price", error));
  }, []);

  // Removed variants - sidebar has fixed width

  const menuItems = [
    {
      section: "USER",
      items: [
        { icon: FaUser, text: "Profile", link: "/profile" },
        { icon: FaUsers, text: "Affiliate", link: "/affiliate" },
        { icon: FaLock, text: "Staking", link: "/staking" },
        { icon: FaInfoCircle, text: "About Us", link: "/info" },
      ],
    },
    {
      section: "GAMES",
      items: [
        { icon: FaDice, text: "Dice", link: "/play/dice" },
        { icon: FaCogs, text: "Slots", link: "/play/slots" },
        { icon: FaCoins, text: "Flip", link: "/play/flip" },
        { icon: FaCrosshairs, text: "Hilo", link: "/play/hilo" },
        { icon: FaBomb, text: "Mines", link: "/play/mines" },
        { icon: FaSpinner, text: "Roulette", link: "/play/roulette" },
        { icon: FaCircle, text: "Plinko", link: "/play/plinko" },
        { icon: FaInfinity, text: "Limbo", link: "/play/limbo" },
        { icon: FaTh, text: "Keno", link: "/play/keno" },
      ],
    },
  ];

  useEffect(() => {
    const width = isSidebarOpen ? "170px" : "60px";
    document.documentElement.style.setProperty("--sidenav-width", width);
  }, [isSidebarOpen]);

  return (
    <>
      <div className="hidden md:flex">
        <IconContext.Provider value={{ size: "1.5em", className: "text-current" }}>
          <div
            className={`border border-gray-600/50 p-2 rounded-xl bg-gray-900/90 backdrop-blur-xl mt-24 mb-10 ml-4 fixed inset-y-0 left-0 text-white shadow-2xl shadow-black/20 transition-all duration-300 ease-in-out bg-gradient-to-b from-gray-900/95 to-gray-800/95 ${
              isSidebarOpen ? "w-[170px] overflow-hidden" : "w-[60px] overflow-visible"
            }`}
          >
            {/* Toggle button */}
            <Button
              variant="ghost"
              className="w-full mb-3 p-2 hover:bg-gray-700/70 hover:shadow-lg transition-all duration-300 rounded-lg border border-gray-600/30"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? (
                <FaTimes className="w-4 h-4" />
              ) : (
                <FaBars className="w-4 h-4" />
              )}
            </Button>
            {solPrice && (
              <Button
                variant="ghost"
                className={`cursor-auto gap-2 mb-3 w-full border border-gray-600/50 p-2 bg-gray-800/50 text-white rounded-lg shadow-md justify-center ${
                  !isSidebarOpen ? "min-w-[44px]" : ""
                }`}
              >
                <img
                  src="/SOL.png"
                  alt="Solana logo"
                  className="rounded-full w-5 h-5 flex-shrink-0"
                />
                {isSidebarOpen && <span className="font-mono font-semibold text-sm">SOL ${solPrice.toFixed(2)}</span>}
              </Button>
            )}

            <ScrollArea className="overflow-y-auto h-[calc(100vh-15rem)]">
              <nav className="space-y-1 px-1">
                {menuItems.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="space-y-1">
                    {section.section === "GAMES" ? (
                      <div className="space-y-1">
                        {/* Game Items */}
                        {section.items.map((item, index) => (
                          <Link href={item.link} key={index}>
                            <li
                              className={`rounded-lg flex items-center p-2 cursor-pointer hover:bg-gray-700/70 hover:shadow-lg transition-all duration-300 ease-in-out border list-none ${
                                activeLink === item.link
                                  ? "border-yellow-400/50 bg-gray-700/80 shadow-yellow-400/10"
                                  : "border-gray-600/30"
                              } ${
                                isSidebarOpen ? "w-full justify-start gap-3" : "w-[44px] min-w-[44px] justify-center"
                              }`}
                            >
                              <div className="flex-shrink-0">
                                <item.icon className="w-5 h-5" />
                              </div>
                              {isSidebarOpen && (
                                <span className="whitespace-nowrap font-secondary font-semibold text-sm overflow-hidden">
                                  {item.text}
                                </span>
                              )}
                            </li>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {/* Non-Game Items */}
                        {section.items.map((item, index) => (
                          <Link href={item.link} key={index}>
                            <li
                              className={`rounded-lg flex items-center p-2 cursor-pointer hover:bg-gray-700/70 hover:shadow-lg transition-all duration-300 ease-in-out border list-none ${
                                activeLink === item.link
                                  ? "border-yellow-400/50 bg-gray-700/80 shadow-yellow-400/10"
                                  : "border-gray-600/30"
                              } ${
                                isSidebarOpen ? "w-full justify-start gap-3" : "w-[44px] min-w-[44px] justify-center"
                              }`}
                            >
                              <div className="flex-shrink-0">
                                <item.icon className="w-5 h-5" />
                              </div>
                              {isSidebarOpen && (
                                <span className="whitespace-nowrap font-secondary font-semibold text-sm overflow-hidden">
                                  {item.text}
                                </span>
                              )}
                            </li>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </ScrollArea>
          </div>
        </IconContext.Provider>
      </div>

      {/* Mobile version */}
      <div className="md:hidden z-50 fixed inset-x-0 bottom-0 bg-gray-900/90 backdrop-blur-xl border-t border-x border-gray-600/50 shadow-2xl shadow-black/20 rounded-t-2xl">
        <div className="flex justify-around items-center h-16">
          <Link href="/" passHref>
            <Button variant="ghost">
              <div className="flex flex-col items-center">
                <FaHome className="w-6 h-6" />
              </div>
            </Button>
          </Link>
          <Link href="/play" passHref>
            <Button variant="ghost">
              <div className="flex flex-col items-center">
                <FaGamepad className="w-6 h-6" />
              </div>
            </Button>
          </Link>
          <Link href="/profile" passHref>
            <Button variant="ghost">
              <div className="flex flex-col items-center">
                <FaUser className="w-6 h-6" />
              </div>
            </Button>
          </Link>
          <Link href="/affiliate" passHref>
            <Button variant="ghost">
              <div className="flex flex-col items-center">
                <FaUsers className="w-6 h-6" />
              </div>
            </Button>
          </Link>
          <Link href="/staking" passHref>
            <Button variant="ghost">
              <div className="flex flex-col items-center">
                <FaLock className="w-6 h-6" />
              </div>
            </Button>
          </Link>
          <Link href="/info" passHref>
            <Button variant="ghost">
              <div className="flex flex-col items-center">
                <FaInfoCircle className="w-6 h-6" />
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidenav;
