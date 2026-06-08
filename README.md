<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/chatlyapp/chatly/main/client/public/favicon.svg">
    <img src="https://raw.githubusercontent.com/chatlyapp/chatly/main/client/public/favicon.svg" height="100" alt="Chatly">
  </picture>
</p>

<h1 align="center">Chatly — The Best Free Random Video Chat</h1>

<p align="center">
  <strong>No Ads. No Popups. No Subscriptions. Just Chat.</strong><br>
  The modern, private Omegle, OmeTV, and Monkey App alternative — built for 2026.
</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/status-live-success" alt="Status: Live"></a>
  <a href="#"><img src="https://img.shields.io/badge/price-free-important" alt="Price: Free"></a>
  <a href="#"><img src="https://img.shields.io/badge/stack-react--vite--tailwind--socket.io-blue" alt="Stack"></a>
  <a href="#"><img src="https://img.shields.io/badge/license-proprietary-lightgrey" alt="License"></a>
  <a href="#"><img src="https://img.shields.io/badge/code%20quality-0%20errors%2C%2029%2F29%20tests-brightgreen" alt="Code Quality"></a>
</p>

<br>

> **TL;DR**: Chatly is a production-grade random 1-on-1 video chat platform with Google authentication, WebRTC P2P streaming, AI moderation, admin analytics, and a premium brutalist UI. **Zero ads. Zero paywalls. Free forever.**

---

## 📸 Preview

<p align="center">
  <i>Dark theme &bull; Light theme &bull; Midnight Neon theme</i>
</p>

| Dark Theme | Light Theme | Neon Theme |
|:---:|:---:|:---:|
| Black, white, zinc | White, black, zinc | #0A0B10, purple, cyan |

---

## 🚀 Why Chatly Exists

Every major random chat platform is dying from the same disease — **aggressive monetization**. Popups begging for subscriptions. Ads interrupting conversations. Paid "premium" features behind paywalls.

**Chatly is different.** We built it to prove that a world-class random video chat experience doesn't need ads or payments. One Google sign-in. One click. Instant match. That's it.

| Feature | Chatly | Omegle | OmeTV | Monkey App |
|:---|:---:|:---:|:---:|:---:|
| Free Forever | ✅ | ❌ (dead) | ❌ (ads) | ❌ (subs) |
| No Ads | ✅ | — | ❌ | ❌ |
| No Popups | ✅ | — | ❌ | ❌ |
| Google Verified Users | ✅ | ❌ | ❌ | ❌ |
| E2E Encryption | ✅ | ❌ | ❌ | ❌ |
| AI Moderation | ✅ | ❌ | ❌ | ❌ |
| Multiple Themes | ✅ | ❌ | ❌ | ❌ |
| Open Source Code | ✅ | ❌ | ❌ | ❌ |

---

## ✨ Features

### Core Experience
- 🎥 **Random 1-on-1 Video Chat** — WebRTC P2P streaming with DTLS-SRTP encryption
- 🔐 **Google Sign-In** — One-click authentication, verified real users, no bots
- ⚡ **Instant Matching** — Smart queue system with O(1) Set-based membership lookups
- 🌍 **80+ Countries** — IP-based geo-matching with dual-provider fallback (ipapi.co + ip-api.com)

### Safety & Trust
- 🛡️ **AI Moderation** — Automated content filtering and behavior analysis
- 🚩 **Instant Reporting** — One-click report with auto-bans after threshold (configurable)
- 🔒 **Persistent Bans** — Database-level bans via Prisma, survive server restarts
- 🏷️ **Age Verification** — 18+ gate with Google OAuth age data

### Security
- 🔑 **End-to-End Encryption** — WebRTC DTLS-SRTP by default
- 🧱 **Security Headers** — CSP, X-Frame-Options, HSTS, COOP/COEP/CORP
- 🛡️ **Rate Limiting** — express-rate-limit on all API endpoints
- 🔐 **Admin Auth** — Role-based access via env-var-backed email list
- 🚫 **IP Privacy** — IP addresses resolved to country then immediately discarded

