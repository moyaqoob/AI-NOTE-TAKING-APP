import { getUser } from "@/auth/server";
import type { ReactNode } from "react";
import  {redirect} from "next/navigation"

interface typeProps{
    children:ReactNode
}


async function ProtectedRoute({children}:typeProps){
    const user =await  getUser();

    if(!user){
        redirect("/login")
    }

    return children;
}

export default ProtectedRoute;