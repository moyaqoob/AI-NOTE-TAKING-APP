"use client";
import { logInUserAction, signUpUserAction } from "@/actions/users";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TextAnimator from "@/components/ui/TextAnimator";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

type AuthCardProps = {
  type: "login" | "signup"; // Adjusted type prop to align with the usage
};

export const AuthCard = ({ type }: AuthCardProps) => {
  const isLoginFrom = type === "login";

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const name = formData.get("name") as string;

      let result;
      let title;
      let description;

      if (isLoginFrom) {
        result = await logInUserAction(email, password);
        title = "Logged in";
        description = "You have been successfully logged in";
      } else {
        result = await signUpUserAction(email, password, name);
        title = "Signed Up";
        description = "Check your email for a confirmation Link";
      }

      if (!result.errorMessage) {
        router.push("/");
        toast.success(`Welcome ${name}`);
      } else {
        toast(`Error:  ${result.errorMessage}`);
      }
    });
  };

  return (
    <form action={handleSubmit}>
      <div className="flex items-center justify-center min-h-screen">
        <Card>
          <TextAnimator text="Welcome to AI-NoteTaker" />

          <CardContent className="relative gap-2">
            <div className="space-y-6 mb-8">
              {" "}
              {/* Adjusted space-y */}
              <div>
                <Label htmlFor="email" className="text-2xl font-semibold">
                  Email
                </Label>
                <Input id="email" name="email" placeholder="email" />
              </div>
              <div>
                <Label htmlFor="password" className="text-2xl font-semibold">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="password"
                />
              </div>
              {type === "signup" && (
                <div>
                  <Label htmlFor="name" className="text-2xl font-semibold">
                    Name
                  </Label>
                  <Input id="name" type="name" name="name" placeholder="name" />
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              variant={"ghost"}
              className="border text-2xl px-4 py-6  transition-all mr-3 duration-300 hover:duration-500 hover:text-black hover:bg-white"
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : type === "signup" ? (
                "Sign Up"
              ) : (
                "Log In"
              )}
            </Button>
            <p className="text-sm font-thin flex gap-2 items-center">
              {isLoginFrom
                ? "Don't have an account yet"
                : "Already have an account"}{" "}
              <Link
                href={isLoginFrom ? "/sign-up" : "/login"}
                className={`text-blue-400 underline hover:text-blue-500  font-medium ${
                  isPending ? "pointer-events-auto opacity-50" : ""
                }`}
              >
                {isLoginFrom ? "Sign Up" : "Login"}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
};
