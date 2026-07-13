import z from "zod";
import { CodeSchema } from "./CodeSchema";

export const PlantSchema = z.object({
  id: z.number(),
  name: z.string(),
  defaultCode: z.number(),
  type: z.number(),
  status: z.boolean(),
  APPKEY: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().nullable(),
  //Codes: CodeSchema.nullable()
});

export type Plant = z.infer<typeof PlantSchema>

export type PlantForm = Pick<Plant, 'defaultCode' | 'name' | 'type'>