import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createStudy, getStudyList } from "../api/study";
import type { Study } from "../../types/studyType";

export function useGetStudyList() {
  return useQuery<Study[]>({
    queryKey: ["study"],
    queryFn: async () => {
      const res = await getStudyList();
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
