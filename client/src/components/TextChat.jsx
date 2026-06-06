import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, SmilePlus } from "lucide-react";

export default function TextChat({ messages, onSend, partnerUsername, selfUsername }) {
  const [text, setText] = useState("");
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText("");
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 no-scrollbar">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="relative mb-4">
              <div className="absolute inset-0 rounded-full bg-brand-gradient opacity-10 blur-xl scale-[2]" />
              <div className="relative w-14 h-14 rounded-2xl bg-brand-gradient-soft dark:bg-white/[0.05]
                flex items-center justify-center border border-violet-200/50 dark:border-violet-400/10">
                <SmilePlus size={24} className="text-violet-500" strokeWidth={1.8} />
              </div>
            </div>
            <p className="text-[13px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
              Say something to break the ice
            </p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500">
              Messages stay in this session only
            </p>
          </div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((m, i) => {
            const isMe = m.fromUsername === selfUsername;
            return (
              <motion.div
                key={`${m.timestamp}-${i}`}
                initial={{ opacity: 0, y: 12, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[78%] ${isMe ? "items-end" : "items-start"}`}>
                  {!isMe && (
                    <div className="text-[10px] font-bold text-violet-500 dark:text-violet-400 mb-1 ml-1">
                      {m.fromUsername}
                    </div>
                  )}
                  <div
                    className={`px-4 py-2.5 text-[13px] leading-relaxed break-words ${
                      isMe
                        ? "bg-brand-gradient text-white rounded-2xl rounded-br-md shadow-[0_4px_16px_rgba(124,58,237,0.25)]"
                        : "bg-slate-100 dark:bg-white/[0.06] text-slate-800 dark:text-slate-100 rounded-2xl rounded-bl-md border border-slate-200/60 dark:border-white/[0.06]"
                    }`}
                  >
                    {m.message}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-slate-200/60 dark:border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <input
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            maxLength={500}
            className="flex-1 px-4 py-3 rounded-2xl text-[13px] font-medium
              bg-white/70 dark:bg-white/[0.05]
              border border-slate-200/70 dark:border-white/[0.08]
              text-slate-800 dark:text-slate-100
              placeholder:text-slate-400 dark:placeholder:text-slate-500
              focus:outline-none focus:ring-2 focus:ring-violet-500/25 focus:border-violet-400/50
              focus:bg-white dark:focus:bg-white/[0.08]
              transition-all duration-200"
          />
          <motion.button
            whileTap={{ scale: 0.88 }}
            type="submit"
            disabled={!text.trim()}
            className="flex items-center justify-center w-11 h-11 rounded-2xl
              bg-brand-gradient text-white shadow-glow-brand-sm
              disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none
              transition-opacity duration-200"
            aria-label="Send"
          >
            <Send size={17} strokeWidth={2.5} />
          </motion.button>
        </div>
      </form>
    </div>
  );
}
