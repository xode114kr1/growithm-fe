import { useMutation, useQueryClient } from "@tanstack/react-query";
import { chainingWebhook } from "../api/github";

export function useChainingWebhook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: chainingWebhook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}
