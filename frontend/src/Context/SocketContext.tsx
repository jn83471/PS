
import { Socket,io } from "socket.io-client";
import type { SocketContextType } from "../types/SocketContextType";
import { createContext, useContext } from "react";


export const SocketContext=createContext<SocketContextType,undefined>(undefined)




export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket debe usarse dentro de SocketProvider");
  }
  return context;
};