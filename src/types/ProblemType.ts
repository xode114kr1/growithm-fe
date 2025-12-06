export type BeakjoonTierType = "bronze" | "silver" | "gold" | "platinum" | "diamond" | "ruby";
export type ProgrammersTierType = "level 1" | "level 2" | "level 3" | "level 4";

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
