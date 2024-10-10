import { NextRequest, NextResponse } from "next/server";
import taskModel from "@/model/task";
import dbConnect from "@/db/db_connect";
import { verifyToken } from "@/lib/jwt";




export async function GET(req:NextRequest){
    await dbConnect()
    const token = req.cookies.get('Token')
    if(!token){
        return NextResponse.json({message:'Error: token invalido'})
    }
    const {payload} = await verifyToken(token.value)
    const findTasks = await taskModel.find({user_id:payload.id_user})
    console.log('tareas encontradas:', findTasks)
    return NextResponse.json(findTasks)
}



export async  function POST(req:NextRequest){
    await dbConnect()
    try {
        const token = req.cookies.get('Token')
        if(!token){
            return NextResponse.json({message:'Error: token invalido'})
        }
        const {payload} = await verifyToken(token.value)
        const {title, description} = await req.json()
        await taskModel.create({
            user_id: payload.id_user,
            title,
            description
        })
    
        return NextResponse.json({message:'Tarea creada con exito!'})
        
    } catch (error) {
        console.error('Error en el servidor', error)
        return NextResponse.json({message:'Error en el servidor'}, {status:500})
    }
}
