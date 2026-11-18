import z from "zod";

export const UsrRequestProductFormSchema = z.object({
    CodesId: z.number(),
    PartNumber: z.string(),
    CustomerPartNumber: z.string(),
    Customer:z.string(),
    UrsPriorityId:z.number(),
    Qty:z.number(),
    ProposedDate: z.string(),
    PlantId: z.number()
})

export type UsrRequestProduct = z.infer<typeof UsrRequestProductFormSchema>

export type CreateUsrRequestProduct = Pick<UsrRequestProduct, 'CodesId'|'PartNumber'|'PlantId'>

export type UpdateUrsRequestProduct = Pick<UsrRequestProduct, 'ProposedDate'>