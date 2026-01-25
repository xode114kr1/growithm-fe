import { apiClient } from ".";

interface acceptStudyRequestProps {
  studyRequestId: string;
}

interface rejectStudyRequestProps {
  studyRequestId: string;
}

export async function sendStudyRequest({
  studyId,
  inviteUserName,
}: {
  studyId: string;
  inviteUserName: string;
}) {
  const res = await apiClient.post(`/studies/${studyId}/send`, { inviteUserName });
  return res.data;
}

export async function getSendStudyRequest({ studyId }: { studyId: string }) {
  const res = await apiClient.get(`/study-request/send/${studyId}`);
  return res.data;
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
  return res.data;
}
