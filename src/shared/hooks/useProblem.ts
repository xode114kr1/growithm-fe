import { useQuery } from "@tanstack/react-query";
import { getProblemList } from "../api/problem";
import type { Problem } from "../../types/problemType";

export function useGetProblemList() {
  return useQuery<Problem[]>({
    queryKey: ["problem-list"],
    queryFn: async () => {
      const res = await getProblemList();
      return res.data;
    },
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });
}
