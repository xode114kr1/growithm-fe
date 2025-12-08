import { apiClient } from ".";

interface sendFriendRequestRequest {
  friendName: string;
}

export async function sendFriendRequest({ friendName }: sendFriendRequestRequest) {
  const res = await apiClient.post("/friend-request", { friendName });
  return res.data;
}
