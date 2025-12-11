import { apiClient } from ".";

interface createStudyProps {
  title: string;
  explanation: string;
  members: string[];
}

export async function getStudyList() {
  const res = await apiClient.get("study");
  return res.data;
}

export async function createStudy({ title, explanation, members }: createStudyProps) {
  const res = await apiClient.post("/study", { title, explanation, members });
  console.log(res.data);
  return res.data;
}
