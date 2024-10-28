import { NextResponse } from "next/server";
import dbConnect from "@/db/db_connect";
import user from "@/model/user";

export async function GET(){
    await dbConnect()
    try {
        const findUsers = await user.find()
        if(!findUsers){
            return NextResponse.json({message:'No se encontraron usuarios'}, {status:404})
        }
        console.log(findUsers)
        return NextResponse.json(findUsers)
        
    } catch (error) {
        return NextResponse.json({message:'Error en el servidor', error}, {status:500})   
    }
}