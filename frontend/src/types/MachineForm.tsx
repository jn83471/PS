import z from "zod"
import { PlantSchema } from "./PlantForms";
import { CodeSchema } from "./CodeSchema";



export const MachineSchema = z.object({
    id: z.number(),

    PlantId: z.number(),
    CodesId: z.number(),
    ClientsId: z.number(),

    machineCode: z.string(),

    status: z.boolean(),

    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),

    // relaciones
    Codes: CodeSchema,
    plant: PlantSchema,
});

export type Machine = z.infer<typeof MachineSchema>

export type MachineForm = Pick<Machine, 'PlantId' | 'CodesId' | 'machineCode' | 'ClientsId'>