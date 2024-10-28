import { NextRequest, NextResponse } from "next/server";
import newUser from "@/model/user";
import dbConnect from "@/db/db_connect";
import { signUpSchema } from "@/schemas/signupSchema";
import {z} from 'zod'
import bcrypt from 'bcrypt'

export async function POST(req:NextRequest){
    await dbConnect()
    try {

        const formData = await req.json()
        signUpSchema.parse(formData) //validacion adicional con zod, lado servidor


        const {email, userName, password} = formData

        const findUser = await newUser.findOne({email: email})
        if(findUser){
            return NextResponse.json({message:'Email ya registrado'}, {status:400})
        }

        const passwordHash = await bcrypt.hash(password, 10)

        const user = await newUser.create({
            email:email,
            userName:userName, 
            password:passwordHash
        })

        return NextResponse.json({message: 'Usuario creado con exito!', user}, {status:201} )
        
    } catch (error) {
        console.error('Error en el servidor al crear el usuario:', error); // Log para depuración
        //manejo de error validacion zod
        if(error instanceof z.ZodError){
            return NextResponse.json({message:'Error de validacion', error: error.errors}, {status:400})
        }
        return NextResponse.json({message: 'error en el servidor', error}, {status:500})
    }
}