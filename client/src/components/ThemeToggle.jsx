import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ theme, toggleTheme }) {
  const isDark = theme === "dark";
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative w-[48px] h-[32px] rounded-full p-[3px] transition-colors duration-300
        bg-slate-200/80 dark:bg-white/[0.08]
        border border-slate-300/50 dark:border-white/[0.08]
        hover:bg-slate-200 dark:hover:bg-white/[0.12]"
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 600, damping: 38 }}
        className="w-6 h-6 rounded-full flex items-center justify-center
          bg-white dark:bg-slate-900 shadow-md"
        style={{ marginLeft: isDark ? "16px" : "0px" }}
      >
        {isDark ? (
          <Moon size={13} strokeWidth={2.5} className="text-indigo-400" fill="currentColor" />
        ) : (
          <Sun size={13} strokeWidth={2.5} className="text-amber-500" />
        )}
      </motion.div>
    </button>
  );
}
