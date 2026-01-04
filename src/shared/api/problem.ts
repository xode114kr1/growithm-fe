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
  const res = await apiClient.get("/problem", {
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
  const res = await apiClient.patch(`/problem/edit/${problemId}`, { memo });
  return res.data;
}

export async function saveSolvedProblem({ problemId, memo }: createSolvedProps) {
  const res = await apiClient.patch(`/problem/solved/${problemId}`, { memo });
  return res.data;
}

export async function getProblemListByUserId({ userId }: { userId: string }) {
  const res = await apiClient.get(`/problem/list/${userId}`);
  return res.data;
}

export async function getProblemById(problemId: string): Promise<ResponseData<Problem>> {
  const res = await apiClient.get(`/problem/${problemId}`);
  return res.data;
}

export async function shareProblemToStudys({ problemId, studyIds }: shareProblemToStudysProps) {
  const res = await apiClient.post("problem/share", { problemId, studyIds });
  return res.data;
}
