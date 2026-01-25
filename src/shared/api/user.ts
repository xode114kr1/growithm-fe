import { apiClient } from ".";

export async function getUserByName({ name }: { name: string }) {
  const res = await apiClient(`/users?name=${name}`);
  return res.data;
}
