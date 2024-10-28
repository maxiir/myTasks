'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { addTask } from "@/schemas/tasksSchema"
import {SubmitHandler, useForm} from 'react-hook-form'
import { toast } from "sonner"
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"

function Page() {

    interface FormData {
        title: string,
        description: string
    }

    const {id} = useParams<{id:string}>()

    const {register, handleSubmit, reset} = useForm<FormData>({
        resolver: zodResolver(addTask),
        defaultValues: {
            title: '',
            description: ''
        }
    })

    useEffect(() => {
        if(id){
            const fetchTasks = async () => {
                const res = await fetch(`/api/tasks/${id}`)
                const data = await res.json()
                console.log('respuesta del servidor:', data)
                if(!res.ok){
                    return console.error('Error al cargar los datos')
                }
                return reset({
                    title: data.title,
                    description: data.description
                })
            };
            fetchTasks()
        }
    }, [id, reset])

    const route = useRouter()
    
    const sendData: SubmitHandler<FormData> = async (data) => {
        const apiRoute = id ? `/api/tasks/${id}` : `/api/tasks`
        const res = await fetch(apiRoute, {
            method: id ? 'PUT' : 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(data)
        })
        const dataResponse = await res.json() 
        if(!res.ok){
            console.log('respuesta', dataResponse)
            return toast.error(dataResponse.message)
        }
        return toast.success(dataResponse.message)

    }

    const deleteTask = async (id_task:string) => {
        const res = await fetch(`/api/tasks/${id_task}`, {
            method: 'DELETE'
        })
        const data = await res.json() 
        if(!res.ok){
            return toast.error(data.message)
        }
        toast.success(data.message)
        return route.push('/tasks')
    }


  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='bg-blue-950 p-5 rounded-xl'>
            <form onSubmit={handleSubmit(sendData)}>
                <h2 className="text-white font-bold text-xl mb-5">{id ? 'Edit Task' : 'Create new task'}</h2>
                <label className='text-white'>Title</label>
                <input type="text" className='w-full p-2' {...register('title')}/>

                <label className='text-white'>Description</label>
                <textarea  id="" className='w-full p-2' {...register('description')}/>
                <button className='rounded-md text-white bg-blue-600 p-2 w-full mt-5'>{id ? 'Edit task' : 'Add task' }</button>
                {id && (
                    <button type="button" className='rounded-md text-white bg-red-600 p-2 w-full mt-5' onClick={() => deleteTask(id)}>Delete task</button>
                    )}
            </form>
        </div>

    </div>
  )
}

export default Page