import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, MessageSquare, ChevronLeft, Video as VideoIcon, Wifi } from "lucide-react";
import VideoPlayer from "./VideoPlayer.jsx";
import ControlBar from "./ControlBar.jsx";
import TextChat from "./TextChat.jsx";
import StatusBadge from "./StatusBadge.jsx";
import MatchTimer from "./MatchTimer.jsx";
import OnlineCounter from "./OnlineCounter.jsx";
import DonationPanel from "./DonationPanel.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

/* ─── Header ─── */
const Header = memo(function Header({
  connectionState, onlineCount, connected, partnerUsername, theme, toggleTheme,
}) {
  return (
    <header className="absolute top-0 left-0 right-0 z-30 px-3 pt-3 pb-2 sm:px-5 sm:pt-4 safe-top">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-2xl glass shrink-0">
          <div className="relative w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center">
            <VideoIcon className="text-white" size={16} strokeWidth={2.5} />
          </div>
          <span className="text-[14px] font-extrabold gradient-text hidden xs:inline tracking-tight">Chatly</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <StatusBadge status={connectionState} />
          <MatchTimer running={connectionState === "connected"} resetSignal={partnerUsername} />
          <OnlineCounter count={onlineCount} connected={connected} />
          <DonationPanel />
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>
    </header>
  );
});

