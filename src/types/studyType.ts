import type { User } from "./userType";

export interface Study {
  _id: string;
  title: string;
  explanation: string;
  members: User[];
  createdAd: string;
  owner: User;
}
