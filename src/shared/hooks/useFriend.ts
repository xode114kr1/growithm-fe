import { useQuery } from "@tanstack/react-query";
import { getFriendList } from "../api/friend";
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
