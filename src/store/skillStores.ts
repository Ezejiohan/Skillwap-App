import { create } from "zustand";
import type { Skill } from "../types/skill";

interface SkillState {
  skills: Skill[];
  isLoading: boolean;
  error: string | null;
  fetchSkills: () => Promise<void>;
  addSkill: (skill: Omit<Skill, 'id'>) => Promise<void>;
  removeSkill: (id: string) => Promise<void>;
  updateSkill: (id: string, skill: Partial<Skill>) => Promise<void>;
  getSkillById: (id: string) => Skill | undefined;
  clearError: () => void;
}

const API_BASE = 'http://localhost:3001/api';

export const useSkillStore = create<SkillState>((set, get) => ({
  skills: [],
  isLoading: false,
  error: null,

  fetchSkills: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_BASE}/skills`);
      if (!response.ok) throw new Error('Failed to fetch skills');
      const skills = await response.json();
      set({ skills, isLoading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch skills';
      set({ error: message, isLoading: false });
      console.error('Error fetching skills:', error);
    }
  },

  addSkill: async (skillData) => {
    set({ error: null });
    try {
      const response = await fetch(`${API_BASE}/skills`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skillData),
      });
      if (!response.ok) throw new Error('Failed to add skill');
      const newSkill = await response.json();
      set((state) => ({ skills: [newSkill, ...state.skills] }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to add skill';
      set({ error: message });
      console.error('Error adding skill:', error);
    }
  },

  removeSkill: async (id) => {
    set({ error: null });
    try {
      const response = await fetch(`${API_BASE}/skills/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to remove skill');
      set((state) => ({ skills: state.skills.filter((s) => s.id !== id) }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to remove skill';
      set({ error: message });
      console.error('Error removing skill:', error);
    }
  },

  updateSkill: async (id, updates) => {
    set({ error: null });
    try {
      const response = await fetch(`${API_BASE}/skills/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error('Failed to update skill');
      const updatedSkill = await response.json();
      set((state) => ({
        skills: state.skills.map((s) => (s.id === id ? updatedSkill : s)),
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update skill';
      set({ error: message });
      console.error('Error updating skill:', error);
    }
  },

  getSkillById: (id) => {
    return get().skills.find((s) => s.id === id);
  },

  clearError: () => {
    set({ error: null });
  },
}));
