"use client"
import React from "react";
import { Button } from "./button";
import {toast, ToastContainer} from "react-toastify"
import { Loader, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export const LogoutButton=()=>{
    const [loading,setLoading] = React.useState(false);
    const router = useRouter();
    
    const handleLogOut= async()=>{
        try{
            setLoading(true)
            await new Promise((resolve) => setTimeout(resolve,2000));
            toast.success("Successfully logout");
            router.push("/")
        }catch(err){
            toast.error("Something went wrong during logout!")
        }
    }
    
    return(
        <Button
         className="text-xl rounded-full px-4 py-2 cursor-pointer "
         variant={"outline"}
         disabled = {loading}
         onClick={handleLogOut}
        >
            {loading ? <Loader2 className="animate-spin text-black"/> : <div className="">Logout</div>}
        </Button>
    )
}

