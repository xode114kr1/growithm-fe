import type { GrowithmTierType, Problem } from "../../types/problemType";

export const STUDY_TIER_RULES: {
  tier: GrowithmTierType;
  minScore: number;
  maxScore: number;
}[] = [
  {
    tier: "bronze",
    minScore: 0,
    maxScore: 2_249,
  },
  {
    tier: "silver",
    minScore: 2_250,
    maxScore: 112_499,
  },
  {
    tier: "gold",
    minScore: 112_500,
    maxScore: 5_624_999,
  },
  {
    tier: "platinum",
    minScore: 5_625_000,
    maxScore: 281_249_999,
  },
  {
    tier: "diamond",
    minScore: 281_250_000,
    maxScore: Infinity,
  },
];

export const TIER_RULES: {
  tier: GrowithmTierType;
  minScore: number;
  maxScore: number;
}[] = [
  {
    tier: "bronze",
    minScore: 0,
    maxScore: 449,
  },
  {
    tier: "silver",
    minScore: 450,
    maxScore: 22_499,
  },
  {
    tier: "gold",
    minScore: 22_500,
    maxScore: 1_124_999,
  },
  {
    tier: "platinum",
    minScore: 1_125_000,
    maxScore: 56_249_999,
  },
  {
    tier: "diamond",
    minScore: 56_250_000,
    maxScore: Infinity,
  },
];

export function calculateStudyTier(score: number): GrowithmTierType {
  const rule = STUDY_TIER_RULES.find((r) => score < r.maxScore);
  return rule?.tier ?? "bronze";
}

export function getStudyTierRule(score: number) {
  return STUDY_TIER_RULES.find((rule) => score >= rule.minScore && score <= rule.maxScore);
}

export function getStudyTierMaxScore(score: number): number {
  const rule = getStudyTierRule(score);
  return rule?.maxScore ?? 0;
}

export function getProblemTier(problem: Problem): GrowithmTierType {
  if (problem?.platform == "beakjoon") {
    return problem.tier.split(" ")[0].toLowerCase() as GrowithmTierType;
  } else if (problem?.platform == "programmers") {
    if (problem.tier == "level 1") return "bronze";
    if (problem.tier == "level 2") return "silver";
    if (problem.tier == "level 3") return "gold";
    if (problem.tier == "level 4") return "platinum";
  }
  return "bronze";
}

export function getStudyPrograss(score: number): number {
  const maxScore = getStudyTierMaxScore(score);

  if (maxScore == Infinity) return 100;
  return Math.floor((score / (maxScore + 1)) * 100);
}

export function calculateTier(score: number): GrowithmTierType {
  const rule = TIER_RULES.find((r) => score < r.maxScore);
  return rule?.tier ?? "bronze";
}

export function getTierRule(score: number) {
  return TIER_RULES.find((rule) => score >= rule.minScore && score <= rule.maxScore);
}

export function getTierMaxScore(score: number): number {
  const rule = getTierRule(score);
  return rule?.maxScore ?? 0;
}
