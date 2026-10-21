import z from "zod"
import { PlantSchema } from "./PlantForms";
import { RolSchema } from "./RolSchema";
import { DepartmentSchema } from "./DepartmentSchema";
import { UserHasAppsSchema } from "./UserHasAppsSchema";
import { AppsPermision } from "./AppsPermision";





const AuthSchema = z.object({
    id: z.number(),
    Name: z.string(),
    Email: z.string().email(),
    Password: z.string(),
    RolId: z.number(),
    DepartmentId: z.number(),
    PlantId: z.number().nullable(),
    status: z.boolean(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime().nullable(),
    Plants: PlantSchema.nullable(),
    Rols: RolSchema,
    Departament: DepartmentSchema,
    UserHasApps: z.array(UserHasAppsSchema).default([]),
    UrsProcessId: z.number().nullable(),
    Lang: z.number(),
    TimeZone:z.number()
})

export type Auth = z.infer<typeof AuthSchema>
export type UserLoginForm = Pick<Auth, 'Email' | 'Password'>

export type ConfirmToken = Pick<Auth, 'token'>

export const userSchema = AuthSchema.pick({
    Name: true,
    Email: true,
    Password: true,
    PlantId: true,
    Plants: true,
    RolId: true,
    Rols: true,
    status: true,
    createdAt: true, // ISO string
    updatedAt: true,
    UserHasApps:true,
    UrsProcessId:true,
    Lang:true,
    TimeZone:true
}).extend({
    id: z.number()
})
export type User = z.infer<typeof userSchema>