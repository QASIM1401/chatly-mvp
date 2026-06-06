import { motion } from "framer-motion";
import { Users } from "lucide-react";

export default function OnlineCounter({ count, connected }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full glass">
      <Users size={13} strokeWidth={2.5} className="text-slate-500 dark:text-slate-400" />
      <div className="flex items-center gap-1">
        <span className="relative flex h-[7px] w-[7px]">
          {connected && (
            <motion.span
              animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inline-flex h-full w-full rounded-full bg-emerald-400"
            />
          )}
          <span className={`relative inline-flex rounded-full h-[7px] w-[7px] ${connected ? "bg-emerald-500" : "bg-slate-400"}`} />
        </span>
        <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 tabular-nums">
          {connected ? count.toLocaleString() : "-"}
        </span>
      </div>
    </div>
  );
}
