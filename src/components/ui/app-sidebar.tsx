import { getUser } from "@/actions/server";
import {
  Sidebar,
  SidebarContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import prisma from "@/prisma/prisma";
import { Note } from "@prisma/client";
import SideBarGroupContent from "./SidebarGroupContext";

export async function AppSidebar() {
  const user = await getUser();

  let notes: Note[] = [];
  if (user) {
    try {
      notes = await prisma.note?.findMany({
        where: {
          authorId: user.id, // Use the correct foreign key
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

  // If the user is not logged in, return null (sidebar will not render)
  if (!user) {
    return null;
  }

  return (
    <Sidebar>
      <SidebarContent className=" bg-[#032372]">
        <SidebarGroupLabel className="mb-2 mt-2">
          <div className="pl-3 text-2xl text-center relative left-14 pb-5 uppercase font-serif top-5">
            Notes{" "}
          </div>
        </SidebarGroupLabel>

        <SideBarGroupContent notes={notes} />
      </SidebarContent>
    </Sidebar>
  );
}
