import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import queueManager from "./utils/queueManager.js";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    service: "random-video-chat-server",
    online: queueManager.getOnlineCount(),
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  pingTimeout: 60000,
  pingInterval: 25000,
});

function broadcastOnline() {
  io.emit("online-users", queueManager.getOnlineCount());
}

function emitMatch(match) {
  if (!match) return false;
  const userA = queueManager.getUser(match.a);
  const userB = queueManager.getUser(match.b);
  if (!userA || !userB) return false;

  io.to(match.a).emit("match-found", {
    partnerId: match.b,
    partnerUsername: userB.username,
    initiator: true,
  });
  io.to(match.b).emit("match-found", {
    partnerId: match.a,
    partnerUsername: userA.username,
    initiator: false,
  });
  console.log(`[MATCH] ${userA.username} <-> ${userB.username}`);
  return true;
}

function matchQueuedUsers() {
  let matched = false;
  let match = queueManager.tryMatch();
  while (match) {
    matched = emitMatch(match) || matched;
    match = queueManager.tryMatch();
  }
  return matched;
}

setInterval(broadcastOnline, 3000);

io.on("connection", (socket) => {
  console.log(`[+] User connected: ${socket.id}`);

  broadcastOnline();

  socket.on("join-queue", ({ username }) => {
    if (!username || typeof username !== "string") return;
    const cleanUsername = username.trim().slice(0, 20);
    if (!cleanUsername) return;

    const existingUser = queueManager.getUser(socket.id);
    if (existingUser?.status === "connected") return;

    socket.data.username = cleanUsername;
    const match = existingUser
      ? queueManager.requeueUser(socket.id)
      : queueManager.addToQueue(socket.id, { username: cleanUsername });

    socket.emit("queue-joined", { status: "searching" });
    console.log(`[Q] ${cleanUsername} joined. Queue size: ${queueManager.queue.length}`);
    emitMatch(match);
    matchQueuedUsers();
    broadcastOnline();
  });

  socket.on("cancel-queue", () => {
    queueManager.removeUser(socket.id);
    socket.emit("queue-cancelled");
    broadcastOnline();
  });

  socket.on("signal", ({ to, signal }) => {
    if (!to || !signal) return;
    io.to(to).emit("signal", { from: socket.id, signal });
  });

  socket.on("send-message", ({ to, message }) => {
    if (!to || !message) return;
    const fromUser = queueManager.getUser(socket.id);
    if (!fromUser) return;
    io.to(to).emit("receive-message", {
      from: socket.id,
      fromUsername: fromUser.username,
      message: String(message).slice(0, 500),
      timestamp: Date.now(),
    });
  });

  socket.on("next-user", () => {
    const partnerId = queueManager.getPartner(socket.id);
    if (partnerId) {
      io.to(partnerId).emit("partner-disconnected", { reason: "next" });
      io.to(partnerId).emit("queue-joined", { status: "searching" });
    }
    queueManager.breakPair(socket.id, { requeueSelf: true, requeuePartner: true });
    socket.emit("queue-joined", { status: "searching" });
    matchQueuedUsers();
    broadcastOnline();
  });

  socket.on("end-chat", () => {
    const partnerId = queueManager.getPartner(socket.id);
    if (partnerId) {
      io.to(partnerId).emit("partner-disconnected", { reason: "end" });
      io.to(partnerId).emit("queue-joined", { status: "searching" });
    }
    queueManager.removeUser(socket.id);
    socket.emit("chat-ended");
    matchQueuedUsers();
    broadcastOnline();
  });

  socket.on("disconnect", (reason) => {
    console.log(`[-] User disconnected: ${socket.id} (${reason})`);
    const partnerId = queueManager.getPartner(socket.id);
    if (partnerId) {
      io.to(partnerId).emit("partner-disconnected", { reason: "disconnect" });
      io.to(partnerId).emit("queue-joined", { status: "searching" });
    }
    queueManager.removeUser(socket.id);
    matchQueuedUsers();
    broadcastOnline();
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Socket.IO ready");
});
