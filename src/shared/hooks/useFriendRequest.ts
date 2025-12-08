import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getWaitFriendRequests, sendFriendRequest } from "../api/friendRequest";

export function useGetWaitFriendRequests() {
  return useQuery({
    queryKey: ["wait-friend"],
    queryFn: async () => {
      const res = await getWaitFriendRequests();
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
