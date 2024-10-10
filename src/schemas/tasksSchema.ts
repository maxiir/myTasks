import {z} from 'zod'

export const addTask = z.object({
    title: z.string(),
    description: z.string()
})