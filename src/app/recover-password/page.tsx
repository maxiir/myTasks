'use client'
import { useEffect, useState } from "react"


function Page() {
    const [seconds, setSeconds] = useState(60)

    useEffect(() => {
        if(seconds === 0) return;
        const interval = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1)
        }, 1000)

        return () => clearInterval(interval)
        
    }, [seconds])

  return (
    <div className="flex justify-center items-center h-screen">
        <div className="bg-blue-950 p-5 rounded-md min-w-80">
            <h2 className="font-bold text-xl text-white text-center">Recover Password</h2>
            <form className="p-2">
                <div className="mb-5">
                    <label className="text-white mb-2">Entry Email</label>
                    <input type="email" className="block w-full rounded-sm p-2"/>
                </div>
                <div className="mb-5">
                    <label className="text-white mb-2 " htmlFor="">Entry code of verification</label>
                    <p className="text-white mb-2">Time: {seconds}s</p>
                    <input type="number" className="block rounded-sm p-2" placeholder='Code:' />
                </div>
                {seconds === 0 && <p className="text-white text-center mb-2">Volver a enviar Email</p>}
                <button className="rounded-md bg-blue-600 p-2 w-full text-white hover:bg-blue-700 mb-1">verify</button>
                <button className="rounded-md bg-blue-600 p-2 w-full text-white hover:bg-blue-700">Send</button>
            </form>
        </div>
    </div>
  )
}

export default Page