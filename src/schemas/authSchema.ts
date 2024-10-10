import { z } from "zod"


export const schemaBase = z.object({
    userName: z.string().min(1, 'este campo es requerido'),
    password: z.string().min(1, 'este campo es requerido')
})