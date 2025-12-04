import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../../stores/authStore";
import { fetchMe, login, logout } from "../api/auth";
import type { User } from "../../types/userType";
import { useEffect } from "react";

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
  const setUser = useAuthStore((s) => s.setUser);
  const setInitialized = useAuthStore((s) => s.setInitialized);

  const query = useQuery<User>({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await fetchMe(); // axios.get(...)
      return res.data; // User
    },
    retry: false,
  });

  const { data, isSuccess, isError } = query;

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data);
      setInitialized();
    }
    if (isError) {
      setUser(null);
      setInitialized();
    }
  }, [isSuccess, isError, data, setUser, setInitialized]);

  return query;
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
