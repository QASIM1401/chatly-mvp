import { motion } from "framer-motion";
import { ArrowLeft, FileText, AlertTriangle, Scale, UserX, Ban, Mail } from "lucide-react";

const CONTACT = "qasim.sec1401@proton.me";

export default function TermsOfService({ onBack }) {
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
            <h1 className="text-[17px] font-extrabold text-slate-900 dark:text-white tracking-tight">Terms of Service</h1>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Effective date: June 6, 2026</p>
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          <SummaryCard icon={FileText} title="Simple Terms" desc="Short, readable terms written for humans, not lawyers." />
          <SummaryCard icon={AlertTriangle} title="Zero Tolerance" desc="Illegal activity, exploitation, and harassment result in immediate bans." />
          <SummaryCard icon={Scale} title="Fair Use" desc="Use Chatly respectfully. You are responsible for your actions." />
          <SummaryCard icon={Ban} title="No Warranty" desc="Service provided as-is. We disclaim all warranties to the fullest extent." />
        </div>

        <div className="space-y-8 text-[14px] leading-[1.85] text-slate-700 dark:text-slate-300">
          <Section title="1. Acceptance of Terms">
            <p>By accessing or using Chatly (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the Service.</p>
            <p className="mt-3">We reserve the right to update these Terms at any time. Continued use after changes means you accept the revised Terms.</p>
          </Section>

          <Section title="2. Eligibility">
            <p>Chatly is available only to individuals who are:</p>
            <ul className="list-none space-y-2 mt-3">
              {["At least 18 years of age", "Legally able to use the Service in their jurisdiction", "Not prohibited from using the Service by any applicable law"].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-[9px] shrink-0" /><span>{item}</span></li>
              ))}
            </ul>
          </Section>

          <Section title="3. What Chatly Is">
            <p>Chatly is a platform for random, anonymous, peer-to-peer video chat. It connects strangers for brief 1-on-1 video conversations. It is not a social network, dating platform, or content hosting service.</p>
          </Section>

          <Section title="4. Prohibited Conduct">
            <p>You agree NOT to:</p>
            <ul className="list-none space-y-2 mt-3">
              {[
                "Engage in or promote any illegal activity",
                "Record, screenshot, or distribute video/audio of other users without their consent",
                "Harass, threaten, bully, or intimidate other users",
                "Engage in sexual exploitation, nudity-related violations, or any form of abuse",
                "Impersonate another person or misrepresent your identity or age",
                "Attempt to hack, disrupt, or overload the Service or its infrastructure",
                "Use bots, scripts, scrapers, or automated tools to interact with the Service",
                "Distribute spam, advertisements, or commercial solicitations",
                "Violate any applicable local, state, national, or international law",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-[9px] shrink-0" /><span>{item}</span></li>
              ))}
            </ul>
          </Section>

          <Section title="5. Enforcement and Banning">
            <p>We operate a zero-tolerance policy for serious violations. We reserve the right to:</p>
            <ul className="list-none space-y-2 mt-3">
              {[
                "Immediately terminate access to the Service for any user",
                "Report illegal activity to law enforcement authorities",
                "Cooperate with legal processes as required by law",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-[9px] shrink-0" /><span>{item}</span></li>
              ))}
            </ul>
            <p className="mt-3">Since we do not store user data, bans are implemented via IP-level network restrictions when technically feasible.</p>
          </Section>

          <Section title="6. User Responsibilities">
            <p>You are solely responsible for your conduct during video chats. Chatly is not responsible for:</p>
            <ul className="list-none space-y-2 mt-3">
              {[
                "The actions, words, or behavior of other users",
                "Any harm, distress, or offense experienced during a chat session",
                "Any content shared or displayed by other users during a session",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-[9px] shrink-0" /><span>{item}</span></li>
              ))}
            </ul>
            <p className="mt-3">You can leave any conversation at any time by clicking "Next" or "End."</p>
          </Section>

          <Section title="7. Intellectual Property">
            <p>Chatly and its underlying code are open-source software. You may view, modify, and distribute the code in accordance with its license. The Chatly name, logo, and branding are intellectual property of the project maintainers.</p>
          </Section>

          <Section title="8. Privacy">
            <p>Your use of Chatly is also governed by our <strong>Privacy Policy</strong>, which describes our commitment to anonymity, zero data collection, and peer-to-peer encrypted communication. By using Chatly, you also agree to the Privacy Policy.</p>
          </Section>

          <Section title="9. Disclaimer of Warranties">
            <p><strong>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.</strong></p>
            <p className="mt-3">We do not warrant that:</p>
            <ul className="list-none space-y-2 mt-3">
              {[
                "The Service will be uninterrupted, timely, secure, or error-free",
                "The Service will meet your expectations or requirements",
                "The results obtained from using the Service will be accurate or reliable",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-[9px] shrink-0" /><span>{item}</span></li>
              ))}
            </ul>
          </Section>

          <Section title="10. Limitation of Liability">
            <p>To the fullest extent permitted by applicable law, in no event shall Chatly, its maintainers, or contributors be liable for any indirect, incidental, special, consequential, or punitive damages arising from or relating to your use of the Service.</p>
          </Section>

          <Section title="11. Indemnification">
            <p>You agree to indemnify, defend, and hold harmless Chatly and its maintainers from any claims, damages, or expenses arising from your use of the Service or violation of these Terms.</p>
          </Section>

          <Section title="12. Governing Law">
            <p>These Terms are governed by and construed in accordance with applicable international laws. Any disputes shall be resolved through good-faith negotiation first.</p>
          </Section>

          <Section title="13. Severability">
            <p>If any provision of these Terms is found to be unenforceable, the remaining provisions shall continue in full force and effect.</p>
          </Section>

          <Section title="14. Contact">
            <p>Questions about these Terms? Contact us:</p>
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

function SummaryCard({ icon: Icon, title, desc }) {
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
