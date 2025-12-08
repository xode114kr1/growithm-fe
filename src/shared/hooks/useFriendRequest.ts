import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendFriendRequest } from "../api/friendRequest";

export function useSendFriendRequestMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["send-friend"] });
    },
  });
}
