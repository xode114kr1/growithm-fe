import type { ResponseData } from "../../types/commonType";
import type { getProblemListParams, Problem } from "../../types/problemType";
import { apiClient } from "./index";

export async function getProblemList({
  title,
  platform,
  tier,
  state,
}: getProblemListParams): Promise<ResponseData<Problem[]>> {
  const res = await apiClient.get("/problem", { params: { title, platform, tier, state } });
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

export async function saveSolvedProblem({ problemId, memo }: createSolvedProps) {
  const res = await apiClient.patch(`/problem/solved/${problemId}`, { memo });
  console.log(res.data);
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
