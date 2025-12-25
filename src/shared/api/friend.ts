import { apiClient } from ".";

export async function getFriendList() {
  const res = await apiClient.get("/friend/me");
  return res.data;
}

export async function deleteFriend({ friendId }: { friendId: string }) {
  const res = await apiClient.delete(`/friend/${friendId}`);
  console.log(res.data);
  return res.data;
}
