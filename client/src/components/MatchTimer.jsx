import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

export default function MatchTimer({ running, resetSignal }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setSeconds(0);
  }, [resetSignal]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");

  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full glass">
      <Clock size={13} strokeWidth={2.5} className="text-slate-500 dark:text-slate-400" />
      <span className="relative flex h-[7px] w-[7px]">
        {running && (
          <motion.span
            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inline-flex h-full w-full rounded-full bg-rose-400"
          />
        )}
        <span className={`relative inline-flex rounded-full h-[7px] w-[7px] ${running ? "bg-rose-500" : "bg-slate-400"}`} />
      </span>
      <span className="text-[11px] font-mono font-semibold text-slate-700 dark:text-slate-200 tabular-nums min-w-[36px]">
        {m}:{s}
      </span>
    </div>
  );
}
