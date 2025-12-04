import { useQuery } from "@tanstack/react-query";
import { getPendingList } from "../api/problem";
import type { PendingProblem } from "../../types/problemType";

export function useGetPendingList() {
  return useQuery<PendingProblem[]>({
    queryKey: ["pendingList"],
    queryFn: async () => {
      const res = await getPendingList();
      return res.data;
    },
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });
}
