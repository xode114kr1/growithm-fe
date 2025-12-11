import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptStudyRequest, getStudyRequestList, rejectStudyRequest } from "../api/studyRequest";
import type { StudyRequest } from "../../types/studyRequestType";

export function useAcceptStudyRequestMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: acceptStudyRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["study-request"] });
      queryClient.invalidateQueries({ queryKey: ["study"] });
    },
  });
}

export function useRejectStudyRequestMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: rejectStudyRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["study-request"] });
    },
  });
}

export function useGetStudyRequestList() {
  return useQuery<StudyRequest[]>({
    queryKey: ["study-request"],
    queryFn: async () => {
      const res = await getStudyRequestList();
      return res.data;
    },
  });
}
