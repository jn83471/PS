import z from "zod";

export const DepartmentSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().nullable(),
});
