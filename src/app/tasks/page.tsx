'use client'
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"



function Page() {

  interface Tasks {
    _id: string,
    user_id: string,
    title: string,
    description: string
    date: string
  }

  const [tasks, setTasks] = useState<Tasks[]>([])

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch('/api/tasks', {
        method:'GET'
      })
      const data = await res.json()
      if(!res.ok){
        return toast.error(data.message)
      }
      return setTasks(data)
    }
    fetchTasks()
  }, [])

  const route = useRouter()

  return (
    <div className="flex space-x-3 m-5">
      {tasks.map(task =>(
        <div key={task._id} className="bg-white p-5 rounded-md hover:cursor-pointer" onClick={() => route.push(`/tasks/edit/${task._id}`)}>
          <h2 className="font-bold pb-2 text-xl">{task.title}</h2>
          <p className="pb-2">{task.description}</p>
          <p>{task.date}</p>
        </div>
      ))}

    </div>
  )
}

export default Page