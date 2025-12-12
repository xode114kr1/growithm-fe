import type { Problem } from "./problemType";
import type { User } from "./userType";

export interface Study {
  _id: string;
  title: string;
  explanation: string;
  members: User[];
  problem: Problem[];
  score: number;
  createdAd: string;
  owner: User;
}
