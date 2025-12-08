import { apiClient } from ".";
import type { ResponseData } from "../../types/commonType";
import type { FriendRequests } from "../../types/friendRequest";

interface sendFriendRequestRequest {
  friendName: string;
}

export async function getWaitFriendRequests(): Promise<ResponseData<FriendRequests>> {
  const res = await apiClient.get("/friend-request/wait");
  return res.data;
}

export async function sendFriendRequest({ friendName }: sendFriendRequestRequest) {
  const res = await apiClient.post("/friend-request", { friendName });
  return res.data;
}
