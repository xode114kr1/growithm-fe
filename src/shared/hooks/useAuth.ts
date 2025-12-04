import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../../stores/authStore";
import { fetchMe, login, logout } from "../api/auth";
import type { User } from "../../types/userType";

export function useGithubLoginMatation() {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: (code: string) => login(code),
    onSuccess: (res) => {
      setUser(res.data);
      queryClient.setQueryData(["me"], res.data);
    },
  });
}

export function useFetchMe() {
  return useQuery<User>({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await fetchMe();
      return res.data;
    },
    retry: false,
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setUser(null);
      queryClient.removeQueries({ queryKey: ["me"] });
    },
  });
}
