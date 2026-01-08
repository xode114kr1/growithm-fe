import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  editSolvedProblem,
  getProblemById,
  getProblemList,
  getProblemListByUserId,
  saveSolvedProblem,
  shareProblemToStudys,
} from "../api/problem";
import type { getProblemListParams, Problem } from "../../types/problemType";

export type ProblemListResponse = {
  data: Problem[];
  page: number;
  size: number;
  total: number;
  totalPages: number;
  startDate: string;
  endDate: string;
};

export function useGetProblemList({
  title,
  platform,
  tier,
  state,
  size,
  page,
  startDate,
  endDate,
}: getProblemListParams) {
  return useQuery<ProblemListResponse>({
    queryKey: ["problem-list", { title, platform, tier, state, size, page, startDate, endDate }],
    queryFn: async () => {
      const res = await getProblemList({
        title,
        platform,
        tier,
        state,
        size,
        page,
        startDate,
        endDate,
      });
      return res;
    },
  });
}

export function useGetProblemListByUserId({ userId }: { userId: string }) {
  return useQuery<Problem[]>({
    queryKey: ["pending-list", userId],
    queryFn: async () => {
      const res = await getProblemListByUserId({ userId });
      return res.data;
    },
  });
}

export function useSaveSolvedProblem(problemId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: saveSolvedProblem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["problem", problemId] });
      queryClient.invalidateQueries({ queryKey: ["problem-list"] });
    },
  });
}

export function useEditSolvedProblem(problemId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editSolvedProblem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["problem", problemId] });
      queryClient.invalidateQueries({ queryKey: ["problem-list"] });
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
