import type { Problem } from "./problemType";
import type { User } from "./userType";

export interface Study {
  _id: string;
  title: string;
  explanation: string;
  members: User[];
  problems: Problem[];
  score: number;
  createdAd: string;
  owner: User;
}

export interface StudyUserScore {
  _id: string;
  study: Study;
  user: User;
  score: number;
}
