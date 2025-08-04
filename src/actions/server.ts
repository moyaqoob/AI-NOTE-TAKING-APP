"use server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  const client = createServerClient(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_ANON_KEY || "",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
    }
  );

  return client;
}

export async function getUser() {
  const { auth } = await createClient();

  const userObject = await auth.getUser();

  if (userObject.error) {
    return null;
  }

  return userObject.data.user;
}

export async function logout() {
  try {
    const client = await createClient();
    const { error } = await client.auth.signOut();

    if (error) {
      console.error("Error during logout:", error.message);
      throw new Error("Failed to log out. Please try again.");
    }

    return { success: true };
  } catch (err: any) {
    console.error("Unexpected error during logout:", err.message);
    throw new Error("An unexpected error occurred during logout.");
  }
}

