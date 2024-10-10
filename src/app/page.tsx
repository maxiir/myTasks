'use client'

import Link from "next/link"
import {SubmitHandler, useForm} from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { schemaBase } from "@/schemas/authSchema"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/authStore"


function Page() {

  interface FormData {
    userName: string,
    password: string
  }

  const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
    resolver: zodResolver(schemaBase)
  })

  const route = useRouter()

  const {setAuth} = useAuthStore()



  const onsubmit:SubmitHandler<FormData> = async (data) => {
    try {
      const res = await fetch(`/api/login`, {
        method:'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
      })

      const responseData = await res.json() 

      if(!res.ok){
        return toast.error(responseData.message)
      }
      
      route.push('/tasks')
      setAuth(true)
      return toast.success(responseData.message)

  
    } catch (error) {
      console.error('Error en la solicitud:', error)
      return toast.error('Ocurrio un error al procesar la solicitud')
    }
    
  }

  return (
    <div className="flex justify-center items-center h-screen w-full">
      
      <div className="bg-blue-950 pt-20 pb-10 px-10 rounded-xl min-w-96">
        <h2 className="font-bold text-white text-xl mb-5">Login</h2>
        <form className="w-full" onSubmit={handleSubmit(onsubmit)}>
          <div className="mb-5 ">
            <label htmlFor="" className="block text-white">User Name</label>
            <input type="text" className={`rounded-sm p-2 mt-2 w-full ${errors.userName && 'border-2 border-orange-500'}`} {...register('userName')}/>
            {errors.userName && <span className="text-orange-500 ">{errors.userName.message}</span>}
          </div>
          <div>
            <label htmlFor="" className="block text-white">Password</label>
            <input type="password" className={`rounded-sm p-2 mt-2 w-full ${errors.password && 'border-2 border-orange-500'}`} {...register('password')} />
            {errors.password && <span className="text-orange-500">{errors.password.message}</span>}
            <Link href={'/recover-password'} className="block text-end text-white">¿Olvido su contraseña?</Link>
          </div>

          <button className="block bg-blue-600 hover:bg-blue-800 p-2 mt-10 rounded-md w-full text-white">Login</button>
          <div className="flex space-x-1 mt-2">
            <p className="text-white">¿No tenes una cuenta? </p>
            <Link href={'/signup'} className="text-blue-600 hover:text-blue-800" >Sign Up</Link>
          </div>

        </form>
      </div>

    </div>
  )
}

export default Page