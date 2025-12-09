export interface User {
  _id: string;
  githubId: string;
  repo?: string;
  name: string;
  email?: string;
  avatarUrl?: string;
}
