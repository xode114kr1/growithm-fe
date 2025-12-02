export type TierType = "bronze" | "silver" | "gold" | "platinum" | "diamond" | "ruby";

export interface PendingProblem {
  title: string;
  tier: TierType;
}
