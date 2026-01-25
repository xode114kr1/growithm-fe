import { apiClient } from ".";

interface createStudyProps {
  title: string;
  explanation: string;
  members: string[];
}

export async function getStudyList() {
  const res = await apiClient.get("/studies/me");
  return res.data;
}

interface getStudyByIdProps {
  studyId: string;
}

export async function getStudyById({ studyId }: getStudyByIdProps) {
  if (!studyId) return;
  const res = await apiClient.get(`/studies/${studyId}`);
  return res.data;
}

export async function createStudy({ title, explanation, members }: createStudyProps) {
  const res = await apiClient.post("/studies", { title, explanation, members });
  console.log(res.data);
  return res.data;
}

export async function deleteStudy({ studyId }: { studyId: string }) {
  const res = await apiClient.delete(`/studies/${studyId}`);
  return res.data;
}

interface getStudyUserScoreByIdProps {
  studyId: string;
}

export async function getStudyUserScoreById({ studyId }: getStudyUserScoreByIdProps) {
  if (!studyId) return;
  const res = await apiClient.get(`/studies/${studyId}/user-score`);
  return res.data;
}

export async function leaveStudy({ studyId }: { studyId: string }) {
  const res = await apiClient.delete(`/studies/${studyId}/members/me`);
  return res.data;
}

export async function deleteStudyMemberById({
  studyId,
  deleteUserId,
}: {
  studyId: string;
  deleteUserId: string;
}) {
  const res = await apiClient.delete(`/studies/${studyId}/members/${deleteUserId}`);
  return res.data;
}
