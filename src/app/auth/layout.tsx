import { getUser } from "@/actions/server";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();

  // Redirect to the login page if the user is not authenticated
  

  return <>{children}</>;
};

export default AuthLayout;
