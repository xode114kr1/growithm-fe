import { apiClient } from ".";

export async function getFriendList() {
  const res = await apiClient.get("/friends/me");
  return res.data;
}

export async function deleteFriend({ friendId }: { friendId: string }) {
  const res = await apiClient.delete(`/friends/${friendId}`);
  console.log(res.data);
  return res.data;
}
