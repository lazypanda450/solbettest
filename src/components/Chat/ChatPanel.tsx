import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaComments, 
  FaTimes, 
  FaPaperPlane, 
  FaUsers, 
  FaBars,
  FaCrown,
  FaStar,
  FaInfoCircle
} from "react-icons/fa";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { IconContext } from "react-icons";

interface Message {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  isVip?: boolean;
  isModerator?: boolean;
}

const ChatPanel = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      username: "CryptoGamer",
      message: "Just hit a huge win on Dice! 🎲",
      timestamp: new Date(Date.now() - 120000),
      isVip: true
    },
    {
      id: "2",
      username: "SolanaPlayer",
      message: "Welcome to SOLBET Casino! Best of luck everyone!",
      timestamp: new Date(Date.now() - 90000),
      isModerator: true
    },
    {
      id: "3",
      username: "LuckyWhale",
      message: "The new games are amazing! Loving the graphics 🔥",
      timestamp: new Date(Date.now() - 60000)
    },
    {
      id: "4",
      username: "SlotMaster",
      message: "Anyone tried the new Plinko game? Thoughts?",
      timestamp: new Date(Date.now() - 30000),
      isVip: true
    }
  ]);
  const [onlineCount] = useState(1247);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showRules, setShowRules] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // CSS Variable for chat width
  useEffect(() => {
    const width = isChatOpen ? "270px" : "60px";
    document.documentElement.style.setProperty("--chat-width", width);
  }, [isChatOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        username: "You",
        message: message.trim(),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newMessage]);
      setMessage("");
    }
  };

  // Simulate receiving new messages and update unread count
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isChatOpen) {
        setUnreadCount(prev => prev + 1);
      }
    }, 30000); // Simulate new message every 30 seconds when chat is closed

    return () => clearInterval(interval);
  }, [isChatOpen]);

  // Reset unread count when chat is opened
  useEffect(() => {
    if (isChatOpen) {
      setUnreadCount(0);
    }
  }, [isChatOpen]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getUserBadge = (msg: Message) => {
    if (msg.isModerator) {
      return <FaCrown className="w-3 h-3 text-purple-400 ml-1" title="Moderator" />;
    }
    if (msg.isVip) {
      return <FaStar className="w-3 h-3 text-yellow-400 ml-1" title="VIP Member" />;
    }
    return null;
  };

  return (
    <>
      {/* Desktop Chat */}
      <div className="hidden md:flex">
        <IconContext.Provider value={{ size: "1.5em", className: "text-current" }}>
          <div
            className={`overflow-hidden border border-gray-600/50 p-2 rounded-xl bg-gray-900/90 backdrop-blur-xl mt-24 mb-10 mr-4 fixed inset-y-0 right-0 text-white shadow-2xl shadow-black/20 transition-all duration-300 ease-in-out bg-gradient-to-b from-gray-900/95 to-gray-800/95 ${
              isChatOpen ? "w-[270px]" : "w-[60px]"
            }`}
          >
            {/* Toggle Button */}
            <Button
              variant="ghost"
              className="w-full mb-3 p-2 hover:bg-gray-700/70 hover:shadow-lg transition-all duration-300 rounded-lg border border-gray-600/30"
              onClick={() => setIsChatOpen(!isChatOpen)}
            >
              {isChatOpen ? (
                <FaTimes className="w-4 h-4" />
              ) : (
                <FaComments className="w-4 h-4" />
              )}
            </Button>

            {/* Online Counter */}
            {isChatOpen && (
              <Button
                variant="ghost"
                className="cursor-auto gap-2 mb-3 w-full justify-center border border-gray-600/50 p-2 bg-gray-800/50 text-white rounded-lg shadow-md"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                {isChatOpen && <span className="font-mono font-semibold">{onlineCount.toLocaleString()} Online</span>}
              </Button>
            )}

            {/* Chat Content */}
            {isChatOpen && (
              <div className="flex flex-col h-[calc(100vh-16rem)]">
                {/* Messages */}
                <ScrollArea className="flex-1 px-1 mb-3">
                  <div className="space-y-2">
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-3 rounded-lg text-sm border ${
                          msg.username === "You" 
                            ? "bg-gray-700/70 border border-yellow-400/40 shadow-lg shadow-yellow-400/5" 
                            : "bg-gray-800/60 border-gray-600/30 hover:bg-gray-700/60 hover:border-gray-500/50"
                        } transition-all duration-300 backdrop-blur-sm`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center">
                            <span className={`font-semibold font-secondary text-xs ${
                              msg.username === "You" 
                                ? "text-yellow-400" 
                                : msg.isModerator 
                                ? "text-purple-400"
                                : msg.isVip
                                ? "text-yellow-300"
                                : "text-blue-300"
                            }`}>
                              {msg.username}
                            </span>
                            {getUserBadge(msg)}
                          </div>
                          <span className="text-xs text-gray-500 font-mono">
                            {formatTime(msg.timestamp)}
                          </span>
                        </div>
                        <p className="text-gray-200 text-xs font-secondary leading-relaxed break-words">
                          {msg.message}
                        </p>
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Chat Rules Section */}
                <div className="border-t border-gray-600/50 pt-3 px-1 mb-3">
                  <Button
                    variant="ghost"
                    onClick={() => setShowRules(!showRules)}
                    className="w-full text-xs text-gray-400 hover:text-white hover:bg-gray-700/70 transition-all duration-300 flex items-center justify-center gap-2 rounded-lg border border-gray-600/30 p-2"
                  >
                    <FaInfoCircle className="w-3 h-3" />
                    {showRules ? "Hide Rules" : "Chat Rules"}
                  </Button>
                  
                  {showRules && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 p-3 bg-gray-800/50 rounded-lg border border-gray-600/40 backdrop-blur-sm shadow-lg"
                    >
                      <div className="text-xs text-gray-300 font-secondary space-y-1">
                        <div className="text-yellow-400 font-semibold mb-1">Chat Rules:</div>
                        <div>• Be respectful to all players</div>
                        <div>• No spam or excessive caps</div>
                        <div>• No sharing of personal information</div>
                        <div>• No advertising or self-promotion</div>
                        <div>• Keep discussions gaming-related</div>
                        <div>• Follow moderator instructions</div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Input Section */}
                <div className="border-t border-gray-600/50 pt-3 px-1">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type message..."
                      className="flex-1 px-4 py-2 text-sm bg-gray-800/70 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/60 focus:border-yellow-400/50 transition-all duration-300 font-secondary backdrop-blur-sm"
                      maxLength={200}
                    />
                    <Button
                      variant="ghost"
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      className="px-3 py-2 bg-gray-800/70 hover:bg-gray-700/70 disabled:opacity-50 border border-gray-600/50 rounded-lg hover:shadow-lg transition-all duration-300"
                    >
                      <FaPaperPlane className="w-4 h-4" />
                    </Button>
                  </div>
                  {/* Character Counter */}
                  <div className="flex justify-between items-center mt-1 px-1">
                    <div className="text-xs text-gray-500 font-mono">
                      {message.length}/200
                    </div>
                    <div className="text-xs text-gray-500 font-secondary">
                      Press Enter to send
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Collapsed State - Show notification */}
            {!isChatOpen && (
              <div className="flex flex-col items-center mt-4">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center mb-2 relative">
                  <FaComments className="w-4 h-4 text-gray-300" />
                  {unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{unreadCount > 9 ? '9+' : unreadCount}</span>
                    </div>
                  )}
                </div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                {unreadCount > 0 && (
                  <div className="text-xs text-gray-400 font-mono mt-1 text-center">
                    {unreadCount} new
                  </div>
                )}
              </div>
            )}
          </div>
        </IconContext.Provider>
      </div>

      {/* Mobile Chat Button - Bottom Navigation */}
      <div className="md:hidden fixed bottom-20 right-4 z-50">
        <Button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg hover:shadow-yellow-400/25 relative"
        >
          <FaComments className="w-6 h-6" />
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">{unreadCount > 9 ? '9+' : unreadCount}</span>
            </div>
          )}
        </Button>
      </div>
    </>
  );
};

export default ChatPanel;