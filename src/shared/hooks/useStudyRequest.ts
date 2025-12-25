import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  acceptStudyRequest,
  getSendStudyRequest,
  getStudyRequestList,
  rejectStudyRequest,
  sendStudyRequest,
} from "../api/studyRequest";
import type { StudyRequest } from "../../types/studyRequestType";

export function useSendStudyRequestMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sendStudyRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["send-study-request"] });
      queryClient.invalidateQueries({ queryKey: ["study-request"] });
    },
  });
}

export function useGetSendStudyRequest({ studyId }: { studyId: string }) {
  return useQuery<StudyRequest[]>({
    queryKey: ["send-study-request"],
    queryFn: async () => {
      const res = await getSendStudyRequest({ studyId });
      return res.data;
    },
  });
}

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
      queryClient.invalidateQueries({ queryKey: ["send-study-request"] });
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
