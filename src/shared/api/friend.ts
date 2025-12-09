import { apiClient } from ".";

export async function getFriendList() {
  const res = await apiClient.get("/friend");
  return res.data;
}
