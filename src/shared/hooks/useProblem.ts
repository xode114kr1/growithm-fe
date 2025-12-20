import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  editSolvedProblem,
  getProblemById,
  getProblemList,
  saveSolvedProblem,
  shareProblemToStudys,
} from "../api/problem";
import type { getProblemListParams, Problem } from "../../types/problemType";

export function useGetProblemList({ title, platform, tier, state }: getProblemListParams) {
  return useQuery<Problem[]>({
    queryKey: ["problem-list", title, platform, tier, state],
    queryFn: async () => {
      const res = await getProblemList({ title, platform, tier, state });
      return res.data;
    },
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });
}

export function useSaveSolvedProblem(problemId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: saveSolvedProblem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["problem", problemId] });
    },
  });
}

export function useEditSolvedProblem(problemId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editSolvedProblem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["problem", problemId] });
    },
  });
}

export function useGetProblemById(problemId: string) {
  return useQuery<Problem>({
    queryKey: ["problem", problemId],
    queryFn: async () => {
      const res = await getProblemById(problemId);
      return res.data;
    },
    enabled: !!problemId,
  });
}

export function useShareProblemToStudysMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: shareProblemToStudys,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["study"] });
      queryClient.invalidateQueries({ queryKey: ["problem"] });
    },
  });
}
