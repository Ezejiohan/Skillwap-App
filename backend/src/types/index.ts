export type SkillType = "offer" | "request";

export type SkillCategory =
  | "Technology" | "Design" | "Music"
  | "Language"   | "Business" | "Fitness"
  | "Cooking"    | "Art" | "Writing" | "Other";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio?: string;
  contact: string;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: string;
  title: string;
  category: SkillCategory;
  description: string;
  type: SkillType;
  tags: string[];
  userId: string;
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSkillRequest {
  title: string;
  category: SkillCategory;
  description: string;
  type: SkillType;
  tags: string[];
}

export interface UpdateSkillRequest {
  title?: string;
  category?: SkillCategory;
  description?: string;
  type?: SkillType;
  tags?: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio?: string;
  contact: string;
}