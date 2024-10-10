"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore"; 

function Navbar() {

    const {setAuth, auth} = useAuthStore()
    const route = useRouter()

    const logOut = () => {
        route.push('/')
        Cookies.remove('Token')
        setAuth(false)
    }

  return (
    <nav className="flex bg-black w-100 p-5 text-white justify-between">
      <div>
        <p className="font-bold text-2xl">My Tasks</p>
      </div>
      <div>
        {auth ? (
          <ul className="flex space-x-14 text-xl">
            <li>
              <Link href={"/tasks"}>Inicio</Link>
            </li>
            <li>
              <Link href={"/tasks/add"}>New task</Link>
            </li>
            <li>
              <button onClick={logOut}>LogOut</button>
            </li>
          </ul>
        ) : (
          <ul><li></li></ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
