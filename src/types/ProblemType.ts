export type BeakjoonTierType = "bronze" | "silver" | "gold" | "platinum" | "diamond" | "ruby";
export type ProgrammersTierType = "level 1" | "level 2" | "level 3" | "level 4";

export interface getProblemListParams {
  title?: string;
  platform?: string;
  tier?: string;
  state?: string;
}

export interface Problem {
  _id: string;
  userId: string;
  timestamp: string;
  categories?: string[];
  state: "pending" | "solved";
  platform: string;
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
