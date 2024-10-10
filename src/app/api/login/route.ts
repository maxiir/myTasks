import { NextRequest, NextResponse } from "next/server";
import {createToken} from '@/lib/jwt'
import bcrypt from 'bcrypt'
import newUser from "@/model/newUser";
import dbConnect from "@/db/db_connect";

export async function POST(req: NextRequest){
    await dbConnect()
    try {
        
        const {userName, password} = await req.json()

        console.log('valores de inputs:', userName, password)
        const findUser = await newUser.findOne({userName:userName})

        if(!findUser){
            return NextResponse.json({message:'Credentiales incorrectas'}, {status:401})
        }

        const isMatch = await bcrypt.compare(password, findUser.password)

        if(!isMatch){
            return NextResponse.json({message:'Credentiales incorrectas'}, {status:401})
        }

        const token = await createToken({id_user: findUser._id.toString(), userName: findUser.userName })
        
        const res = NextResponse.json({message:'Autenticado'}, {status:200})
        
        //En este punto ya se guarda la cookie en el servidor
        res.cookies.set('Token', token, {
            httpOnly: false,
            secure: true, //process.env.NODE_ENV === 'production'
            sameSite:'strict'
        })

        return res;

    } catch (error) {
        console.error('Error en el servidor:', error)
        return NextResponse.json({message:'Error en el servidor'}, {status:500})
        
    }
}
