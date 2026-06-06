import { motion } from "framer-motion";
import {
  Mic, MicOff, Video, VideoOff, PhoneOff, ArrowRight, MessageSquare,
} from "lucide-react";

export default function ControlBar({
  onNext, onEnd, videoEnabled, audioEnabled,
  onToggleVideo, onToggleAudio, onToggleChat, chatOpen, nextDisabled = false,
}) {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", damping: 24, stiffness: 200, delay: 0.2 }}
      className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-[1.25rem] glass-strong"
    >
      <ControlButton
        onClick={onToggleAudio}
        active={audioEnabled}
        activeIcon={<Mic size={20} strokeWidth={2.2} />}
        inactiveIcon={<MicOff size={20} strokeWidth={2.2} />}
        title={audioEnabled ? "Mute mic" : "Unmute mic"}
      />

      <ControlButton
        onClick={onToggleVideo}
        active={videoEnabled}
        activeIcon={<Video size={20} strokeWidth={2.2} />}
        inactiveIcon={<VideoOff size={20} strokeWidth={2.2} />}
        title={videoEnabled ? "Stop video" : "Start video"}
      />

      {onToggleChat && (
        <button
          onClick={onToggleChat}
          className={`lg:hidden flex items-center justify-center w-[48px] h-[48px] sm:w-[52px] sm:h-[52px] rounded-2xl transition-all duration-200 active:scale-90 ${
            chatOpen
              ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-lg"
              : "bg-slate-900/[0.06] hover:bg-slate-900/[0.1] text-slate-700 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] dark:text-slate-100"
          }`}
          title="Toggle chat"
          aria-label="Toggle chat"
        >
          <MessageSquare size={20} strokeWidth={2.2} />
        </button>
      )}

      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        disabled={nextDisabled}
        className="flex items-center gap-2 px-5 sm:px-7 h-[48px] sm:h-[52px] rounded-2xl
          bg-brand-gradient hover:shadow-glow-brand-sm text-white font-bold text-[14px]
          transition-all duration-300 tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
        title="Skip to next person"
      >
        <span className="hidden sm:inline">Next</span>
        <ArrowRight size={18} strokeWidth={2.5} />
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onEnd}
        className="flex items-center justify-center w-[48px] h-[48px] sm:w-[52px] sm:h-[52px] rounded-2xl
          bg-rose-500 hover:bg-rose-600 text-white
          shadow-[0_4px_16px_rgba(244,63,94,0.35)] hover:shadow-[0_6px_24px_rgba(244,63,94,0.45)]
          transition-all duration-200 active:scale-90"
        title="End chat"
        aria-label="End chat"
      >
        <PhoneOff size={20} strokeWidth={2.2} />
      </motion.button>
    </motion.div>
  );
}

function ControlButton({ onClick, active, activeIcon, inactiveIcon, title }) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`flex items-center justify-center w-[48px] h-[48px] sm:w-[52px] sm:h-[52px] rounded-2xl
        transition-all duration-200 ${
          active
            ? "bg-slate-900/[0.06] hover:bg-slate-900/[0.1] text-slate-700 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] dark:text-slate-100"
            : "bg-rose-500 hover:bg-rose-600 text-white shadow-[0_4px_16px_rgba(244,63,94,0.3)]"
        }`}
      title={title}
      aria-label={title}
    >
      {active ? activeIcon : inactiveIcon}
    </motion.button>
  );
}
