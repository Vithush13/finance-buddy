// src/utils/socket.js
import { io } from "socket.io-client";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:5000";

// Create a socket instance
const socket = io(SOCKET_URL, { autoConnect: true });

// Function to register the logged-in user with the backend
export function registerSocket(userId) {
  if (!userId) return;
  socket.emit("register", userId); // send userId to server for private events
}

export default socket;
