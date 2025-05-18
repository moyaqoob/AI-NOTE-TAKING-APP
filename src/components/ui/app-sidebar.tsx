import { getUser } from "@/auth/server";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import prisma from "@/prisma/prisma";
import { Note } from "@prisma/client";
import SideBarGroupContent from "./SidebarGroupContext";
import { routeModule } from "next/dist/build/templates/app-route";

export async function AppSidebar() {
  const user = await getUser();


  let notes: Note[] = [];
  if (user) {
    try {
      notes = await prisma.note.findMany({
        where: {
          authorId:user.id, // Use the correct foreign key
        },
        orderBy: {
          updatedAt: "desc",
        },
      });
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  const userName = user?.email?.split("@")[0].substring(0, 2);

  return (
    <Sidebar>
      <SidebarContent className="custom-scrollbar">
        <SidebarGroupLabel className="mb-2 mt-2">
          {user ? (
            <div className="pl-3 text-lg">
              Your Notes{" "}
              <span className="text-2xl capitalize">{userName}</span>
            </div>
          ) : (
            <p>Login to see your notes</p>
          )}
        </SidebarGroupLabel>

        {user && <SideBarGroupContent notes={notes}/>}
       
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
