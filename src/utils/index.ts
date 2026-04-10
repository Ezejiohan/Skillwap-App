import { CATEGORY_COLORS } from "../constants";
import type { SkillCategory } from "../types/skill";

/**
 * Generates a two-letter avatar from a name
 * @param name User's full name
 * @returns Two-letter uppercase string
 */
export const generateAvatar = (name: string): string => {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
};

/**
 * Gets color for a skill category
 * @param category Skill category
 * @returns Hex color code
 */
export const getCategoryColor = (category: SkillCategory): string => {
  return CATEGORY_COLORS[category] ?? CATEGORY_COLORS.Other;
};

/**
 * Parses comma-separated tags and sanitizes them
 * @param tagsRaw Raw comma-separated string
 * @returns Cleaned array of tags
 */
export const parseTags = (tagsRaw: string, maxTags: number = 10): string[] => {
  return tagsRaw
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0)
    .slice(0, maxTags);
};

/**
 * Formats a date for display
 * @param dateString ISO date string
 * @returns Formatted date string (e.g., "Mar 15, 2026")
 */
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  } catch {
    return "Unknown date";
  }
};

/**
 * Validates email format
 * @param email Email string to validate
 * @returns true if valid email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Sanitizes text to prevent XSS attacks
 * @param text Text to sanitize
 * @returns Sanitized text
 */
export const sanitizeText = (text: string): string => {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
};

/**
 * Truncates text to a maximum length with ellipsis
 * @param text Text to truncate
 * @param maxLength Maximum length before truncation
 * @returns Truncated text
 */
export const truncate = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "…";
};

/**
 * Gets a readable skill type label
 * @param type Skill type ("offer" | "request")
 * @returns Readable label
 */
export const getSkillTypeLabel = (type: "offer" | "request"): string => {
  return type === "offer" ? "Offering" : "Requesting";
};
