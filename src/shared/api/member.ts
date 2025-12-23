import { apiClient } from ".";

export async function deleteStudyMemberById({
  studyId,
  deleteUserId,
}: {
  studyId: string;
  deleteUserId: string;
}) {
  const res = await apiClient.delete(`/study/${studyId}/member/${deleteUserId}`);
  return res.data;
}