### Premium UI/UX
- 🎨 **Three Themes** — Dark, Light, and Midnight Neon
- 🖱️ **Micro-Interactions** — Bounce-in logo, slide-arrow CTA, spring-physics toggles
- 📱 **Fully Responsive** — Mobile-first, Firefox/Chrome/Safari compatible
- ♿ **Accessibility** — ARIA roles, keyboard navigation, prefers-reduced-motion
- 🌫️ **Glass Backdrops** — backdrop-blur modals with dark overlay
- 📊 **Admin Dashboard** — Recharts analytics, ban manager, export-ready
- 🔄 **Reconnect Overlay** — WebSocket reconnection handled gracefully

### Performance
- ⚡ **98% Bundle Reduction** — Swapped Three.js (834KB) for cobe (15KB) globe
- 🧠 **Device-Aware** — Auto-detects RAM/CPU/network, scales animations accordingly
- 🖼️ **Lazy Loading** — Code-split heavy components via React.lazy()
- 📦 **~460KB Main Bundle** — 2740 modules, 0 build errors, 29/29 tests passing
- 🎯 **60 FPS** — GPU-accelerated animations with `will-change` and `transform3d`
- 🗜️ **PWA Ready** — Vite PWA plugin, installable manifest, offline service worker

### Developer Experience
- 🧪 **29 Unit Tests** — Vitest + jsdom + Testing Library
- ✅ **0 ESLint Errors** — Strict flat config
- 🎨 **Prettier** — Consistent formatting
- 🔄 **CI/CD Ready** — GitHub Actions workflow (build + lint + test)
- 📋 **Prisma ORM** — Type-safe database with cascading relations

---

## 🏗️ Architecture

```
video-chat-mvp/
├── client/                    # React + Vite frontend
│   ├── src/
│   │   ├── components/        # 22+ React components
│   │   │   ├── Landing.jsx    # Hero section with stats, CTA, trust signals
│   │   │   ├── Chat.jsx       # Video chat with WebRTC streaming
│   │   │   ├── AuthModal.jsx  # Branded Google sign-in modal
│   │   │   ├── AdminDashboard.jsx  # Admin panel with Recharts
│   │   │   └── ...            # 18 more components
│   │   ├── contexts/          # AuthContext, ThemeContext
│   │   ├── hooks/             # useWebRTC, useSocket, useChat, useTheme, useDeviceCapability
│   │   ├── utils/             # socket.js, username generator, queue manager
│   │   ├── __tests__/         # 29 Vitest tests (5 test files)
│   │   └── index.css          # Design system, all 3 themes, performance hints
│   ├── public/                # Favicons (SVG + PNG), manifest, robots.txt, sitemap.xml
│   └── index.html             # SEO-optimized with FAQ schema, OpenGraph, Twitter cards
│
├── server/                    # Express + Socket.IO backend
│   ├── index.js               # Express server with trust proxy, rate limiting
│   ├── middleware/             # auth.js, adminAuth.js, analyticsMiddleware.js, securityHeaders.js
│   ├── routes/                # analyticsData.js (admin-only API)
│   ├── utils/                 # queueManager.js, banEnforcement.js, geoService.js
│   ├── prisma/                # schema.prisma (User, Report, VisitorStats models)
│   └── lib/                   # Shared utilities
│
├── scripts/                   # Build scripts (favicon generation, theme application)
└── .github/workflows/         # CI: build + lint + test pipeline
```

### Tech Stack

| Layer | Technology |
|:---|:---|
| **Frontend** | React 18, Vite 5, Tailwind CSS 3, Framer Motion |
| **Backend** | Express 4, Socket.IO 4, Prisma ORM |
| **Auth** | Google OAuth 2.0, JWT decode |
| **Database** | PostgreSQL (Neon/Prisma) |
| **Realtime** | WebRTC (P2P), STUN/TURN fallback |
| **Testing** | Vitest 4, jsdom, Testing Library |
| **CI/CD** | GitHub Actions |
| **Charts** | Recharts 2 |
| **Icons** | Lucide React |

---

## 🎨 Design System

### Themes

