import type { User } from "./userType";

export interface FriendRequests {
  _id: string;
  from: User;
  to: User;
  createdAt: string;
  updatedAt: string;
}
