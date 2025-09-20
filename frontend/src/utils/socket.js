// src/utils/socket.js
import { io } from "socket.io-client";
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:5000";
const socket = io(SOCKET_URL, { autoConnect: true });

export function registerSocket(userId) {
  if (!userId) return;
  socket.emit("register", userId);
}

export default socket;
