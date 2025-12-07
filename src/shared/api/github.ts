import { apiClient } from ".";
import type { chainingWebhookProps } from "../../types/githubType";

export async function chainingWebhook({ owner, repo }: chainingWebhookProps) {
  if (!owner || !repo) {
    throw new Error("owner와 repo가 필요합니다.");
  }
  const res = await apiClient.post("/github/webhook/chaining", { owner, repo });
  return res.data;
}
