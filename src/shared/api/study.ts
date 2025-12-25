import { apiClient } from ".";

interface createStudyProps {
  title: string;
  explanation: string;
  members: string[];
}

export async function getStudyList() {
  const res = await apiClient.get("/study");
  return res.data;
}

interface getStudyByIdProps {
  studyId: string;
}

export async function getStudyById({ studyId }: getStudyByIdProps) {
  if (!studyId) return;
  const res = await apiClient.get(`/study/${studyId}`);
  return res.data;
}

export async function createStudy({ title, explanation, members }: createStudyProps) {
  const res = await apiClient.post("/study", { title, explanation, members });
  console.log(res.data);
  return res.data;
}

export async function deleteStudy({ studyId }: { studyId: string }) {
  const res = await apiClient.delete(`/study/${studyId}`);
  return res.data;
}

interface getStudyUserScoreByIdProps {
  studyId: string;
}

export async function getStudyUserScoreById({ studyId }: getStudyUserScoreByIdProps) {
  if (!studyId) return;
  const res = await apiClient.get(`/study/user-score/${studyId}`);
  return res.data;
}

export async function leaveStudy({ studyId }: { studyId: string }) {
  const res = await apiClient.delete(`/study/${studyId}/leave`);
  return res.data;
}
