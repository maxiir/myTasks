import {z} from 'zod'

export const signUpSchema = z.object({
    email: z.string().min(1, "campo requerido"),
    userName: z.string().min(1, "campo requerido"),
    password: z.string().min(1, "campo requerido"),
    repeatPassword: z.string()
}).refine(data => data.password === data.repeatPassword, {
    message:'Las contraseñas no son iguales',
    path:['repeatPassword'] //donde se va a mostar el mensaje
})