import type {
  BeakjoonTierType,
  GrowithmTierType,
  ProgrammersTierType,
} from "../../types/problemType";

export const TIER_COLOR: Record<BeakjoonTierType | ProgrammersTierType, string> = {
  bronze: "#CC8846",
  silver: "#C0C0C0",
  gold: "#FFD700",
  platinum: "#A0FFF0",
  diamond: "#DDEBFF",
  ruby: "#FF4F7A",

  "level 1": "#CC8846",
  "level 2": "#C0C0C0",
  "level 3": "#FFD700",
  "level 4": "#A0FFF0",
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

export const TIER_GRADIENT: Record<BeakjoonTierType, string> = {
  bronze: "linear-gradient(135deg, #CC8846, #9E6430)",
  silver: "linear-gradient(135deg, #D9D9D9, #A6A6A6)",
  gold: "linear-gradient(135deg, #FFE56E, #D9B300)",
  platinum: "linear-gradient(135deg, #DDEBFF, #BBD1E8)",
  diamond: "linear-gradient(135deg, #A0FFF0, #59D6C8)",
  ruby: "linear-gradient(135deg, #FF4F7A, #B80D4F)",
};

export const TIER_CARD_STYLE: Record<
  GrowithmTierType,
  {
    bg: string;
    border: string;
    shadow: string;
    hoverBorder: string;
  }
> = {
  bronze: {
    bg: "linear-gradient(135deg, #FFF7ED, #FFE4C7)",
    border: "#E6B98A",
    hoverBorder: "#CC8846",
    shadow: "rgba(204, 136, 70, 0.35)",
  },
  silver: {
    bg: "linear-gradient(135deg, #F9FAFB, #E5E7EB)",
    border: "#D1D5DB",
    hoverBorder: "#9CA3AF",
    shadow: "rgba(156, 163, 175, 0.35)",
  },
  gold: {
    bg: "linear-gradient(135deg, #FFFBEB, #FEF3C7)",
    border: "#FACC15",
    hoverBorder: "#EAB308",
    shadow: "rgba(234, 179, 8, 0.4)",
  },
  platinum: {
    bg: "linear-gradient(135deg, #ECFEFF, #CCFBF1)",
    border: "#5EEAD4",
    hoverBorder: "#2DD4BF",
    shadow: "rgba(45, 212, 191, 0.4)",
  },
  diamond: {
    bg: "linear-gradient(135deg, #EFF6FF, #DBEAFE)",
    border: "#93C5FD",
    hoverBorder: "#3B82F6",
    shadow: "rgba(59, 130, 246, 0.4)",
  },
  ruby: {
    bg: "linear-gradient(135deg, #FFF1F2, #FFE4E6)",
    border: "#FB7185",
    hoverBorder: "#F43F5E",
    shadow: "rgba(244, 63, 94, 0.45)",
  },
};
