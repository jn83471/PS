import z from "zod";

export const RolSchema = z.object({
  id: z.number(),
  name: z.string(),
  display: z.string(),
  ShowGenaralReports: z.boolean(),
  CreateUsers: z.boolean(),
  ResetPasswords: z.boolean(),
  changeLayoutMachines: z.boolean(),
  CreatePlants: z.boolean(),
  CreateClients: z.boolean(),
  CreatePlans: z.boolean(),
  CreateCodes: z.boolean(),
  UseDiferentDepartments: z.boolean(),
  Level: z.number(),
  status: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().nullable(),
});