/* ─── Searching State ─── */
function SearchingView({ onlineCount, onCancel }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="text-center max-w-sm px-6">
        {/* Animated radar rings */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          {/* Outer rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border-2 border-violet-400/20"
              animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeOut",
              }}
            />
          ))}
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-brand-gradient opacity-20 blur-xl scale-150" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="relative w-16 h-16 rounded-full bg-brand-gradient p-[2px]"
              >
                <div className="w-full h-full rounded-full bg-slate-50 dark:bg-[#07060f] flex items-center justify-center">
                  <Search size={24} className="text-violet-500" strokeWidth={2.2} />
                </div>
              </motion.div>
            </div>
          </div>
          {/* Orbiting dots */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={`dot-${i}`}
              className="absolute w-2 h-2 rounded-full bg-violet-400"
              style={{ top: "50%", left: "50%" }}
              animate={{
                x: [
                  Math.cos((i * Math.PI) / 2) * 50,
                  Math.cos((i * Math.PI) / 2 + Math.PI) * 50,
                  Math.cos((i * Math.PI) / 2 + Math.PI * 2) * 50,
                ],
                y: [
                  Math.sin((i * Math.PI) / 2) * 50,
                  Math.sin((i * Math.PI) / 2 + Math.PI) * 50,
                  Math.sin((i * Math.PI) / 2 + Math.PI * 2) * 50,
                ],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight"
        >
          Looking for someone...
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[14px] text-slate-500 dark:text-slate-400 mb-8 leading-relaxed"
        >
          {onlineCount > 0
            ? `${onlineCount.toLocaleString()} ${onlineCount === 1 ? "person is" : "people are"} online right now`
            : "Connecting to the network..."}
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onCancel}
          className="px-7 py-3 rounded-2xl text-[14px] font-semibold
            bg-white/80 dark:bg-white/[0.06]
            border border-slate-200 dark:border-white/10
            text-slate-700 dark:text-slate-200
            hover:bg-white dark:hover:bg-white/[0.1]
            shadow-soft transition-all duration-200"
        >
          Cancel
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ─── Main Chat ─── */
export default function Chat({
  username, connectionState, localStream, remoteStream,
  videoEnabled, audioEnabled, partnerUsername, messages, onlineCount, connected,
  onSendMessage, onNext, onEnd, onToggleVideo, onToggleAudio,
  onCancelSearch, searching, theme, toggleTheme,
}) {
  const [showPanel, setShowPanel] = useState(true);
  const [showMobileChat, setShowMobileChat] = useState(false);

  const isSearching = searching || connectionState === "searching";
  const isConnecting = connectionState === "connecting";
  const isConnected = connectionState === "connected";

  useEffect(() => {
    if (isSearching) setShowMobileChat(false);
  }, [isSearching]);

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-slate-50 dark:bg-[#07060f]">
      <Header
        connectionState={connectionState}
        onlineCount={onlineCount}
        connected={connected}
        partnerUsername={partnerUsername}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <div className="flex h-full pt-[72px] sm:pt-[80px]">
        {/* ─── Video Area ─── */}
        <div className="relative flex-1 min-w-0 p-2 sm:p-4">
          <div className="relative w-full h-full rounded-[1.35rem] sm:rounded-3xl overflow-hidden bg-slate-950 shadow-elevated">
            <AnimatePresence mode="wait">
              {isSearching && !isConnected && (
                <SearchingView key="search" onlineCount={onlineCount} onCancel={onCancelSearch} />
              )}

              {(isConnecting || isConnected) && (
                <motion.div
                  key="video"
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <VideoPlayer stream={remoteStream} label={partnerUsername || "Stranger"} />
                  {isConnecting && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                      <div className="text-center text-white">
                        <div className="w-14 h-14 mx-auto mb-4 border-[3px] border-white/20 border-t-white rounded-full spin-smooth" />
                        <p className="text-[14px] font-semibold tracking-wide">Connecting video...</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Local PiP */}
            {localStream && (
              <motion.div
                drag
                dragMomentum={false}
                dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
                dragElastic={0.12}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-28 sm:bottom-32 right-3 sm:right-5
                  w-[110px] h-[150px] sm:w-[140px] sm:h-[190px]
                  rounded-2xl overflow-hidden
                  border-[3px] border-white/20 dark:border-white/10
                  shadow-elevated z-20 cursor-grab active:cursor-grabbing touch-none"
                style={{ touchAction: "none" }}
              >
                <VideoPlayer stream={localStream} muted label="You" mirrored isLocal />
              </motion.div>
            )}

            {/* Mobile chat toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowMobileChat((s) => !s)}
              className="lg:hidden absolute top-3 right-3 z-20 w-11 h-11 rounded-2xl
                glass-strong flex items-center justify-center"
              aria-label="Toggle chat"
            >
              <MessageSquare size={18} className="text-slate-700 dark:text-slate-200" strokeWidth={2.2} />
              {messages.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1
                  rounded-full bg-rose-500 text-white text-[10px] font-bold
                  flex items-center justify-center shadow-lg">
                  {messages.length > 9 ? "9+" : messages.length}
                </span>
              )}
            </motion.button>

            {/* Control bar */}
            <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-20">
              <ControlBar
                onNext={onNext}
                onEnd={onEnd}
                videoEnabled={videoEnabled}
                audioEnabled={audioEnabled}
                onToggleVideo={onToggleVideo}
                onToggleAudio={onToggleAudio}
                onToggleChat={() => setShowMobileChat((s) => !s)}
                chatOpen={showMobileChat}
                nextDisabled={isSearching}
              />
            </div>
          </div>
        </div>

        {/* ─── Side Panel (Desktop) ─── */}
        <AnimatePresence initial={false}>
          {showPanel && (
            <motion.aside
              key="panel"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 340, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 260 }}
              className="hidden lg:flex shrink-0 border-l border-slate-200/60 dark:border-white/[0.06]
                bg-white/60 dark:bg-[#0a0918]/60 backdrop-blur-2xl overflow-hidden"
            >
              <div className="flex flex-col w-[340px] xl:w-[380px] h-full min-h-0">
                {/* Panel header */}
                <div className="px-5 py-4 border-b border-slate-200/60 dark:border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-xl bg-brand-gradient-soft dark:bg-white/[0.06] flex items-center justify-center">
                        <MessageSquare size={18} className="text-violet-600 dark:text-violet-400" strokeWidth={2.2} />
                      </div>
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-[#0a0918] bg-emerald-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] uppercase tracking-[0.08em] font-bold text-slate-500 dark:text-slate-400 mb-0.5">
                        Chatting with
                      </div>
                      <div className="text-[15px] font-bold text-slate-800 dark:text-white truncate tracking-tight">
                        {partnerUsername || "-"}
                      </div>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 ml-[52px]">
                    You: <span className="font-semibold text-violet-600 dark:text-violet-400">{username}</span>
                  </div>
                </div>
                <div className="flex-1 min-h-0">
                  <TextChat
                    messages={messages}
                    onSend={onSendMessage}
                    partnerUsername={partnerUsername}
                    selfUsername={username}
                  />
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Panel toggle (desktop) */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowPanel((s) => !s)}
          className="hidden lg:flex absolute top-[96px] right-3 z-30 w-9 h-9 rounded-xl glass-strong
            items-center justify-center hover:scale-105 transition-transform"
          title={showPanel ? "Close panel" : "Open panel"}
          aria-label="Toggle side panel"
        >
          <ChevronLeft
            size={16}
            className={`text-slate-700 dark:text-slate-200 transition-transform duration-300 ${showPanel ? "" : "rotate-180"}`}
            strokeWidth={2.5}
          />
        </motion.button>

        {/* ─── Mobile Chat Drawer ─── */}
        <AnimatePresence>
          {showMobileChat && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 300 }}
              className="lg:hidden absolute inset-x-0 bottom-0 top-[72px] z-40
                bg-white dark:bg-[#0a0918] rounded-t-[2rem]
                shadow-[0_-8px_32px_rgba(0,0,0,0.12)]
                flex flex-col"
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
              </div>
              <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 dark:border-white/[0.06]">
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] uppercase tracking-[0.08em] font-bold text-slate-500 dark:text-slate-400">
                    Chatting with
                  </div>
                  <div className="text-[15px] font-bold text-slate-800 dark:text-white tracking-tight truncate">
                    {partnerUsername || "-"}
                  </div>
                </div>
                <button
                  onClick={() => setShowMobileChat(false)}
                  className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/[0.06]
                    flex items-center justify-center active:scale-90 transition-transform"
                  aria-label="Close chat"
                >
                  <X size={18} className="text-slate-700 dark:text-slate-200" strokeWidth={2.5} />
                </button>
              </div>
              <div className="flex-1 min-h-0">
                <TextChat
                  messages={messages}
                  onSend={onSendMessage}
                  partnerUsername={partnerUsername}
                  selfUsername={username}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
