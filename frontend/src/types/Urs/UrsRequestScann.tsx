import z from "zod";

export const UrsRequestScannSendSchema = z.object({
    Process: z.number(),
    Box: z.string(),
})

export type UrsRequestScannSend = z.infer<typeof UrsRequestScannSendSchema>
