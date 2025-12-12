import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createStudy, getStudyById, getStudyList, getStudyUserScoreById } from "../api/study";
import type { StudyUserScore, Study } from "../../types/studyType";

export function useGetStudyList() {
  return useQuery<Study[]>({
    queryKey: ["study"],
    queryFn: async () => {
      const res = await getStudyList();
      return res.data;
    },
  });
}

export function useGetStudyById({ studyId }: { studyId: string }) {
  return useQuery<Study>({
    queryKey: ["study", studyId],
    queryFn: async () => {
      const res = await getStudyById({ studyId });
      return res.data;
    },
  });
}

export function useCreateStudyMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createStudy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["study"] });
    },
  });
}

export function useGetStudyUserScoreById({ studyId }: { studyId: string }) {
  return useQuery<StudyUserScore[]>({
    queryKey: ["user-score", studyId],
    queryFn: async () => {
      const res = await getStudyUserScoreById({ studyId });
      return res.data;
    },
  });
}
