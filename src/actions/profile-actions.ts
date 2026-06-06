"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { getUserProfile } from "@/services/profile-service";

export async function getCurrentUserProfile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  return getUserProfile(user.id);
}

export async function refreshDashboard() {
  revalidatePath("/dashboard");
}
