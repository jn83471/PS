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