import { motion } from "framer-motion";

export default function StatusBadge({ status }) {
  const cfg = {
    idle: {
      label: "Idle",
      dotColor: "bg-slate-400",
      textColor: "text-slate-600 dark:text-slate-300",
    },
    searching: {
      label: "Searching",
      dotColor: "bg-amber-400",
      textColor: "text-amber-700 dark:text-amber-300",
    },
    connecting: {
      label: "Connecting",
      dotColor: "bg-blue-400",
      textColor: "text-blue-700 dark:text-blue-300",
    },
    connected: {
      label: "Connected",
      dotColor: "bg-emerald-500",
      textColor: "text-emerald-700 dark:text-emerald-300",
    },
    disconnected: {
      label: "Off",
      dotColor: "bg-rose-400",
      textColor: "text-rose-700 dark:text-rose-300",
    },
  }[status] || {
    label: "Idle",
    dotColor: "bg-slate-400",
    textColor: "text-slate-600 dark:text-slate-300",
  };

  const isActive = status === "searching" || status === "connecting";

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass">
      <span className="relative flex h-[7px] w-[7px]">
        {status === "connected" && (
          <motion.span
            animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inline-flex h-full w-full rounded-full bg-emerald-400"
          />
        )}
        <span className={`relative inline-flex rounded-full h-[7px] w-[7px] ${cfg.dotColor} ${isActive ? "animate-pulse" : ""}`} />
      </span>
      <span className={`text-[11px] font-semibold tracking-wide ${cfg.textColor}`}>{cfg.label}</span>
    </div>
  );
}
