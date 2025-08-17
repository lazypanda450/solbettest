import {
  TelegramLink,
  TwitterLink,
  WEBSITE_NAME,
} from "../../config";

import Link from "next/link";
import React from "react";
import { FaTwitter, FaTelegramPlane } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="py-12 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content Card */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-8">
          <div className="text-center space-y-8">
            {/* Logo and Website Info */}
            <div className="space-y-4">
              <img src="/logo.png" alt="logo" className="w-40 mx-auto mb-6" />
              <h3 className="text-2xl font-bold font-gaming text-white">{WEBSITE_NAME}</h3>
              <p className="text-gray-300 font-secondary text-lg max-w-3xl mx-auto">
                The premier decentralized casino on Solana. Experience lightning-fast transactions, 
                provably fair gaming, and next-generation entertainment in the world of web3 gambling.
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold font-gaming text-white">Get In Touch</h4>
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <div className="text-center p-4 bg-gray-700/30 rounded-lg border border-gray-600">
                  <h5 className="font-semibold font-secondary text-yellow-400 mb-2">Support</h5>
                  <a 
                    href="mailto:support@solbet.com" 
                    className="text-gray-300 hover:text-white transition-colors duration-300 font-secondary"
                  >
                    support@solbet.com
                  </a>
                </div>
                <div className="text-center p-4 bg-gray-700/30 rounded-lg border border-gray-600">
                  <h5 className="font-semibold font-secondary text-yellow-400 mb-2">Marketing</h5>
                  <a 
                    href="mailto:marketing@solbet.com" 
                    className="text-gray-300 hover:text-white transition-colors duration-300 font-secondary"
                  >
                    marketing@solbet.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media Buttons */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold font-gaming text-white">Join Our Community</h4>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a
                  href={TwitterLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold font-secondary rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  <FaTwitter className="w-6 h-6" />
                  <span className="text-lg">Follow on Twitter</span>
                </a>
                <a
                  href={TelegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white font-bold font-secondary rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  <FaTelegramPlane className="w-6 h-6" />
                  <span className="text-lg">Join Telegram</span>
                </a>
              </div>
            </div>

            {/* Supported Wallets */}
            <div className="pt-8 border-t border-gray-600">
              <h4 className="text-lg font-bold font-gaming text-white mb-4">Supported Wallets</h4>
              <img src="/wallets.png" alt="Supported Wallets" className="w-80 mx-auto" />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center py-6 border-t border-gray-700">
          <p className="text-sm text-gray-400 font-secondary">
            Copyright © 2024{" "}
            <Link className="text-yellow-400 hover:text-yellow-300 transition-colors duration-300" href="/">
              {WEBSITE_NAME}
            </Link>{" "}
            - All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
