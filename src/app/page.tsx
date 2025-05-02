import Image from "next/image"; 
import favicon from  "../app/favicon.ico"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DarkToggleMode } from "@/components/ui/DarkModeToggle";
import Header from "@/components/ui/Header";
import { AuthCard } from "./{Auth)/Card";

function Home() {

  const user = null;

  const loading = false;
  return (
    <div>
      <Header/>
      <AuthCard/>
    </div>
  );
}


export default Home