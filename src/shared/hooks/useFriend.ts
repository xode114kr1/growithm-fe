import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteFriend, getFriendList } from "../api/friend";
import type { User } from "../../types/userType";

export function useGetFriendList() {
  return useQuery<User[]>({
    queryKey: ["friend"],
    queryFn: async () => {
      const res = await getFriendList();

      return res.data;
    },
  });
}

export function useDeleteFriendMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFriend,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friend"] });
      queryClient.invalidateQueries({ queryKey: ["receive-friend"] });
      queryClient.invalidateQueries({ queryKey: ["send-friend"] });
    },
  });
}
