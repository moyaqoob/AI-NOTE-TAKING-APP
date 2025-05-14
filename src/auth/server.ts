"use server"
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  const client =  createServerClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_SECRET || '',
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            
          }
        },
      },
    }
  )

  return client;
}


export async function getUser(){
  const {auth}  = await createClient();

  const userObject = await auth.getUser();

  if(userObject.error){
    console.log("error from the get user")
     return null;
  }
  console.log(userObject);
  console.log("hi there")

  return userObject.data.user;
}

export async function askAI(){
  
}