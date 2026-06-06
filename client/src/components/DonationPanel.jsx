import { useState, useRef, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import { Gem, Copy, Check, QrCode, X, Wallet, Heart, ArrowUpRight } from "lucide-react";

const ADDRESSES = {
  BTC: "bc1qexampleexampleexampleexampleexampleexample",
  USDT_TRC20: "TXyzExampleUSDTAddressTRC20xxxxxxxxxxxxxx",
  USDT_ERC20: "0xExampleUSDTAddressERC20xxxxxxxxxxxxxxxxxxxxxx",
  BINANCE_PAY: "123456789",
};

const NETWORKS = [
  { key: "BTC", label: "Bitcoin", sub: "BTC Network", accent: "from-amber-400 to-orange-500", iconBg: "bg-gradient-to-br from-amber-400 to-orange-500" },
  { key: "USDT_TRC20", label: "USDT", sub: "TRC20 (Tron)", accent: "from-emerald-400 to-teal-500", iconBg: "bg-gradient-to-br from-emerald-400 to-teal-500" },
  { key: "USDT_ERC20", label: "USDT", sub: "ERC20 (Ethereum)", accent: "from-blue-400 to-indigo-500", iconBg: "bg-gradient-to-br from-blue-400 to-indigo-500" },
  { key: "BINANCE_PAY", label: "Binance Pay", sub: "Pay ID", accent: "from-yellow-400 to-amber-500", iconBg: "bg-gradient-to-br from-yellow-400 to-amber-500" },
];

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = value;
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold
        bg-slate-900/[0.06] hover:bg-slate-900/[0.1] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]
        text-slate-700 dark:text-slate-300 transition-all duration-200 active:scale-95"
    >
      {copied ? (
        <><Check size={11} className="text-emerald-500" strokeWidth={3} /> <span className="text-emerald-600 dark:text-emerald-400">Copied</span></>
      ) : (
        <><Copy size={11} strokeWidth={2.5} /> Copy</>
      )}
    </button>
  );
}

function AddressRow({ title, sub, value, iconBg }) {
  const [showQR, setShowQR] = useState(false);
  return (
    <div className="group p-3 rounded-2xl bg-white/50 dark:bg-white/[0.03]
      border border-slate-200/50 dark:border-white/[0.04]
      hover:border-violet-300/50 dark:hover:border-violet-400/15
      hover:bg-white/70 dark:hover:bg-white/[0.05]
      transition-all duration-200">
      <div className="flex items-center gap-2.5 mb-2">
        <div className={`w-8 h-8 rounded-xl ${iconBg} flex items-center justify-center shadow-sm shrink-0`}>
          <Wallet size={14} className="text-white" strokeWidth={2.5} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[12px] font-bold text-slate-800 dark:text-slate-100 leading-tight">{title}</div>
          <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400">{sub}</div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setShowQR((s) => !s)}
            className={`p-1.5 rounded-lg transition-all duration-200 ${
              showQR
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                : "bg-slate-900/[0.06] hover:bg-slate-900/[0.1] dark:bg-white/[0.06] dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-300"
            }`}
            title="Toggle QR code"
          >
            <QrCode size={13} />
          </button>
          <CopyButton value={value} />
        </div>
      </div>
      <div className="font-mono text-[10px] text-slate-600 dark:text-slate-300 break-all leading-snug pl-[42px] select-all">
        {value}
      </div>
      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 10 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="flex justify-center bg-white p-4 rounded-xl border border-slate-100">
              <QRCodeSVG value={value} size={132} level="M" fgColor="#0f172a" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DonationPanel() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onEsc = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <motion.button
        whileTap={{ scale: 0.93 }}
        onClick={() => setOpen((o) => !o)}
        className="relative inline-flex items-center gap-1.5 pl-2.5 pr-3 py-1.5 rounded-full text-[11px] font-bold
          bg-gradient-to-r from-amber-400/[0.12] to-orange-400/[0.12]
          hover:from-amber-400/[0.2] hover:to-orange-400/[0.2]
          text-amber-700 dark:text-amber-300
          border border-amber-400/25 dark:border-amber-400/15 transition-all duration-200"
        title="Support this project"
      >
        <Heart size={13} strokeWidth={2.5} />
        <span className="hidden sm:inline">Support</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-0"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="fixed lg:absolute left-3 right-3 lg:left-auto lg:right-0 top-[72px] lg:top-full lg:mt-2
                lg:w-[370px] z-50 mx-auto lg:mx-0 max-w-[400px]"
            >
              <div className="glass-strong rounded-[1.5rem] p-4 sm:p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-sm shrink-0 mt-0.5">
                      <Gem size={16} className="text-white" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="text-[14px] font-bold text-slate-800 dark:text-slate-100 leading-tight">
                        Support this project
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Voluntary donations help keep the servers running
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0
                      bg-slate-900/[0.06] hover:bg-slate-900/[0.1] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]
                      transition-colors"
                    aria-label="Close"
                  >
                    <X size={14} className="text-slate-600 dark:text-slate-300" strokeWidth={2.5} />
                  </button>
                </div>

                {/* Addresses */}
                <div className="space-y-2">
                  {NETWORKS.map((n) => (
                    <AddressRow
                      key={n.key}
                      title={n.label}
                      sub={n.sub}
                      value={ADDRESSES[n.key]}
                      iconBg={n.iconBg}
                    />
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-3.5 pt-3 border-t border-slate-200/50 dark:border-white/[0.04]
                  flex items-center justify-center gap-1.5 text-[10.5px] font-medium text-slate-400 dark:text-slate-500">
                  <Heart size={11} className="text-rose-500" fill="currentColor" />
                  <span>Thank you for your support</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
