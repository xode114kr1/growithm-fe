import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStudy } from "../api/study";

export function useCreateStudyMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createStudy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["study"] });
    },
  });
}
