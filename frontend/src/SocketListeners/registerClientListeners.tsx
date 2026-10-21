import { Socket } from "socket.io-client";
import { QueryClient } from "@tanstack/react-query";

export const registerClientListeners = (
    socket: Socket,
    queryClient: QueryClient
) => {

    socket.off("newClient");

    socket.on("newClient", (client) => {

        queryClient.setQueryData(
            ["Client"],
            (old: any) => {

                if (!old) return [client];

                return [...old, client];

            }
        );

    });

    socket.off("deleteClient");

    socket.on("deleteClient", (client) => {

        queryClient.setQueryData(
            ["Client"],
            (old: any) => {

                if (!old) return [];

                return old.filter(
                    (c: any) => c.id !== client.id
                );

            }
        );

    });

    socket.off("editClient");

    socket.on("editClient", (client) => {

        queryClient.setQueryData(
            ["Client"],
            (old: any) => {

                if (!old) return [];

                return old.map(
                    (c: any) =>
                        c.id === client.id
                            ? {
                                ...c,
                                name: client.name
                            }
                            : c
                );

            }
        );

    });

};