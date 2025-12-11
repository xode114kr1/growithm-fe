import { apiClient } from ".";

export async function getStudyRequestList() {
  const res = await apiClient("study-request");
  console.log(res.data);
  return res.data;
}
