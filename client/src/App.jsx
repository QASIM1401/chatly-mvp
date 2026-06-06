import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Landing from "./components/Landing.jsx";
import Chat from "./components/Chat.jsx";
import PrivacyPolicy from "./components/PrivacyPolicy.jsx";
import TermsOfService from "./components/TermsOfService.jsx";
import { useTheme } from "./hooks/useTheme.js";
import { useSocket } from "./hooks/useSocket.js";
import { useWebRTC } from "./hooks/useWebRTC.js";
import { getSocket, disconnectSocket } from "./utils/socket.js";
import { getOrCreateUsername } from "./utils/usernameGenerator.js";

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { onlineCount, connected } = useSocket();

  const [username, setUsername] = useState(() => getOrCreateUsername());
  const [view, setView] = useState("landing");
  const [searching, setSearching] = useState(false);
  const [partnerUsername, setPartnerUsername] = useState(null);
  const [messages, setMessages] = useState([]);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);

  const handlePartnerDisconnected = useCallback(() => {
    setPartnerUsername(null);
    setMessages([]);
  }, []);

  const {
    localStream, remoteStream, connectionState,
    requestMedia, nextPartner, endChat, toggleVideo, toggleAudio, sendMessage,
  } = useWebRTC(handlePartnerDisconnected);

  useEffect(() => {
    const socket = getSocket();
    const onMatchFound = ({ partnerUsername: pu }) => {
      setPartnerUsername(pu);
      setSearching(false);
      setMessages([]);
      setView("chat");
    };
    const onReceiveMessage = (msg) => {
      setMessages((prev) => prev.length > 200 ? [...prev.slice(-150), msg] : [...prev, msg]);
    };
    const onQueueJoined = () => setSearching(true);
    const onChatEnded = () => {
      setView("landing");
      setPartnerUsername(null);
      setMessages([]);
      setSearching(false);
    };
    const onPartnerDisc = () => {
      setPartnerUsername(null);
      setMessages([]);
    };

    socket.on("match-found", onMatchFound);
    socket.on("receive-message", onReceiveMessage);
    socket.on("queue-joined", onQueueJoined);
    socket.on("chat-ended", onChatEnded);
    socket.on("partner-disconnected", onPartnerDisc);

    return () => {
      socket.off("match-found", onMatchFound);
      socket.off("receive-message", onReceiveMessage);
      socket.off("queue-joined", onQueueJoined);
      socket.off("chat-ended", onChatEnded);
      socket.off("partner-disconnected", onPartnerDisc);
    };
  }, []);

  useEffect(() => {
    setVideoEnabled(localStream?.getVideoTracks()[0]?.enabled ?? true);
    setAudioEnabled(localStream?.getAudioTracks()[0]?.enabled ?? true);
  }, [localStream]);

  const handleStart = useCallback(async (name) => {
    setUsername(name);
    if (!localStream) {
      await requestMedia();
    }
    const socket = getSocket();
    socket.emit("join-queue", { username: name });
    setSearching(true);
    setView("chat");
  }, [localStream, requestMedia]);

  const handleCancelSearch = useCallback(() => {
    const socket = getSocket();
    socket.emit("cancel-queue");
    setSearching(false);
  }, []);

  const handleNext = useCallback(() => {
    nextPartner();
    setMessages([]);
    setPartnerUsername(null);
    setSearching(true);
    const socket = getSocket();
    socket.emit("join-queue", { username });
  }, [nextPartner, username]);

  const handleEnd = useCallback(() => {
    endChat();
    setView("landing");
    setPartnerUsername(null);
    setMessages([]);
    setSearching(false);
  }, [endChat]);

  const handleSendMessage = useCallback((text) => {
    const msg = {
      from: "self",
      fromUsername: username,
      message: text,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, msg]);
    sendMessage(text);
  }, [username, sendMessage]);

  const handleToggleVideo = useCallback(() => setVideoEnabled(toggleVideo()), [toggleVideo]);
  const handleToggleAudio = useCallback(() => setAudioEnabled(toggleAudio()), [toggleAudio]);

  const handleNavigate = useCallback((target) => {
    window.scrollTo(0, 0);
    setView(target);
  }, []);

  useEffect(() => () => disconnectSocket(), []);

  const resolvedState = searching && connectionState !== "connecting" && connectionState !== "connected"
    ? "searching" : connectionState;

  return (
    <AnimatePresence mode="wait">
      {view === "privacy" && (
        <motion.div key="privacy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}>
          <PrivacyPolicy onBack={() => handleNavigate("landing")} />
        </motion.div>
      )}

      {view === "terms" && (
        <motion.div key="terms" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}>
          <TermsOfService onBack={() => handleNavigate("landing")} />
        </motion.div>
      )}

      {view === "landing" && (
        <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
          <Landing
            username={username}
            onStart={handleStart}
            onlineCount={onlineCount}
            connected={connected}
            theme={theme}
            toggleTheme={toggleTheme}
            onNavigate={handleNavigate}
          />
        </motion.div>
      )}

      {view === "chat" && (
        <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
          <Chat
            username={username}
            connectionState={resolvedState}
            localStream={localStream}
            remoteStream={remoteStream}
            videoEnabled={videoEnabled}
            audioEnabled={audioEnabled}
            partnerUsername={partnerUsername}
            messages={messages}
            onlineCount={onlineCount}
            connected={connected}
            onSendMessage={handleSendMessage}
            onNext={handleNext}
            onEnd={handleEnd}
            onToggleVideo={handleToggleVideo}
            onToggleAudio={handleToggleAudio}
            onCancelSearch={handleCancelSearch}
            searching={searching}
            theme={theme}
            toggleTheme={toggleTheme}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
