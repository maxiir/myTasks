'use client'
import { useEffect, useState } from 'react'
import { IoWarningOutline } from "react-icons/io5";

function Page() {
    const [time, setTime] = useState(60000)
    useEffect(() => {
        if(time <= 0) return;
        const interval = setInterval(() => {
            setTime((prevTime) => prevTime - 10)
        }, 10)
        return () => clearInterval(interval)
    }, [time])

    const seconds = Math.floor(time / 1000);
    const miliseconds = time % 1000

  return (
    <div className='flex justify-center items-center h-screen bg-red-600'>
        <div className='border border-8 p-5'>
            <h1 className='text-white text-2xl font-bold mb-12 w-full'><IoWarningOutline className='text-center'/> CUENTA REGRESIVA PARA INYECTAR EL VIRUS <IoWarningOutline/></h1>
            <h2 className='text-center font-bold text-xl'>TIEMPO RESTANTE:</h2>
            <p className='block text-center text-9xl'>{seconds}:{miliseconds.toString().padStart(3, '0')}</p>
            {time <= 0 && <p>¡Se agoto el tiempo!</p>}
        </div>
    </div>
  )
}

export default Page