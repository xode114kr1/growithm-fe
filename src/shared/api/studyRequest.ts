import { apiClient } from ".";

interface acceptStudyRequestProps {
  studyRequestId: string;
}

interface rejectStudyRequestProps {
  studyRequestId: string;
}

export async function acceptStudyRequest({ studyRequestId }: acceptStudyRequestProps) {
  const res = await apiClient.post(`/study-request/${studyRequestId}/accept`);
  return res.data;
}

export async function rejectStudyRequest({ studyRequestId }: rejectStudyRequestProps) {
  const res = await apiClient.delete(`/study-request/${studyRequestId}/reject`);
  return res.data;
}

export async function getStudyRequestList() {
  const res = await apiClient("study-request");
  console.log(res.data);
  return res.data;
}
