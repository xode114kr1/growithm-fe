import { apiClient } from ".";
import type { ResponseData } from "../../types/commonType";
import type { FriendRequests } from "../../types/friendRequest";

interface acceptFriendRequestRequest {
  requestId: string;
}

interface rejectFriendRequestRequest {
  requestId: string;
}

interface sendFriendRequestRequest {
  friendName: string;
}

export async function acceptFriendRequest({ requestId }: acceptFriendRequestRequest) {
  const res = await apiClient.post(`/friend-request/${requestId}/accept`);
  return res.data;
}

export async function rejectFriendRequest({ requestId }: rejectFriendRequestRequest) {
  const res = await apiClient.delete(`/friend-request/${requestId}/reject`);
  return res.data;
}

export async function getSendFriendRequests(): Promise<ResponseData<FriendRequests[]>> {
  const res = await apiClient.get("/friend-request/send");
  return res.data;
}

export async function getReceiveFriendRequests(): Promise<ResponseData<FriendRequests[]>> {
  const res = await apiClient.get("/friend-request/receive");
  return res.data;
}

export async function sendFriendRequest({ friendName }: sendFriendRequestRequest) {
  const res = await apiClient.post("/friend-request", { friendName });
  return res.data;
}
