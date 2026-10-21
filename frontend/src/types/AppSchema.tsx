import z from "zod";
import { AppsPermision } from "./AppsPermision";

export const AppSchema = z.object({
    id: z.number(),
    KEY: z.string(),
    status: z.number(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    AppsPermision: z.array(AppsPermision).default([])
})
