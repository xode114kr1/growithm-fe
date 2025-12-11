import type { Study } from "./studyType";
import type { User } from "./userType";

export interface StudyRequest {
  _id: string;
  studyId: Study;
  userId: User;
  state: "pending" | "accepted" | "rejected";
}
