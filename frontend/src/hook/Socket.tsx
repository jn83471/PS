import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_API_SOCKET, {
    autoConnect: false,
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 20000,
});