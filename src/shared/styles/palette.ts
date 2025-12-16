import type {
  BeakjoonTierType,
  GrowithmTierType,
  ProgrammersTierType,
} from "../../types/problemType";

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

export const CARD_TIER_COLOR: Record<GrowithmTierType, string> = {
  bronze: "#CC8846",
  silver: "#C0C0C0",
  gold: "#FFD700",
  platinum: "#A0FFF0",
  diamond: "#DDEBFF",
  ruby: "#FF4F7A",
};

export const TIER_PROGRESS_COLOR: Record<GrowithmTierType, string> = {
  bronze: "#B86E34",
  silver: "#9FA5AD",
  gold: "#E2C24F",
  platinum: "#7ED5C7",
  diamond: "#6AA8FF",
  ruby: "#FF3760",
};
