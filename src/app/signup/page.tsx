"use client";
import Link from "next/link";
import {SubmitHandler, useForm} from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schemas/signupSchema";
import { toast } from "sonner";

function Signup() {

    interface FormData {
        email: string,
        userName: string,
        password: string,
        repeatPassword: string
    }

    const {register, handleSubmit, formState:{errors}} = useForm<FormData>({
        resolver: zodResolver(signUpSchema)
    })

    const onsubmit:SubmitHandler<FormData> = async (data) => {
        
        const res = await fetch(`/api/signup`, {
            method:'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(data)
        })
        if(res.ok){
          const data = await res.json()
            console.log(data)
            toast.success('Registro exitoso', {
              description: data.message
            })
            return
        }else{
            const error = await res.json()
            console.error(error.message)
            toast.error('Error', {
              description: error.message
            })
        }
    }

  
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-blue-950 p-10 rounded-md">
        <h2 className="font-bold p-2 text-white">Sign Up</h2>
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="p-2">
            <label htmlFor="" className="text-white">
              Email
            </label>
            <input type="email" className={`w-full rounded-sm p-2 ${errors.email && 'border-2 border-orange-600 '}`}  {...register('email')} />
            {errors && (<span className="text-orange-600">{errors.email?.message}</span>)}
          </div>
          <div className="p-2">
            <label htmlFor="" className="text-white">
              User name
            </label>
            <input type="text" className="w-full rounded-sm p-2" {...register("userName")} />
          </div>
          <div className="p-2">
            <label htmlFor="" className="text-white">
              Password
            </label>
            <input type="password" className="w-full rounded-sm p-2" {...register("password")}/>
          </div>
          <div className="p-2">
            <label htmlFor="" className="text-white">
              Repeat password
            </label>
            <input type="password" className={`w-full rounded-sm p-2 ${errors.repeatPassword && "border-2 border-orange-600"} `} {...register("repeatPassword")} />
            {errors.repeatPassword && <span className="text-orange-600">{errors.repeatPassword.message}</span>}
          </div>

          <button type="submit" className="bg-blue-600 hover:bg-blue-800 rounded-md w-full p-2 mt-5 text-white">
            Send
          </button>
          <div className="flex space-x-1 m-5">
            <p className="text-white">¿Tenes una cuenta?</p>
            <Link href={'/'} className="text-blue-600">
                Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
