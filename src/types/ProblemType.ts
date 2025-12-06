export type TierType = "bronze" | "silver" | "gold" | "platinum" | "diamond" | "ruby";

export interface Problem {
  _id: string;
  userId: string;
  timestamp: string;
  state: "pending" | "solved";
  tier: string;
  title: string;
  problemId: string;
  link: string;
  memory: string;
  time: string;
  description: string;
  code: string;
  memo?: string;
}

export interface GetProblemListResponse {
  message: string;
  data: Problem[];
}
