import { useEffect, useState } from "react";
import { SocketContext } from "../Context/SocketContext";
import { io, Socket } from "socket.io-client";
import { useAuth } from "../hook/useAuth";
import { useQueryClient } from "@tanstack/react-query";

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<string[]>([]);

    const { data, isError, isLoading } = useAuth()
    const queryClient = useQueryClient()

    useEffect(() => {
        const newSocket = io("http://172.30.190.230:3000");
        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log("Conectado:", newSocket.id);
        });

        newSocket.emit("joinRoom", "Plants");


        newSocket.on("newPlant", (socket) => {
            console.log("new")
            queryClient.setQueryData(['Plant'], (old: any) => {
                if (!old) return [socket];
                return [...old, socket];
            })
        })

        newSocket.on("deletePlant", (socket) => {
            console.log("delete")
            console.log(socket)
            queryClient.setQueryData(['Plant'], (old: any) => {
                if (!old) return [];
                return old.filter((p: any) => p.id != socket.id);
            })
        })

        newSocket.on("editPlant", (socket) => {
            console.log("update")
            console.log(socket)
            queryClient.setQueryData(["Plant"], (old: any) => {
                if (!old) return [];

                return old.map((p: any) =>
                    p.id == socket.id
                        ? { ...p, name: socket.name, parkings: socket.parkings, type: socket.type } // 👈 solo actualiza el campo "name"
                        : p
                );
            });
        })

        newSocket.emit("joinRoom", "Client")

        newSocket.on("deleteClient", (socket) => {
            console.log("delete")
            console.log(socket)
            queryClient.setQueryData(['Client'], (old: any) => {
                if (!old) return [];
                return old.filter((p: any) => p.id != socket.id);
            })
        })

        newSocket.on("newClient", (socket) => {
            console.log("new")
            queryClient.setQueryData(['Client'], (old: any) => {
                if (!old) return [socket];
                return [...old, socket];
            })
        })

        newSocket.on("editClient", (socket) => {
            console.log("update")
            console.log(socket)
            queryClient.setQueryData(["Client"], (old: any) => {
                if (!old) return [];

                return old.map((p: any) =>
                    p.id == socket.id
                        ? { ...p, name: socket.name } // 👈 solo actualiza el campo "name"
                        : p
                );
            });
        })


        newSocket.emit("joinRoom", "Machine")
        newSocket.on("newMachine", (socket) => {
            console.log("new")
            queryClient.setQueryData(['Machine'], (old: any) => {
                if (!old) return [socket];
                return [...old, socket];
            })
        })

        newSocket.on("deleteMachine", (socket) => {
            console.log("delete")
            console.log(socket)
            queryClient.setQueryData(['Machine'], (old: any) => {
                if (!old) return [];
                return old.filter((p: any) => p.id != socket.id);
            })
        })

        newSocket.on("editMachine", (socket) => {
            console.log("update")
            console.log(socket)
            queryClient.setQueryData(["Machine"], (old: any) => {
                if (!old) return [];

                return old.map((p: any) =>
                    p.id == socket.id
                        ? socket
                        : p
                );
            });
        })

        newSocket.emit("joinRoom", "Codes");
        newSocket.on("newCode", (socket) => {
            console.log("new")
            queryClient.setQueryData(['Code'], (old: any) => {
                if (!old) return [socket];
                return [...old, socket];
            })
        })

        newSocket.on("deleteCode", (socket) => {
            console.log("delete")
            console.log(socket)
            queryClient.setQueryData(['Code'], (old: any) => {
                if (!old) return [];
                return old.filter((p: any) => p.id != socket.id);
            })
        })

        

    }
        , []);

    const sendMessage = (msg: string) => {
        socket?.emit("message", msg);
    };

    return (
        <SocketContext.Provider value={{ socket, messages, sendMessage }}>
            {children}
        </SocketContext.Provider>
    );
};