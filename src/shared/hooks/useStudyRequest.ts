import { useQuery } from "@tanstack/react-query";
import { getStudyRequestList } from "../api/studyRequest";
import type { StudyRequest } from "../../types/studyRequestType";

export function useGetStudyRequestList() {
  return useQuery<StudyRequest[]>({
    queryKey: ["study-request"],
    queryFn: async () => {
      const res = await getStudyRequestList();
      return res.data;
    },
  });
}
