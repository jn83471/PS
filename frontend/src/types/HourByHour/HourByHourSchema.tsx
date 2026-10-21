import z from "zod";
import { CodeSchema } from "./CodeSchema";

export const HourByHourSchema = z.object({
  Machine:z.number(),
  Shift:z.number(),
  Plan:z.number()
});

export type HourByHour = z.infer<typeof HourByHourSchema>

export type HourByHourForm = Pick<HourByHour, 'Machine' | 'Shift' | 'Plan' >