import z from "zod";

export const UserHasPermisions = z.object({
    id: z.number(),
    AppsPermisionId: z.number(),
    UserId: z.number(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
})
