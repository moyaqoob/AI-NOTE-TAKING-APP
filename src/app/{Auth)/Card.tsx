"use client"
import React, { useEffect, useRef } from "react";
import { Card, CardTitle, CardFooter, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type AuthCardProps = {
  type: "login" | "signup"; // Adjusted type prop to align with the usage
};

export const AuthCard = ({ type }: AuthCardProps) => {
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isPending, setIsPending] = React.useState(false);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setTimeout(() => {
      console.log({
        name: type === "signup" ? name : undefined,
        username,
        password,
      });
      setIsPending(false);
    }, 2000); // Simulate async operation
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>
            {type === "signup" ? "Sign Up to AI-Notes Taking App" : "Log In to AI-Notes Taking App"}
          </CardTitle>
        </CardHeader>

        <CardContent className="relative gap-2">
          {/* Conditionally render Name field for SignUp */}
          {type === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="name" className="text-2xl font-semibold">Name</Label>
              <Input
                id="name"
                ref={nameRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="username" className="text-2xl font-semibold">Username</Label>
            <Input
              id="username"
              ref={usernameRef}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-2xl font-semibold">Password</Label>
            <Input
              id="password"
              type="password"
              ref={passwordRef}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit">
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              type === "signup" ? "Sign Up" : "Log In"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
