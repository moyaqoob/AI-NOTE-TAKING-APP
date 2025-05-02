import Image from "next/image"; 
import favicon from  "@/app/favicon.ico"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DarkToggleMode } from "@/components/ui/DarkModeToggle";
import { LogoutButton } from "./Logout";


const Header = () => {
    const user = true;
  return (
    <header className="bg-popover relative  flex justify-between items-center px-3 py-4 sm:px-8 shadow-md shadow-gray-500">
        <Link href={"/"} className="flex items-center gap-3">
          <Image
            src={favicon}
            className="rounded-full "
            width={60}
            height={60}
            alt="App logo"
            priority
            />

            <h1 className="text-xl font-semibold">
              AI-<span className="">Notes App</span>
            </h1>
        </Link>
        {/* buttons logins */}
        <div className="flex gap-4">
          {user ? (
            <>
            <LogoutButton/>
            <DarkToggleMode/>
            </>
          ) : (
            <>
              <Button>
                <Link href={'/sign-up'}>
                  Signup
                </Link>
              </Button>

              <Button asChild>
                <Link href={"/login"}>Login</Link>{/* Wrapping the text for asChild */}
              </Button>
              <DarkToggleMode/>
            </>
          )}
        </div>
      </header>
  )
}

export default Header