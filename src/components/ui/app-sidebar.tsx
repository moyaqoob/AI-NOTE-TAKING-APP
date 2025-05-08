import { getUser } from "@/auth/server"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
  } from "@/components/ui/sidebar"
import prisma from "@/prisma/prisma"
import Link from "next/link"
import { Note } from "@prisma/client"
import SideBarGroupContent from "./SidebarGroupContext"
export async function AppSidebar() {
    const user = await getUser()

    let notes:Note[] = [];
    
    if(user){

            notes =await prisma.note.findMany({
                where:{
                    id:user?.user.id
                },
                orderBy:{
                    updatedAt:"desc"
                }
            }) 
    }
    console.log(user?.user.email)
    const userName = user?.user.email?.split('@')[0].substring(0,2);
    
    
    return (
      <Sidebar>
        <SidebarContent className="custom-scrollbar">
          <SidebarGroupLabel className="mb-2 mt-2">
            {user ? (
             <div className="pl-3 text-lg">
                Your Notes <span className="text-2xl capitalize ">
                {userName}
                    </span>
             </div>
                
            ):(
                <p>
                    <Link href={'/login'}>
                        Login
                    </Link>{" "}
                    to see your notes
                </p>
            )}
          </SidebarGroupLabel>
         {user && <SideBarGroupContent notes={notes}/>}
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    )
  }
  