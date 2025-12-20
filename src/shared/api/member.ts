import { apiClient } from ".";

export async function deleteStudyMemberById({
  studyId,
  deleteUserId,
}: {
  studyId: string;
  deleteUserId: string;
}) {
  const res = await apiClient.delete(
    `/member/owner?studyId=${studyId}&deleteUserId=${deleteUserId}`
  );
  return res.data;
}
