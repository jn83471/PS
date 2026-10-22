// schemas/uploadPlan.schema.ts

import { z } from "zod";

export const uploadPlanSchema = z.object({
  fecha: z.string().min(1, "La fecha es requerida"),

  plan: z
    .instanceof(File, {
      message: "Debe seleccionar un archivo",
    })
    .refine(
      (file) =>
        [
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-excel",
        ].includes(file.type),
      {
        message: "Debe ser un archivo Excel",
      }
    )
    .refine(
      (file) =>
        file.size <= 10 * 1024 * 1024,
      {
        message: "Máximo 10MB",
      }
    ),
});

export type UploadPlanSchema = z.infer<
  typeof uploadPlanSchema
>;
export type UploadPlanSchemaForm = Pick<UploadPlanSchema, 'plan' | 'fecha'>

export const PlanSchema=z.object({
  fecha: z.string().min(1, "La fecha es requerida"),
  id: z.number(),
  machine: z.string(),
  Capacity: z.number(),
  Line: z.string(),
  Program: z.string(),
  Shift: z.string(),
  PartNumber: z.string(),
  Customer: z.string(),
  LevenDesign: z.string(),
  Shortpart: z.string(),
  Kmh: z.number(),

  d1: z.number(),
  d2: z.number(),
  d3: z.number(),
  d4: z.number(),
  d5: z.number(),
  d6: z.number(),
  d7: z.number(),
  d8: z.number(),
  d9: z.number(),
  d10: z.number(),
  d11: z.number(),
  d12: z.number(),
  d13: z.number(),
  d14: z.number(),
  d15: z.number(),
  d16: z.number(),
  d17: z.number(),
  d18: z.number(),
  d19: z.number(),
  d20: z.number(),
  d21: z.number(),
  d22: z.number(),
  d23: z.number(),
  d24: z.number(),
  d25: z.number(),
  d26: z.number(),
  d27: z.number(),
  d28: z.number(),
  d29: z.number(),
  d30: z.number(),
  d31: z.number(),

  status: z.boolean(),

  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})
export type PlanSchema = z.infer<
  typeof PlanSchema
>;

export type PlanCreateForm = Pick<
    z.infer<typeof PlanSchema>,
    'fecha'
    | 'machine'
    | 'Capacity'
    | 'Line'
    | 'Program'
    | 'Shift'
    | 'PartNumber'
    | 'Customer'
    | 'LevenDesign'
    | 'Shortpart'
    | 'Kmh'
    | 'd1'
    | 'd2'
    | 'd3'
    | 'd4'
    | 'd5'
    | 'd6'
    | 'd7'
    | 'd8'
    | 'd9'
    | 'd10'
    | 'd11'
    | 'd12'
    | 'd13'
    | 'd14'
    | 'd15'
    | 'd16'
    | 'd17'
    | 'd18'
    | 'd19'
    | 'd20'
    | 'd21'
    | 'd22'
    | 'd23'
    | 'd24'
    | 'd25'
    | 'd26'
    | 'd27'
    | 'd28'
    | 'd29'
    | 'd30'
    | 'd31'
>;