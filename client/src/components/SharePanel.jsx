import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Copy, Check, MessageCircle, Twitter, Send, X, Users, QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

const SHARE_URL = typeof window !== "undefined" ? window.location.origin : "https://chatly.app";
const SHARE_TEXT = "Try Chatly — random video chat. No signup, totally anonymous. Meet new people instantly.";

export default function SharePanel() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onEsc = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = SHARE_URL;
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Chatly", text: SHARE_TEXT, url: SHARE_URL });
      } catch (e) {
        if (e.name !== "AbortError") handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="relative" ref={ref}>
      <motion.button
        whileTap={{ scale: 0.93 }}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 pl-2.5 pr-3 py-1.5 rounded-full text-[11px] font-bold
          bg-violet-500/[0.1] hover:bg-violet-500/[0.18] dark:bg-violet-400/[0.1] dark:hover:bg-violet-400/[0.18]
          text-violet-700 dark:text-violet-300
          border border-violet-400/20 dark:border-violet-400/15 transition-all duration-200"
        title="Share with friends"
      >
        <Share2 size={13} strokeWidth={2.5} />
        <span className="hidden sm:inline">Invite</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-0"
              onClick={() => setOpen(false)} />

            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="fixed lg:absolute left-3 right-3 lg:left-auto lg:right-0 top-[72px] lg:top-full lg:mt-2
                lg:w-[340px] z-50 mx-auto lg:mx-0 max-w-[380px]">
              <div className="glass-strong rounded-[1.5rem] p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-brand-gradient flex items-center justify-center shadow-glow-brand-sm shrink-0">
                      <Users size={16} className="text-white" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="text-[14px] font-bold text-slate-800 dark:text-slate-100 leading-tight">
                        Invite a friend
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Share Chatly with anyone
                      </p>
                    </div>
                  </div>
                  <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0
                    bg-slate-900/[0.06] hover:bg-slate-900/[0.1] dark:bg-white/[0.06] dark:hover:bg-white/[0.1] transition-colors"
                    aria-label="Close">
                    <X size={14} className="text-slate-600 dark:text-slate-300" strokeWidth={2.5} />
                  </button>
                </div>

                {/* Share actions */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {/* Native share (mobile) */}
                  <button onClick={handleNativeShare}
                    className="flex items-center gap-2 p-3 rounded-xl
                      bg-brand-gradient text-white font-semibold text-[12px]
                      hover:shadow-glow-brand-sm transition-shadow active:scale-[0.97]">
                    <Share2 size={15} strokeWidth={2.5} />
                    <span>{navigator.share ? "Share" : "Copy Link"}</span>
                  </button>

                  {/* Copy */}
                  <button onClick={handleCopy}
                    className="flex items-center gap-2 p-3 rounded-xl
                      bg-slate-900/[0.06] dark:bg-white/[0.06]
                      hover:bg-slate-900/[0.1] dark:hover:bg-white/[0.1]
                      text-slate-700 dark:text-slate-200 font-semibold text-[12px]
                      border border-slate-200/50 dark:border-white/[0.06] transition-all active:scale-[0.97]">
                    {copied ? <Check size={15} className="text-emerald-500" strokeWidth={2.5} /> : <Copy size={15} strokeWidth={2.5} />}
                    <span>{copied ? "Copied!" : "Copy Link"}</span>
                  </button>

                  {/* WhatsApp */}
                  <a href={`https://wa.me/?text=${encodeURIComponent(SHARE_TEXT + " " + SHARE_URL)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-xl
                      bg-[#25D366]/10 hover:bg-[#25D366]/20 dark:bg-[#25D366]/10 dark:hover:bg-[#25D366]/15
                      text-[#25D366] font-semibold text-[12px]
                      border border-[#25D366]/20 transition-all active:scale-[0.97]">
                    <MessageCircle size={15} strokeWidth={2.5} />
                    <span>WhatsApp</span>
                  </a>

                  {/* Telegram */}
                  <a href={`https://t.me/share/url?url=${encodeURIComponent(SHARE_URL)}&text=${encodeURIComponent(SHARE_TEXT)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-xl
                      bg-[#0088CC]/10 hover:bg-[#0088CC]/20 dark:bg-[#0088CC]/10 dark:hover:bg-[#0088CC]/15
                      text-[#0088CC] font-semibold text-[12px]
                      border border-[#0088CC]/20 transition-all active:scale-[0.97]">
                    <Send size={15} strokeWidth={2.5} />
                    <span>Telegram</span>
                  </a>
                </div>

                {/* URL bar */}
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/50 dark:bg-white/[0.03]
                  border border-slate-200/50 dark:border-white/[0.05]">
                  <span className="flex-1 text-[11px] font-mono text-slate-600 dark:text-slate-300 truncate select-all">
                    {SHARE_URL}
                  </span>
                  <button onClick={handleCopy}
                    className="shrink-0 p-1.5 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 text-violet-600 dark:text-violet-400 transition-colors">
                    {copied ? <Check size={12} strokeWidth={3} /> : <Copy size={12} strokeWidth={2.5} />}
                  </button>
                </div>

                <p className="text-center text-[10px] text-slate-400 dark:text-slate-500 mt-3">
                  No tracking. Just share and have fun.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
