import type { User } from "./userType";

export interface FriendRequests {
  _id: string;
  from: string;
  to: User;
  createdAt: string;
  updatedAt: string;
}
