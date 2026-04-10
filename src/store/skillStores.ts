import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Skill } from "../types/skill";
import { STORAGE_KEY } from "../constants";

interface SkillState {
  skills: Skill[];
  addSkill: (skill: Skill) => void;
  removeSkill: (id: string) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  getSkillById: (id: string) => Skill | undefined;
  error: string | null;
  clearError: () => void;
}

export const useSkillStore = create<SkillState>()(
  persist(
    (set, get) => ({
      skills: [],
      error: null,

      addSkill: (skill: Skill) => {
        try {
          // Validate skill object
          if (!skill.id || !skill.title || !skill.category) {
            throw new Error("Invalid skill: missing required fields");
          }

          // Check for duplicates
          const exists = get().skills.some((s: Skill) => s.id === skill.id);
          if (exists) {
            throw new Error("Skill with this ID already exists");
          }

          set(
            (state) => ({
              skills: [skill, ...state.skills],
              error: null,
            }),
            false
          );
        } catch (error) {
          const message = error instanceof Error ? error.message : "Failed to add skill";
          set({ error: message });
          console.error("Error adding skill:", error);
        }
      },

      removeSkill: (id: string) => {
        try {
          set(
            (state) => ({
              skills: state.skills.filter((s) => s.id !== id),
              error: null,
            }),
            false
          );
        } catch (error) {
          const message = error instanceof Error ? error.message : "Failed to remove skill";
          set({ error: message });
          console.error("Error removing skill:", error);
        }
      },

      updateSkill: (id: string, updates: Partial<Skill>) => {
        try {
          const skill = get().getSkillById(id);
          if (!skill) {
            throw new Error(`Skill with ID ${id} not found`);
          }

          set(
            (state) => ({
              skills: state.skills.map((s) =>
                s.id === id ? { ...s, ...updates } : s
              ),
              error: null,
            }),
            false
          );
        } catch (error) {
          const message = error instanceof Error ? error.message : "Failed to update skill";
          set({ error: message });
          console.error("Error updating skill:", error);
        }
      },

      getSkillById: (id: string) => {
        return get().skills.find((s) => s.id === id);
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: STORAGE_KEY,
      onRehydrateStorage: () => (state: SkillState | undefined, error: unknown) => {
        if (error) {
          console.error("Error rehydrating store:", error);
          state?.clearError?.();
        }
      },
    }
  )
);
