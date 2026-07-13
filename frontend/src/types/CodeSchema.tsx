import z from "zod";

export const CodeSchema = z.object({
  id: z.number(),
  name: z.string(),
  key: z.string(),
  status: z.boolean(),
  type: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  server: z.string().nullable,
  db: z.string().nullable,
});

export type Code = z.infer<typeof CodeSchema>

export type CodeForm = Pick<Code, 'name' | 'key' | 'server' |'db' >