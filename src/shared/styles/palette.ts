import type { BeakjoonTierType, ProgrammersTierType } from "../../types/problemType";

export const TIER_COLOR: Record<BeakjoonTierType | ProgrammersTierType, string> = {
  bronze: "#B26A2B",
  silver: "#9CA3AF",
  gold: "#D4AF37",
  platinum: "#10B981",
  diamond: "#60A5FA",
  ruby: "#E11D48",

  "level 1": "#B26A2B",
  "level 2": "#9CA3AF",
  "level 3": "#D4AF37",
  "level 4": "#10B981",
};

export const TIER_TINT: Record<BeakjoonTierType | ProgrammersTierType, string> = {
  bronze: "#FFF3E8",
  silver: "#F3F4F6",
  gold: "#FFFAE6",
  platinum: "#E6FFFB",
  diamond: "#EFF6FF",
  ruby: "#FFF1F2",

  "level 1": "#FFF3E8",
  "level 2": "#F3F4F6",
  "level 3": "#FFFAE6",
  "level 4": "#E6FFFB",
};
