import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../../stores/authStore";
import { login } from "../api/auth";

export function useGithubLoginMatation() {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: (code: string) => login(code),
    onSuccess: (data) => {
      setUser(data.user);
      queryClient.setQueryData(["me"], data.user);
    },
  });
}
