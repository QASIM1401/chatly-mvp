import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Video, Zap, Shield, Globe, ArrowRight, RefreshCw, AlertCircle,
  Users, Lock, MonitorPlay,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle.jsx";
import OnlineCounter from "./OnlineCounter.jsx";
import DonationPanel from "./DonationPanel.jsx";
import SharePanel from "./SharePanel.jsx";
import Footer from "./Footer.jsx";
import { regenerateUsername } from "../utils/usernameGenerator.js";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
};

export default function Landing({ username, onStart, onlineCount, connected, theme, toggleTheme, onNavigate }) {
  const [name, setName] = useState(username);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => setName(username), [username]);

  const handleStart = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      await onStart(name);
    } catch (err) {
      setError(err.message || "Could not start. Check camera/mic permissions.");
    } finally {
      setLoading(false);
    }
  };

  const handleShuffle = () => setName(regenerateUsername());

  return (
    <div className="relative min-h-screen w-full overflow-hidden mesh-bg mesh-animated noise-overlay">
      {/* Grid pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 min-h-screen flex flex-col safe-top safe-bottom">
        {/* ─── Header ─── */}
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex items-center justify-between px-6 py-4 sm:px-8 sm:py-5 lg:px-12 lg:py-5 xl:px-16"
        >
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center shadow-glow-brand-sm">
              <Video className="text-white" size={18} strokeWidth={2.5} />
              <div className="absolute inset-0 rounded-xl bg-brand-gradient opacity-50 blur-lg" />
            </div>
            <div>
              <div className="text-[17px] font-extrabold gradient-text leading-none tracking-tight">Chatly</div>
              <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 mt-0.5 tracking-wide uppercase">
                Random video chat
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 lg:gap-3">
            <OnlineCounter count={onlineCount} connected={connected} />
            <DonationPanel />
            <SharePanel />
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
        </motion.header>

        {/* ─── Hero Section ─── */}
        <main className="flex-1 flex items-center">
          <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 lg:py-16">
            {/* Two-column on large screens */}
            <div className="flex flex-col lg:flex-row items-center lg:items-center gap-12 lg:gap-16 xl:gap-24">

              {/* LEFT — Text + Card */}
              <div className="flex-1 w-full max-w-[560px] xl:max-w-[640px]">
                {/* Status pill */}
                <motion.div
                  {...fadeUp}
                  transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8
                    bg-white/70 dark:bg-white/[0.06] backdrop-blur-xl
                    border border-violet-200/50 dark:border-violet-400/15
                    text-[12px] font-semibold text-violet-700 dark:text-violet-300
                    shadow-soft"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  {onlineCount > 0 ? `${onlineCount.toLocaleString()} online now` : "Peer-to-peer"}
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                  No login needed
                </motion.div>

                {/* Headline */}
                <motion.h1
                  {...fadeUp}
                  transition={{ delay: 0.18, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[48px] sm:text-[56px] lg:text-[64px] xl:text-[72px] 2xl:text-[80px]
                    font-[900] mb-6 leading-[0.95] tracking-[-0.02em] balance"
                >
                  <span className="text-slate-900 dark:text-white block">Meet new</span>
                  <span className="gradient-text block">people instantly</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  {...fadeUp}
                  transition={{ delay: 0.28, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[16px] sm:text-[17px] lg:text-[18px] text-slate-600 dark:text-slate-400
                    max-w-lg leading-relaxed mb-10"
                >
                  Random 1-on-1 video chats with real people.
                  <br className="hidden sm:block" />
                  No downloads. No signup. Just press start.
                </motion.p>

                {/* Start Card */}
                <motion.div
                  {...fadeUp}
                  transition={{ delay: 0.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  <div className="absolute -inset-1.5 rounded-[2rem] bg-gradient-to-r from-violet-500/20 via-indigo-500/10 to-cyan-500/20 blur-2xl opacity-50" />

                  <div className="relative glass-strong rounded-[1.75rem] p-6 sm:p-8">
                    <div className="mb-5">
                      <label className="flex items-center gap-2 text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-[0.08em]">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                          <circle cx="12" cy="7" r="4"/>
                        </svg>
                        Guest name
                      </label>
                      <div className="flex gap-3">
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          maxLength={20}
                          className="flex-1 px-4 py-3.5 rounded-2xl text-[15px] font-semibold tracking-tight
                            bg-white/90 dark:bg-slate-900/70
                            border border-slate-200/80 dark:border-white/[0.08]
                            text-slate-800 dark:text-slate-100
                            placeholder:text-slate-400 dark:placeholder:text-slate-500
                            focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400/60
                            focus:bg-white dark:focus:bg-slate-900/80
                            transition-all duration-200 shadow-inner-light"
                          placeholder="Enter a name"
                        />
                        <button
                          onClick={handleShuffle}
                          title="Generate new name"
                          aria-label="Shuffle name"
                          className="w-[52px] rounded-2xl flex items-center justify-center shrink-0
                            bg-white/90 dark:bg-slate-900/70
                            border border-slate-200/80 dark:border-white/[0.08]
                            hover:bg-violet-50 dark:hover:bg-violet-500/10
                            hover:border-violet-300 dark:hover:border-violet-400/20
                            hover:text-violet-600 dark:hover:text-violet-400
                            active:scale-95 transition-all duration-200
                            text-slate-600 dark:text-slate-300"
                        >
                          <RefreshCw size={16} strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -4, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        className="mb-4 p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-500/10
                          border border-rose-200 dark:border-rose-500/20
                          flex items-start gap-2.5 text-[13px] text-rose-700 dark:text-rose-300"
                      >
                        <AlertCircle size={16} className="shrink-0 mt-0.5" strokeWidth={2.2} />
                        <span>{error}</span>
                      </motion.div>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      onClick={handleStart}
                      disabled={loading}
                      className="w-full py-4 rounded-2xl font-bold text-white text-[16px] tracking-wide
                        bg-brand-gradient btn-glow
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                        flex items-center justify-center gap-2.5"
                    >
                      {loading ? (
                        <>
                          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full spin-smooth" />
                          <span>Requesting camera...</span>
                        </>
                      ) : (
                        <>
                          <span>Start Chatting</span>
                          <ArrowRight size={18} strokeWidth={2.5} />
                        </>
                      )}
                    </motion.button>

                    <div className="flex items-center justify-center gap-4 mt-6">
                      <FeaturePill icon={Zap} text="Instant match" />
                      <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                      <FeaturePill icon={Shield} text="Private" />
                      <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                      <FeaturePill icon={Globe} text="Global" />
                    </div>
                  </div>
                </motion.div>

                <motion.p
                  {...fadeUp}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-center lg:text-left text-[11px] text-slate-400 dark:text-slate-500 mt-6 leading-relaxed"
                >
                  Camera and microphone access required. Be respectful.
                </motion.p>
              </div>

              {/* RIGHT — Visual / Feature showcase (desktop only) */}
              <motion.div
                initial={{ opacity: 0, x: 40, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="hidden lg:flex flex-1 w-full max-w-[600px] xl:max-w-[700px] items-center justify-center"
              >
                <div className="relative w-full">
                  {/* Ambient glow behind the mockup */}
                  <div className="absolute inset-0 -m-12 bg-gradient-to-br from-violet-500/15 via-cyan-500/10 to-indigo-500/15 rounded-full blur-[80px]" />

                  {/* Main preview card */}
                  <div className="relative rounded-[2rem] overflow-hidden glass-strong p-1">
                    {/* Fake video call mockup */}
                    <div className="relative rounded-[1.5rem] overflow-hidden bg-slate-900 aspect-[16/10]">
                      {/* Stranger video — full background */}
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80&fit=crop&crop=faces"
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Name badge */}
                      <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="text-[12px] font-semibold text-white">Stranger</span>
                      </div>

                      {/* Local PiP */}
                      <div className="absolute bottom-4 right-4 w-28 h-20 rounded-xl overflow-hidden border-2 border-white/20 shadow-2xl">
                        <img
                          src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80&fit=crop&crop=faces"
                          alt=""
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute bottom-1 left-1.5 inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/40 backdrop-blur-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          <span className="text-[8px] font-semibold text-white">You</span>
                        </div>
                      </div>

                      {/* Control bar */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                        <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>
                        </div>
                        <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg>
                        </div>
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 flex items-center justify-center">
                          <ArrowRight size={14} className="text-white" strokeWidth={2.5} />
                        </div>
                        <div className="w-8 h-8 rounded-xl bg-rose-500/80 flex items-center justify-center">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"/><line x1="22" y1="2" x2="2" y2="22"/></svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating feature cards */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-6 -right-4 xl:-right-8 px-4 py-3 rounded-2xl glass-strong shadow-elevated"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                        <Lock size={16} className="text-emerald-500" strokeWidth={2.2} />
                      </div>
                      <div>
                        <div className="text-[12px] font-bold text-slate-800 dark:text-slate-100">End-to-end</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">Encrypted P2P</div>
                      </div>
                    </div>
                  </motion.div>


                </div>
              </motion.div>
            </div>
          </div>
        </main>

        {/* ─── Footer ─── */}
        <Footer onNavigate={onNavigate} />
      </div>
    </div>
  );
}

function FeaturePill({ icon: Icon, text }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
      <Icon size={13} strokeWidth={2.2} className="text-violet-500" />
      {text}
    </span>
  );
}
