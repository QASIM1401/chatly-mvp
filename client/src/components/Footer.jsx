import { Heart, Mail, Shield, FileText, Github } from "lucide-react";

const CONTACT = "qasim.sec1401@proton.me";

export default function Footer({ onNavigate }) {
  return (
    <footer className="w-full border-t border-slate-200/40 dark:border-white/[0.04]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left */}
          <div className="flex flex-col items-center sm:items-start gap-1.5">
            <span className="text-[13px] font-bold gradient-text">Chatly</span>
            <span className="text-[11px] text-slate-400 dark:text-slate-500">
              Random video chat. No signup. Fully anonymous.
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">
            <FooterLink icon={Shield} label="Privacy" onClick={() => onNavigate("privacy")} />
            <FooterLink icon={FileText} label="Terms" onClick={() => onNavigate("terms")} />
            <FooterLink icon={Mail} label="Report Bug" href={`mailto:${CONTACT}`} external />
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-200/30 dark:border-white/[0.03]
          flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[10.5px] text-slate-400/70 dark:text-slate-600/70">
            End-to-end encrypted. Peer-to-peer. Your privacy matters.
          </p>
          <p className="text-[10.5px] text-slate-400/70 dark:text-slate-600/70 flex items-center gap-1">
            Made with <Heart size={10} className="text-rose-500" fill="currentColor" /> for privacy
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ icon: Icon, label, onClick, href, external }) {
  const classes = "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold " +
    "text-slate-600 dark:text-slate-300 hover:bg-slate-900/[0.06] dark:hover:bg-white/[0.06] " +
    "hover:text-violet-600 dark:hover:text-violet-400 transition-all duration-200";

  if (href) {
    return (
      <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className={classes}>
        <Icon size={13} strokeWidth={2.2} />
        {label}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      <Icon size={13} strokeWidth={2.2} />
      {label}
    </button>
  );
}
