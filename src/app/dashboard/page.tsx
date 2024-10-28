'use client'
import { useEffect, useState } from "react"

function Page() {

    interface Data {
        _id: string,
        userName: string,
        email: string
    }

    const [users, setUsers] = useState<Data[]>([])

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch('/api/users')
            const dataUsers = await res.json()

            if(!res.ok){
                return console.error(dataUsers.message)
            }
            return setUsers(dataUsers)

        }
        fetchUsers()
        console.log('usuarios encontrados:', users)
    }, [users])

  return (
    <div>
        <h1 className="text-center text-4xl">users</h1>
        
            
        {users.map(user => (
            <div key={user._id} className="flex justify-evenly bg-white p-2 rounded-md m-5">
                <h2 className="font-bold text-xl mr-5 ml-5">user name: {user.userName}</h2>
                <p className="mr-5 ml-5">Email: {user.email}</p>
                <div className="mr-5 ml-5 space-x-2">
                    <button className="bg-blue-600 p-2 text-white rounded-md w-20">Edit</button>
                    <button className="bg-red-600 p-2 rounded-md text-white w-20">Delete</button>

                </div>
            </div>
        ))}
    </div>
  )
}

export default Page