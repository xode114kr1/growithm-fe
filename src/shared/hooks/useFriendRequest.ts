import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  acceptFriendRequest,
  getReceiveFriendRequests,
  getSendFriendRequests,
  rejectFriendRequest,
  sendFriendRequest,
} from "../api/friendRequest";
import type { FriendRequests } from "../../types/friendRequest";

export function useGetSendFriendRequests() {
  return useQuery<FriendRequests[]>({
    queryKey: ["send-friend"],
    queryFn: async () => {
      const res = await getSendFriendRequests();
      return res.data;
    },
  });
}

export function useGetReceiveFriendRequests() {
  return useQuery<FriendRequests[]>({
    queryKey: ["receive-friend"],
    queryFn: async () => {
      const res = await getReceiveFriendRequests();
      return res.data;
    },
  });
}

export function useSendFriendRequestMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["send-friend"] });
    },
  });
}

export function useAcceptFriendRequestMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["receive-friend"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });
}

export function useRejectFriendRequestMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: rejectFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["receive-friend"] });
    },
  });
}
