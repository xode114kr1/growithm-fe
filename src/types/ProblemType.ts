export type TierType = "bronze" | "silver" | "gold" | "platinum" | "diamond" | "ruby";

export interface PendingProblem {
  _id: string;
  userId: string;
  tier: string;
  title: string;
  problemId: string;
  link: string;
  memory: string;
  time: string;
  description: string;
  code: string;
  createdAt: string;
}

export interface SolvedProblem extends PendingProblem {
  memo: string;
}

export interface GetPendingListResponse {
  message: string;
  data: PendingProblem[];
}
