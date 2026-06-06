import { useEffect, useRef, useState, useCallback } from "react";
import { getSocket } from "../utils/socket.js";

const ICE_SERVERS = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
    { urls: "stun:stun3.l.google.com:19302" },
    { urls: "stun:stun4.l.google.com:19302" },
  ],
};

export function useWebRTC(onPartnerDisconnected) {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [connectionState, setConnectionState] = useState("idle");
  const [error, setError] = useState(null);
  const [hasMediaPermission, setHasMediaPermission] = useState(false);

  const peerConnectionRef = useRef(null);
  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);
  const partnerIdRef = useRef(null);
  const isInitiatorRef = useRef(false);
  const pendingCandidatesRef = useRef([]);
  const socketRef = useRef(null);

  const cleanupPeer = useCallback(() => {
    if (peerConnectionRef.current) {
      try {
        peerConnectionRef.current.ontrack = null;
        peerConnectionRef.current.onicecandidate = null;
        peerConnectionRef.current.onconnectionstatechange = null;
        peerConnectionRef.current.close();
      } catch (e) {
        // ignore
      }
      peerConnectionRef.current = null;
    }
    remoteStreamRef.current = null;
    pendingCandidatesRef.current = [];
    setRemoteStream(null);
    setConnectionState("disconnected");
  }, []);

  const stopLocalStream = useCallback(() => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
      setLocalStream(null);
    }
  }, []);

  const requestMedia = useCallback(async () => {
    try {
      setError(null);
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error(
          "Camera and microphone require HTTPS, or use http://localhost while testing locally."
        );
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: "user" },
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      });
      localStreamRef.current = stream;
      setLocalStream(stream);
      setHasMediaPermission(true);
      return stream;
    } catch (err) {
      console.error("Media error:", err);
      setError(err.message || "Failed to access camera/microphone");
      setHasMediaPermission(false);
      throw err;
    }
  }, []);

  const createPeerConnection = useCallback(() => {
    const pc = new RTCPeerConnection(ICE_SERVERS);

    pc.onicecandidate = (event) => {
      if (event.candidate && partnerIdRef.current && socketRef.current) {
        socketRef.current.emit("signal", {
          to: partnerIdRef.current,
          signal: { type: "ice-candidate", candidate: event.candidate },
        });
      }
    };

    pc.ontrack = (event) => {
      const [stream] = event.streams;
      remoteStreamRef.current = stream;
      setRemoteStream(stream);
    };

    pc.onconnectionstatechange = () => {
      console.log("PC state:", pc.connectionState);
      if (pc.connectionState === "connected") {
        setConnectionState("connected");
      } else if (pc.connectionState === "connecting") {
        setConnectionState("connecting");
      } else if (pc.connectionState === "failed" || pc.connectionState === "disconnected") {
        setConnectionState("disconnected");
      }
    };

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => {
        pc.addTrack(track, localStreamRef.current);
      });
    }

    peerConnectionRef.current = pc;
    return pc;
  }, []);

  const processPendingCandidates = useCallback(async () => {
    if (!peerConnectionRef.current || !peerConnectionRef.current.remoteDescription) return;
    for (const candidate of pendingCandidatesRef.current) {
      try {
        await peerConnectionRef.current.addIceCandidate(candidate);
      } catch (e) {
        console.error("Error adding ICE candidate:", e);
      }
    }
    pendingCandidatesRef.current = [];
  }, []);

  const handleSignal = useCallback(
    async ({ from, signal }) => {
      if (from !== partnerIdRef.current) return;
      if (!peerConnectionRef.current) return;
      try {
        if (signal.type === "offer") {
          await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(signal));
          await processPendingCandidates();
          const answer = await peerConnectionRef.current.createAnswer();
          await peerConnectionRef.current.setLocalDescription(answer);
          socketRef.current.emit("signal", {
            to: from,
            signal: { type: "answer", sdp: answer.sdp },
          });
        } else if (signal.type === "answer") {
          await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(signal));
          await processPendingCandidates();
        } else if (signal.type === "ice-candidate" && signal.candidate) {
          if (peerConnectionRef.current.remoteDescription) {
            await peerConnectionRef.current.addIceCandidate(signal.candidate);
          } else {
            pendingCandidatesRef.current.push(signal.candidate);
          }
        }
      } catch (e) {
        console.error("Signal handling error:", e);
      }
    },
    [processPendingCandidates]
  );

  const startCall = useCallback(async () => {
    if (!partnerIdRef.current) return;
    const pc = createPeerConnection();
    try {
      const offer = await pc.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: true });
      await pc.setLocalDescription(offer);
      socketRef.current.emit("signal", {
        to: partnerIdRef.current,
        signal: { type: "offer", sdp: offer.sdp },
      });
      setConnectionState("connecting");
    } catch (e) {
      console.error("Start call error:", e);
    }
  }, [createPeerConnection]);

  const handleMatchFound = useCallback(
    async ({ partnerId, partnerUsername, initiator }) => {
      partnerIdRef.current = partnerId;
      isInitiatorRef.current = initiator;
      cleanupPeer();
      pendingCandidatesRef.current = [];
      if (initiator) {
        await startCall();
      } else {
        createPeerConnection();
        setConnectionState("connecting");
      }
    },
    [cleanupPeer, startCall, createPeerConnection]
  );

  const handlePartnerDisconnected = useCallback(() => {
    cleanupPeer();
    partnerIdRef.current = null;
    pendingCandidatesRef.current = [];
    if (onPartnerDisconnected) onPartnerDisconnected();
  }, [cleanupPeer, onPartnerDisconnected]);

  const setupSocketListeners = useCallback(() => {
    const socket = getSocket();
    socketRef.current = socket;
    socket.on("match-found", handleMatchFound);
    socket.on("signal", handleSignal);
    socket.on("partner-disconnected", handlePartnerDisconnected);
  }, [handleMatchFound, handleSignal, handlePartnerDisconnected]);

  useEffect(() => {
    setupSocketListeners();
    return () => {
      const socket = socketRef.current;
      if (socket) {
        socket.off("match-found", handleMatchFound);
        socket.off("signal", handleSignal);
        socket.off("partner-disconnected", handlePartnerDisconnected);
      }
    };
  }, [setupSocketListeners, handleMatchFound, handleSignal, handlePartnerDisconnected]);

  const toggleVideo = useCallback(() => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        return videoTrack.enabled;
      }
    }
    return false;
  }, []);

  const toggleAudio = useCallback(() => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        return audioTrack.enabled;
      }
    }
    return false;
  }, []);

  const nextPartner = useCallback(() => {
    cleanupPeer();
    partnerIdRef.current = null;
    pendingCandidatesRef.current = [];
    const socket = socketRef.current;
    if (socket) socket.emit("next-user");
  }, [cleanupPeer]);

  const endChat = useCallback(() => {
    cleanupPeer();
    partnerIdRef.current = null;
    pendingCandidatesRef.current = [];
    const socket = socketRef.current;
    if (socket) socket.emit("end-chat");
    stopLocalStream();
  }, [cleanupPeer, stopLocalStream]);

  const sendMessage = useCallback((message) => {
    const socket = socketRef.current;
    if (socket && partnerIdRef.current && message.trim()) {
      socket.emit("send-message", { to: partnerIdRef.current, message: message.trim() });
    }
  }, []);

  useEffect(() => {
    return () => {
      stopLocalStream();
      cleanupPeer();
    };
  }, [stopLocalStream, cleanupPeer]);

  return {
    localStream,
    remoteStream,
    connectionState,
    error,
    hasMediaPermission,
    requestMedia,
    nextPartner,
    endChat,
    toggleVideo,
    toggleAudio,
    sendMessage,
  };
}
