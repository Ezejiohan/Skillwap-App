import type { SkillCategory } from "../types/skill";

export const CATEGORIES: SkillCategory[] = [
  "Technology",
  "Design",
  "Music",
  "Language",
  "Business",
  "Fitness",
  "Cooking",
  "Art",
  "Writing",
  "Other",
];

export const CATEGORY_COLORS: Record<SkillCategory, string> = {
  Technology: "#3b82f6",
  Design: "#a855f7",
  Music: "#f59e0b",
  Language: "#10b981",
  Business: "#f97316",
  Fitness: "#ef4444",
  Cooking: "#84cc16",
  Art: "#ec4899",
  Writing: "#06b6d4",
  Other: "#6b7280",
};

export const CATEGORY_ICONS = {
  Technology: "💻",
  Design: "🎨",
  Music: "🎵",
  Language: "🗣️",
  Business: "📊",
  Fitness: "💪",
  Cooking: "👨‍🍳",
  Art: "🖌️",
  Writing: "✍️",
  Other: "⭐",
};

export const STORAGE_KEY = "skillswap-storage";

export const VALIDATION = {
  MIN_TITLE_LENGTH: 1,
  MAX_TITLE_LENGTH: 100,
  MIN_DESCRIPTION_LENGTH: 20,
  MAX_DESCRIPTION_LENGTH: 500,
  MAX_BIO_LENGTH: 150,
  MAX_TAGS_COUNT: 10,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

export const ANIMATION = {
  REDIRECT_DELAY: 1800,
  TRANSITION_FAST: 0.3,
  TRANSITION_MEDIUM: 0.45,
  TRANSITION_SLOW: 0.65,
};

export const UI = {
  MAX_GRID_COLS_MOBILE: "grid-cols-2",
  MAX_GRID_COLS_SM: "sm:grid-cols-2",
  MAX_GRID_COLS_LG: "lg:grid-cols-3",
};
