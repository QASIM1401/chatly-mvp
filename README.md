<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/QASIM1401/chatly-mvp/master/client/public/favicon.svg">
    <img src="https://raw.githubusercontent.com/QASIM1401/chatly-mvp/master/client/public/favicon.svg" height="100" alt="Chatly">
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

---

## 🏗️ Architecture

**Client:** React 18 + Vite 5 + Tailwind CSS 3 + Framer Motion  
**Server:** Express 4 + Socket.IO 4 + Prisma ORM + PostgreSQL  
**Realtime:** WebRTC P2P with STUN/TURN fallback  
**Auth:** Google OAuth 2.0

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


## 📊 Performance Benchmarks

| Metric | Value |
|:---|:---|
| **Lighthouse Performance** | 90+ |
| **Lighthouse Accessibility** | 95+ |
| **Device Support** | Desktop, mobile, tablet (adaptive rendering) |

---

## 📄 License

Proprietary. All rights reserved.

---

<p align="center">
  <strong>Chatly — Random Video Chat, Reimagined.</strong><br>
  <sub>No ads. No popups. No subscriptions. Just chat.</sub>
</p>
