import { useEffect, useState, useRef } from "react";
import { getSocket } from "../utils/socket.js";

export function useSocket() {
  const [onlineCount, setOnlineCount] = useState(0);
  const [connected, setConnected] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = getSocket();
    socketRef.current = socket;

    const onConnect = () => setConnected(true);
    const onDisconnect = () => setConnected(false);
    const onOnline = (count) => setOnlineCount(count);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("online-users", onOnline);

    if (socket.connected) setConnected(true);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("online-users", onOnline);
    };
  }, []);

  return { socket: socketRef.current, onlineCount, connected };
}
