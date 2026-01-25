import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStudyMemberById } from "../api/study";

export function useDeleteStudyMemberByIdMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteStudyMemberById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["study"] });
      queryClient.invalidateQueries({ queryKey: ["study-request"] });
    },
  });
}
