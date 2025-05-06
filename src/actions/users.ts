"use server"

import {createClient} from "@/auth/server"
import { prisma } from "../../prisma/prisma";

export const logInUserAction = async (email: string, password: string) => {
    try {
        const { auth } = await createClient();
        const { data, error } = await auth.signInWithPassword({ email, password });
        if (error) return { errorMessage: error.message };
        return { errorMessage: null };
    } catch (error) {
        return { errorMessage: "An unexpected error occurred." };
    }
};

export const signUpUserAction  = async(email:string, password:string,name:string)=>{
    try {
        const { auth } = await createClient();
        const { data, error } = await auth.signUp({ email, password });
      
        if (error) {
          return { errorMessage: `Auth error: ${error.message}` };
        }
      
        const userId = data.user?.id;
        if (!userId) {
          return { errorMessage: 'Failed to retrieve user ID from auth response' };
        }
      
        await prisma.user.create({
         //@ts-ignore
          data: {
            id: userId,
            email,
            name,
            password:"123123"
          },
        });
        console.log("created the user")
      
        return { errorMessage: null };
      } catch (error: any) {
        console.error('Sign-up error:', error);
        return { errorMessage: `Unexpected error: ${error.message}` };
      }
      
}
