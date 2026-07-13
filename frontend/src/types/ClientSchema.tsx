import z from "zod";
import { CodeSchema } from "./CodeSchema";

export const ClientSchema = z.object({
  id: z.number(),
  name: z.string(),
  defaultCode: z.number(),
  status: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().nullable(),
  Codes: CodeSchema
});

export type Client = z.infer<typeof ClientSchema>

export type ClientForm = Pick<Client, 'defaultCode' | 'name' >