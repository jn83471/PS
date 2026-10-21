import { io } from "socket.io-client";

export const socket = io("http://172.30.190.230:3000", {
    autoConnect: false,
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 20000,
});