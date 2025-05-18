"use client";
import { getUser } from "@/auth/server";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoutButton } from "./Logout";
import { DarkToggleMode } from "./ui/DarkModeToggle";
import { SidebarTrigger } from "./ui/sidebar";
import router, { useRouter } from "next/navigation"

type User = {
  user: string;
};

function Header() {
  const [user, setUser] = useState<any | null>(null);
  
  useEffect(() => {
    async function fetchUser() {
      const fetchedUser = await getUser();
      setUser(fetchedUser?.id);
    }
    fetchUser();
  }, []); 

  const homePage = ()=>{
    const router = useRouter();
    router.replace("/");
  }

  return (
    <>
      <header className="bg-popover relative flex justify-between items-center px-3 py-4 sm:px-8 shadow-md shadow-gray-500">
        <SidebarTrigger className="absolute left-1"/>
        <Link href={"/"} className="flex items-center gap-3" onClick={homePage}>
          <Image
            src="/favicon.ico" // Replace with your actual favicon path
            className="rounded-full"
            width={60}
            height={60}
            alt="App logo"
            priority
          />
          <h1 className="text-xl font-semibold">
            AI-<span>Notes App</span>
          </h1>
        </Link>
        <div className=""></div>
        {/* buttons logins */}
        <div className="flex gap-4">
          {user && (
            <>
              <LogoutButton />
              <DarkToggleMode />
            </>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
