import z from "zod";

export const UrsRequestFolioSchema = z.object({
    motive: z.string(),
    Verify: z.number(),
    ProposedDate: z.string().datetime(),
    Hrs: z.string().datetime(),
    UrsPriorityId: z.number(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    files: z.array(z.instanceof(File)).optional()
})

export type UrsRequestFolio = z.infer<typeof UrsRequestFolioSchema>

export type UsrGenerateFolio = Pick<UrsRequestFolio, 'ProposedDate' | 'UrsPriorityId'| 'motive' | 'Hrs'>
export type UrsVerificateFolio=Pick<UrsRequestFolio,'Verify'>
export type UrsVerificateFolioCpLocal=Pick<UrsRequestFolio,'Verify'|'ProposedDate'>
export type UrsVerificateSendFolio=Pick<UrsRequestFolio,'Verify'| 'files'>
export type UrsChangeHrs=Pick<UrsRequestFolio,'Hrs'>