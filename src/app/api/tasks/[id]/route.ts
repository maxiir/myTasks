import { NextRequest, NextResponse } from "next/server";
import taskModel from "@/model/task";
import dbConnect from "@/db/db_connect";

interface Params {
    id: string
}


export async function GET(req:NextRequest, {params}:{params:Params}){
    await dbConnect()
    try {
        const {id} = params
        const task = await taskModel.findById({_id: id })
        if(!task){
            return NextResponse.json({message:'No se encontro la tarea'}, {status:404})
        }
        console.log('tarea encontrada:', task)
        return NextResponse.json(task)
        
    } catch (error) {
        return NextResponse.json({message:'Error en el servidor', error}, {status:500})
    }


}


export async function DELETE(req:NextRequest, {params}:{params:Params}){
    await dbConnect()
    try {
        const {id} = params;
        const result = await taskModel.deleteOne({_id:id})
        if(result.deletedCount === 0){
            return NextResponse.json({message:'Error al eliminar la tarea'}, {status:400})
        }
        return NextResponse.json({message:'Tarea eliminada con exito!', result})
        
    } catch (error) {
        return NextResponse.json({message: 'Error en el servidor', error}, {status:500})
    }
}

export async function PUT(req:NextRequest, {params}:{params:Params}){
    await dbConnect()
    try {
        const {id} = params;
        const updateData = await req.json()
        
        const result = await taskModel.updateOne({_id:id}, {$set:updateData})
        if(result.modifiedCount === 0){
            return NextResponse.json({message:'Error al actualizar los datos'}, {status:400})
        }
        return NextResponse.json({message:'Campos actualizados con exito!'})
        
    } catch (error) {
        return NextResponse.json({message:'Error en el servido', error}, {status:500})
    }
    
}