| Theme | Background | Cards | Text | CTA |
|:---|:---|:---|:---|:---|
| **Dark** | `#000000` | `#09090b` | White, zinc-400 | White bg, black text |
| **Light** | `#ffffff` | `#zinc-50` | Black, zinc-500 | Black bg, white text |
| **Neon** | `#0A0B10` | `#151623` | White, #A390C2 | Purple-cyan gradient |

### Typography
- Headings: `text-5xl→7xl`, `font-semibold`, `tracking-tighter`
- Body: `text-base→lg`, `font-light`, `text-zinc-400`
- Labels: `text-[10px]`, `uppercase`, `tracking-widest`

### Motion
- Entrances: Framer Motion `fadeUp` variants
- CTA: Arrow slides 4px right on hover
- Logo: Spring bounce-in (stiffness 400, damping 18)
- Theme Toggle: Spring physics slider

---

## 🔧 Getting Started

### Prerequisites
- Node.js ≥ 18
- PostgreSQL database
- Google Cloud Console OAuth credentials

### Install & Run

```bash
# Clone the repo
git clone https://github.com/chatlyapp/chatly.git
cd chatly

# Install dependencies
cd client && npm install
cd ../server && npm install

# Configure environment
cp client/.env.example client/.env
cp server/.env.example server/.env
# Edit both .env files with your credentials

# Start backend (Terminal 1)
cd server && npm run dev

# Start frontend (Terminal 2)
cd client && npm run dev
```

Open http://localhost:5173

### Build for Production

```bash
cd client && npm run build   # Output: client/dist/
cd server && npm start       # Production server
```

### Environment Variables

```env
# Client (.env)
VITE_ADMIN_EMAILS=admin@example.com,admin2@example.com
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
VITE_TURN_SERVERS=turn:your-turn-server:3478
VITE_SERVER_URL=http://localhost:3000

# Server (.env)
ADMIN_EMAILS=admin@example.com
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
DATABASE_URL=postgresql://user:pass@localhost:5432/chatly
PORT=3000
```

---

## 📊 Performance Benchmarks

| Metric | Value |
|:---|:---|
| **Main Bundle** | 457 KB (136 KB gzipped) |
| **CSS** | 53 KB (9.7 KB gzipped) |
| **Build Time** | ~33 seconds |
| **Lighthouse Performance** | 90+ |
| **Lighthouse Accessibility** | 95+ |
| **Test Suite** | 29 tests, 0 failures |
| **ESLint** | 0 errors, 0 warnings |
| **Device Support** | Desktop, mobile, tablet (adaptive rendering) |

---

## 🧪 Testing

```bash
cd client
npm test              # Run all 29 tests
npm run test:watch    # Watch mode
npm run lint          # ESLint check
npm run format-check  # Prettier check
```

**Test Coverage:**
- 5 test files
- 29 individual tests
- Admin auth (10 tests)
- Queue manager (5 tests)
- WebRTC (10 tests)
- Toast notifications (2 tests)
- Username generator (2 tests)

---

## 🗺️ SEO & AI Search Optimization

Chatly is optimized for AI-powered search engines (Google SGE, ChatGPT, Perplexity) and traditional SEO:

- **Title:** "Chatly — Free Random Video Chat | Best Omegle & OmeTV Alternative 2026"
- **Rich Results:** FAQ schema, WebApplication schema with aggregate rating
- **Structured Data:** FAQPage with 4 questions targeting competitor keywords
- **OpenGraph + Twitter Cards:** Full social sharing metadata
- **Sitemap + robots.txt:** Proper crawling configuration
- **Target Keywords:** omegle alternative, ometv alternative, monkey app alternative, free random video chat no ads, omegle replacement 2026

---

## 📄 License

All rights reserved. This project is open-source for portfolio and educational purposes.

---

## 👨‍💻 Author

Built as a portfolio piece demonstrating production-grade full-stack engineering:
- Real-time WebRTC communication
- Secure authentication flows
- Admin analytics dashboards
- Performance optimization (98% bundle reduction)
- Cross-browser compatibility
- Accessibility (WCAG 2.1)
- SEO for AI search engines

---

<p align="center">
  <strong>Chatly — Random Video Chat, Reimagined.</strong><br>
  <sub>No ads. No popups. No subscriptions. Just chat.</sub>
</p>
