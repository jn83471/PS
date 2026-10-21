import z from "zod";

export const UsrRequestProductFormSchema = z.object({
    CodesId: z.number(),
    PartNumber: z.string(),
    CustomerPartNumber: z.string(),
    Customer:z.string(),
    UrsPriorityId:z.number(),
    Qty:z.number(),
    ProposedDate: z.string()
})

export type UsrRequestProduct = z.infer<typeof UsrRequestProductFormSchema>

export type CreateUsrRequestProduct = Pick<UsrRequestProduct, 'CodesId'|'PartNumber'>

export type UpdateUrsRequestProduct = Pick<UsrRequestProduct, 'ProposedDate'>