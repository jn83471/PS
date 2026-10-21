import z from "zod";
import { UserHasPermisions } from "./UserHasPermisions";

export const AppsPermision = z.object({
    id: z.number(),
    KEY: z.string(),
    AppsId: z.number(),
    UserHasPermisions: z.array(UserHasPermisions).default([]),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime()
})
