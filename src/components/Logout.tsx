"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "./ui/button";

export const LogoutButton = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      setLoading(true);

      // Simulate an API call or logout process
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Successfully logged out!");
      setLoading(false);

      // Navigate to the login page
      router.push("/login");
    } catch (err) {
      setLoading(false);
      toast.error("Something went wrong during logout!");
    }
  };

  return (
    <Button
      className="text-xl rounded-full px-4 py-2 cursor-pointer"
      variant={"outline"}
      disabled={loading}
      onClick={handleLogOut}
    >
      {loading ? <Loader2 className="animate-spin text-black" /> : "Logout"}
    </Button>
  );
};
