# Chatly — Random Video Chat MVP

A modern, production-ready random 1-on-1 video chat web app inspired by Monkey / OmeTV, with WebRTC peer-to-peer video, real-time text chat, glassmorphism UI, dark/light mode, and crypto donation monetization.

## ✨ Features

- 🎲 **Instant random matching** (FIFO queue)
- 📹 **WebRTC peer-to-peer video** (low latency, server only relays signaling)
- 💬 **Real-time text chat** during video call
- 🆔 **Guest usernames** (auto-generated: `Tiger123`, `SkyFox88`, etc.) — no login
- ⏱️ **Live match timer**
- 👥 **Online users counter**
- 🟢 **Connection status** (Searching / Connected / Disconnected)
- 🌗 **Dark + light mode** with smooth animation (saved in localStorage)
- 💎 **Crypto donations** (BTC / USDT TRC20 / USDT ERC20 / Binance Pay) with QR codes
- 🎨 **Modern UI** — glassmorphism, gradient accents, Framer Motion animations
- 📱 **Mobile-first responsive**

## 🧰 Tech Stack

**Frontend:** React (Vite) · Tailwind CSS · Framer Motion · Socket.IO Client · WebRTC
**Backend:** Node.js · Express · Socket.IO

No database. In-memory queue. Perfect for MVP / demo / portfolio.

---

## 📁 Folder Structure

```
video-chat-mvp/
├── server/
│   ├── package.json
│   ├── index.js                 # Express + Socket.IO server
│   └── utils/
│       └── queueManager.js      # FIFO matching engine
├── client/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── index.html
│   ├── .env.example
│   ├── public/
│   │   └── favicon.svg
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── components/
│       │   ├── Landing.jsx
│       │   ├── Chat.jsx
│       │   ├── VideoPlayer.jsx
│       │   ├── ControlBar.jsx
│       │   ├── TextChat.jsx
│       │   ├── StatusBadge.jsx
│       │   ├── MatchTimer.jsx
│       │   ├── OnlineCounter.jsx
│       │   ├── ThemeToggle.jsx
│       │   └── DonationPanel.jsx
│       ├── hooks/
│       │   ├── useTheme.js
│       │   ├── useSocket.js
│       │   └── useWebRTC.js
│       └── utils/
│           ├── socket.js
│           └── usernameGenerator.js
└── README.md
```

---

## 🚀 Installation

You'll need **Node.js 18+** installed.

### 1. Backend setup

```bash
cd server
npm install
```

### 2. Frontend setup

```bash
cd client
npm install
cp .env.example .env
```

The default `.env` points to `http://localhost:5000` for the backend. Change it when deploying.

---

## 💻 Local Run Guide

Open **two terminals**.

### Terminal 1 — backend
```bash
cd server
npm run dev          # uses nodemon, auto-restarts on changes
# or: npm start
```
Server starts on `http://localhost:5000`.

### Terminal 2 — frontend
```bash
cd client
npm run dev
```
Client starts on `http://localhost:5173`.

Open `http://localhost:5173` in **two browser windows** (or two devices) to test video matching. Click **Start Chatting** in both — they should match in a few seconds.

> ⚠️ Camera/microphone access requires either `localhost` or **HTTPS**. Localhost works out of the box on Chrome/Edge/Firefox/Safari.

---

## 🌐 Deployment Guide

### Backend → Render (free tier)

1. Push the repo to GitHub.
2. Go to [render.com](https://render.com) → **New → Web Service**.
3. Connect your repo. Settings:
   - **Root directory:** `server`
   - **Build command:** `npm install`
   - **Start command:** `npm start`
   - **Environment:** Node
4. Add environment variable (optional): `PORT` = `10000` (Render sets it automatically).
5. Click **Create Web Service**. Copy the URL (e.g. `https://chatly-server.onrender.com`).

> Note: free Render instances sleep after inactivity — the first connection may take ~30s to wake up.

### Frontend → Vercel (free tier)

1. Go to [vercel.com](https://vercel.com) → **New Project**.
2. Import the same repo. Settings:
   - **Root directory:** `client`
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
3. Add environment variable:
   - `VITE_SERVER_URL` = `https://chatly-server.onrender.com` (your Render URL)
4. **Deploy**. Your app is live at `https://chatly-xxx.vercel.app`.

For production, **replace the placeholder crypto addresses** in `client/src/components/DonationPanel.jsx` with your real wallet addresses.

---

## 🧠 How It Works

### Matching flow
1. User clicks **Start Chatting** → browser requests camera/mic permission.
2. Socket emits `join-queue` with the guest username.
3. Server adds the user to a FIFO queue. As soon as a second user joins, the server pairs them, removes them from the queue, and emits `match-found` to **both** sides (one is `initiator: true`, the other `initiator: false`).
4. The initiator creates a WebRTC offer → sends via Socket.IO `signal` event → answer + ICE candidates follow.
5. After ICE handshake, peer-to-peer video is established.
6. Clicking **Next** → current peer is notified (`partner-disconnected`), both users go back to the queue (or stay alone if no one is searching — server re-matches them as soon as possible).

### WebRTC signaling
The backend only relays SDP offers/answers and ICE candidates. Media never touches the server — it's truly peer-to-peer.

### Text chat
Socket.IO message events fire alongside the video call. Messages are stored only in the client's memory.

### Guest names
A pool of adjectives + nouns + 2-digit number generates names like `SwiftFalcon42`. The chosen name is saved in `localStorage` so it persists across sessions.

---

## 🎨 Customization

| What | Where |
|---|---|
| Crypto addresses | `client/src/components/DonationPanel.jsx` |
| Username word lists | `client/src/utils/usernameGenerator.js` |
| App name + colors | `client/src/components/Landing.jsx`, `client/tailwind.config.js` |
| ICE servers | `client/src/hooks/useWebRTC.js` |
| Landing copy | `client/src/components/Landing.jsx` |

---

## 🛡️ Production Notes (Post-MVP)

This MVP is intentionally minimal. Before going public, consider adding:

- **TURN servers** (e.g. Twilio, Metered, or self-hosted coturn) — STUN alone fails on ~15% of networks.
- **Moderation**: profanity filter, image hash matching, user reporting, admin panel.
- **Rate limiting** to prevent abuse.
- **HTTPS** (Vercel provides it automatically).
- **Region-based matching** for better latency.
- **Interests / filters** (e.g. language, country, gender).
- **Persistent logging** (replace in-memory with Redis/Postgres).

---

## 📜 License

MIT — use it however you want. A small credit / donation is appreciated but not required. 💎

---

Built with ❤️ as a portfolio-grade MVP. Have fun!
