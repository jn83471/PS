import z from "zod";
import { CodeSchema } from "./CodeSchema";

export const HourByHourEventsSchema = z.object({
  Type:z.number(),
  Start:z.string(),
  End: z.string(),
  Description: z.string()
});

export type HourByHourEvents = z.infer<typeof HourByHourEventsSchema>

export type HourByHourEventsForm = Pick<HourByHourEvents, 'Type' | 'Start' | 'End' | 'Description'>