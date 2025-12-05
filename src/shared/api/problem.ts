import type { Problem } from "../../types/problemType";
import { apiClient } from "./index";

export async function getProblemList() {
  const res = await apiClient.get("/problem");
  return res.data;
}

export async function createSolved(solvedProblem: Problem) {
  const res = await apiClient.post("/solved", { solvedProblem: solvedProblem });
  return res.data;
}
