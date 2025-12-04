import type { GetPendingListResponse } from "../../types/problemType";
import { apiClient } from "./index";

export async function getPendingList(): Promise<GetPendingListResponse> {
  const res = await apiClient.get("/pending");
  return res.data;
}
