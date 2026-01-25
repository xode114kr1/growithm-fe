import type { ResponseData } from "../../types/commonType";
import type { getProblemListParams, Problem } from "../../types/problemType";
import { apiClient } from "./index";

export async function getProblemList({
  title,
  platform,
  tier,
  state,
  size,
  page,
  startDate,
  endDate,
}: getProblemListParams) {
  const res = await apiClient.get("/problems/me", {
    params: { title, platform, tier, state, page, size, startDate, endDate },
  });
  return res.data;
}

interface createSolvedProps {
  problemId?: string;
  memo?: string;
}

interface shareProblemToStudysProps {
  problemId: string;
  studyIds: string[];
}

export async function editSolvedProblem({ problemId, memo }: createSolvedProps) {
  const res = await apiClient.patch(`/problems/${problemId}/edit`, { memo });
  return res.data;
}

export async function saveSolvedProblem({ problemId, memo }: createSolvedProps) {
  const res = await apiClient.patch(`/problems/${problemId}/write`, { memo });
  return res.data;
}

export async function getProblemListByUserId({ userId }: { userId: string }) {
  const res = await apiClient.get(`/problems/users/${userId}`);
  return res.data;
}

export async function getProblemById(problemId: string): Promise<ResponseData<Problem>> {
  const res = await apiClient.get(`/problems/${problemId}`);
  return res.data;
}

export async function shareProblemToStudys({ problemId, studyIds }: shareProblemToStudysProps) {
  const res = await apiClient.post(`/problems/${problemId}/share`, { studyIds });
  return res.data;
}

export async function getProblemInfo({ userId }: { userId: string }) {
  const res = await apiClient.get(`/users/${userId}/problem-info`);
  return res.data;
}

export async function getProblemTierStats() {
  const res = await apiClient.get("/problems/me/tier-stats");
  return res.data;
}
