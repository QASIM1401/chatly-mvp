import { motion } from "framer-motion";
import { ArrowLeft, Shield, Eye, Server, Lock, UserX, Mail } from "lucide-react";

const CONTACT = "qasim.sec1401@proton.me";

export default function PrivacyPolicy({ onBack }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07060f]">
      <div className="sticky top-0 z-30 glass-strong border-b border-slate-200/60 dark:border-white/[0.06]">
        <div className="max-w-3xl mx-auto flex items-center gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <button onClick={onBack} className="w-10 h-10 rounded-xl flex items-center justify-center
            bg-slate-900/[0.06] hover:bg-slate-900/[0.1] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]
            active:scale-95 transition-all" aria-label="Go back">
            <ArrowLeft size={18} strokeWidth={2.5} className="text-slate-700 dark:text-slate-200" />
          </button>
          <div>
            <h1 className="text-[17px] font-extrabold text-slate-900 dark:text-white tracking-tight">Privacy Policy</h1>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Effective date: June 6, 2026</p>
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          <HighlightCard icon={UserX} title="Fully Anonymous" desc="No signup, no email, no phone number required." />
          <HighlightCard icon={Server} title="Zero Data Storage" desc="No messages, video, audio, or logs stored on our servers." />
          <HighlightCard icon={Eye} title="No Tracking" desc="No analytics, cookies, fingerprinting, or advertising." />
          <HighlightCard icon={Lock} title="Encrypted P2P" desc="Video and audio travel peer-to-peer via WebRTC encryption." />
        </div>

        <div className="space-y-8 text-[14px] leading-[1.85] text-slate-700 dark:text-slate-300">
          <Section title="1. Introduction">
            <p>Chatly ("we", "our", or "us") is a random video chat platform built on a privacy-first architecture. This Privacy Policy describes how we handle (and more importantly, do NOT handle) your information.</p>
            <p className="mt-3"><strong>Our fundamental principle is radical anonymity.</strong> Chatly is designed so that the identity, conversations, and behavior of our users cannot be collected, stored, or surveilled by design — because the technical architecture makes it structurally impossible.</p>
          </Section>

          <Section title="2. Information We Do NOT Collect">
            <p>We are explicit: <strong>we do not collect, store, or process any of the following:</strong></p>
            <ul className="list-none space-y-2 mt-3">
              {[
                "Real names, email addresses, or phone numbers",
                "IP addresses (not logged or stored)",
                "Video streams, audio data, or screen captures",
                "Text messages sent during chat sessions",
                "Location or geolocation data",
                "Device fingerprints, browser fingerprints, or cookies",
                "Usage analytics, session recordings, or heatmaps",
                "Browsing behavior within the application",
                "Referrer URLs or traffic sources",
                "Hardware or software identifiers",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-[9px] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="3. How Anonymity Works — Technical Details">
            <p className="mb-3">When you use Chatly, the following happens:</p>
            <ol className="list-decimal pl-5 space-y-3">
              <li><strong>Anonymous username:</strong> A random username (e.g. "SwiftFalcon42") is generated entirely in your browser using a local algorithm. It is stored only in your browser's localStorage. We never receive, transmit, or store it on our servers.</li>
              <li><strong>In-memory queue:</strong> Your browser connects to our server via an encrypted WebSocket. Your randomly generated name is placed in an in-memory queue. When a match is found, the server relays a WebRTC signaling message and the matching data is immediately discarded.</li>
              <li><strong>Peer-to-peer media:</strong> Once matched, all video, audio, and text communication flows directly between you and your chat partner via WebRTC (peer-to-peer). Our server never sees, inspects, or records any media content.</li>
              <li><strong>Session destruction:</strong> When you disconnect or click "Next," all server-side data for your session is immediately destroyed. There is no persistent storage and no logs to retain.</li>
            </ol>
          </Section>

          <Section title="4. End-to-End Encryption">
            <p>Chatly uses WebRTC for all real-time communication. WebRTC provides the following security guarantees:</p>
            <ul className="list-none space-y-2 mt-3">
              {[
                "DTLS (Datagram Transport Layer Security) encryption for all media streams",
                "SRTP (Secure Real-time Transport Protocol) for audio and video",
                "ICE (Interactive Connectivity Establishment) for NAT traversal",
                "Direct peer-to-peer data path with no intermediary access",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-[9px] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3">Your camera and microphone data never touches our servers. It flows directly between browsers using industry-standard encryption. We have no technical ability to intercept, record, or monitor these streams.</p>
          </Section>

          <Section title="5. Server Architecture">
            <p>Our servers exist solely to:</p>
            <ul className="list-none space-y-2 mt-3">
              {[
                "Maintain WebSocket connections for queue matching",
                "Relay WebRTC signaling data (SDP offers/answers, ICE candidates)",
                "Broadcast anonymous online user count",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-[9px] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3">The server runs <strong>entirely in-memory</strong>. There is no database, no disk persistence, and no log files containing user data. When the server restarts, all data is wiped.</p>
          </Section>

          <Section title="6. Cookies and Local Storage">
            <p>We do not use cookies. The only data stored locally in your browser:</p>
            <ul className="list-none space-y-2 mt-3">
              <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-[9px] shrink-0" /><span>Your randomly generated username (localStorage, client-side only)</span></li>
              <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-[9px] shrink-0" /><span>Your theme preference (light/dark mode)</span></li>
            </ul>
            <p className="mt-3">You can delete this data at any time by clearing your browser's localStorage or using incognito/private browsing mode.</p>
          </Section>

          <Section title="7. Third-Party Services">
            <p>Chatly does not use any third-party analytics, advertising, or tracking services. We do not integrate Google Analytics, Facebook Pixel, Mixpanel, Hotjar, or any similar service.</p>
            <p className="mt-3">The only external resource loaded is Google Fonts (for typography). When loading the font, Google may receive your IP address and browser user-agent. This is outside our control and is a standard web pattern.</p>
          </Section>

          <Section title="8. Age Restriction">
            <p>Chatly is intended for users aged <strong>18 and older</strong>. We do not knowingly facilitate use by minors. By using Chatly, you represent that you are at least 18 years of age.</p>
          </Section>

          <Section title="9. Reporting Misuse">
            <p>If you encounter inappropriate behavior, illegal content, or wish to report a safety concern:</p>
            <ul className="list-none space-y-2 mt-3">
              <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-[9px] shrink-0" /><span>Click "Next" to immediately leave the conversation</span></li>
              <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-[9px] shrink-0" /><span>Click "End" to return to the home screen</span></li>
              <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-[9px] shrink-0" /><span>Report via email to <span className="font-semibold text-violet-600 dark:text-violet-400">{CONTACT}</span></span></li>
            </ul>
          </Section>

          <Section title="10. Changes to This Policy">
            <p>We may update this policy occasionally. Changes will be posted on this page with an updated effective date. Continued use of Chatly after changes means you accept the revised policy.</p>
          </Section>

          <Section title="11. Contact">
            <p>For privacy questions, data requests, or to report an issue:</p>
            <a href={`mailto:${CONTACT}`}
              className="inline-flex items-center gap-2 mt-3 px-4 py-2.5 rounded-2xl
                bg-violet-500/10 hover:bg-violet-500/15 dark:bg-violet-500/10 dark:hover:bg-violet-500/15
                text-violet-700 dark:text-violet-300 font-semibold text-[13px]
                border border-violet-200/50 dark:border-violet-400/15 transition-colors">
              <Mail size={15} strokeWidth={2.2} />
              {CONTACT}
            </a>
          </Section>
        </div>
      </motion.div>
    </div>
  );
}

function Section({ title, children }) {
  return <section><h2 className="text-[17px] font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">{title}</h2>{children}</section>;
}

function HighlightCard({ icon: Icon, title, desc }) {
  return (
    <div className="p-4 rounded-2xl bg-white/60 dark:bg-white/[0.03] border border-slate-200/50 dark:border-white/[0.05]
      hover:border-violet-300/50 dark:hover:border-violet-400/15 transition-colors">
      <div className="flex items-center gap-2.5 mb-1.5">
        <div className="w-8 h-8 rounded-xl bg-violet-500/10 dark:bg-violet-400/10 flex items-center justify-center">
          <Icon size={16} className="text-violet-600 dark:text-violet-400" strokeWidth={2.2} />
        </div>
        <h3 className="text-[13px] font-bold text-slate-800 dark:text-slate-100">{title}</h3>
      </div>
      <p className="text-[12px] text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}
