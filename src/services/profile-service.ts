import { getProfileById } from "@/repositories/profile-repository";

export async function getUserProfile(userId: string) {
  const profile = await getProfileById(userId);
  if (!profile) {
    return null;
  }

  return profile;
}
