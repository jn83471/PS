import { useEffect, useState } from "react";
import { SocketContext } from "../Context/SocketContext";
import { socket } from "../hook/Socket";
import { useAuth } from "../hook/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { registerClientListeners } from "../SocketListeners/registerClientListeners";

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [messages, setMessages] = useState<string[]>([]);

    const { data, isError, isLoading } = useAuth()
    const queryClient = useQueryClient()

    useEffect(() => {

        socket.off("connect");
        if (!socket.connected) {
            socket.connect();
        }

        socket.on("connect", () => {
            console.log("Conectado:", socket.id);

            socket.emit("joinRoom", "Plants");
            socket.emit("joinRoom", "Client")
            socket.emit("joinRoom", "Machine")
            socket.emit("joinRoom", "Codes");
            socket.emit("joinRoom", "Urs");
        });

        socket.io.off("reconnect");
        socket.io.on("reconnect", (attempt) => {
            console.log("Reconectado:", attempt);
        });

        socket.io.off("reconnect_attempt");
        socket.io.on("reconnect_attempt", (attempt) => {
            console.log("Intento:", attempt);
        });

        socket.off("disconnect");
        socket.on("disconnect", () => {
            console.log("Desconectado:",);
        });

        socket.off("newPlant")
        socket.on("newPlant", (plant) => {
            queryClient.setQueryData(['Plant'], (old: any) => {
                if (!old) return [plant];
                return [...old, plant];
            })
        })

        socket.off("deletePlant")
        socket.on("deletePlant", (plant) => {
            queryClient.setQueryData(['Plant'], (old: any) => {
                if (!old) return [];
                return old.filter((p: any) => p.id != plant.id);
            })
        })

        socket.off("editPlant")
        socket.on("editPlant", (plant) => {
            queryClient.setQueryData(["Plant"], (old: any) => {
                if (!old) return [];

                return old.map((p: any) =>
                    p.id == plant.id
                        ? plant
                        : p
                );
            });
        });


        registerClientListeners(socket,queryClient)
        

        socket.off("newMachine")
        socket.on("newMachine", (machine) => {
            queryClient.setQueryData(['Machine'], (old: any) => {
                if (!old) return [machine];
                return [...old, machine];
            })
        })

        socket.off("deleteMachine")
        socket.on("deleteMachine", (machine) => {
            queryClient.setQueryData(['Machine'], (old: any) => {
                if (!old) return [];
                return old.filter((p: any) => p.id != machine.id);
            })
        })

        socket.off("editMachine")
        socket.on("editMachine", (machine) => {
            queryClient.setQueryData(["Machine"], (old: any) => {
                if (!old) return [];

                return old.map((p: any) =>
                    p.id == machine.id
                        ? machine
                        : p
                );
            });
        })

        socket.off("newCode")
        socket.on("newCode", (code) => {
            queryClient.setQueryData(['Code'], (old: any) => {
                if (!old) return [code];
                return [...old, code];
            })
        })

        socket.off("deleteCode")
        socket.on("deleteCode", (code) => {
            queryClient.setQueryData(['Code'], (old: any) => {
                if (!old) return [];
                return old.filter((p: any) => p.id != code.id);
            })
        })

        socket.off("newScann")
        //join urs
        socket.on("newScann", (code) => {
            queryClient.setQueryData(['UrsRequests', code.UrsRequestsFolioId.toString()], (old: any) => {
                if (!old) return [];

                return old.map((p: any) =>
                    p.id == code.id
                        ? code
                        : p
                );
            });
            /*queryClient.setQueryData(
                ['UrsRequests', socket.UrsRequestsFolioId.toString()],
                (old: any) => {
                    if (!old) return old;

                    return {
                        ...old,
                        rows: old.filter(
                            (p: any) => p.id !== socket.id
                        )
                    };
                }
            );*/
        })

        /*
        const Requests = useQuery({
                queryKey: ['UrsRequests', id],
                queryFn: () => GetUrsRequestScann(id),
                //enabled: !fecha,
                retry: false
            })
         */
        return () => {
            console.log("Cerrando socket:", socket.id);

            socket.off("connect");
            socket.off("disconnect");

            socket.off("newPlant");
            socket.off("deletePlant");
            socket.off("editPlant");

            socket.off("newClient");
            socket.off("deleteClient");
            socket.off("editClient");

            socket.off("newMachine");
            socket.off("deleteMachine");
            socket.off("editMachine");

            socket.off("newCode");
            socket.off("deleteCode");

            socket.off("newScann");

            socket.disconnect();
        };

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