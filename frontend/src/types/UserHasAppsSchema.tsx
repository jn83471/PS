import z from "zod";
import { AppSchema } from "./AppSchema";
import { AppsPermision } from "./AppsPermision";

export const UserHasAppsSchema = z.object({
    id: z.number(),
    AppsId: z.number(),
    UserId: z.number().nullable(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    Apps: AppSchema,
    //AppsPermision: z.array(AppsPermision).default([])
})

