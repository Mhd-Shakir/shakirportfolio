import { create } from 'zustand';

interface AppState {
  isMenuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  hoveredProject: string | null;
  setHoveredProject: (id: string | null) => void;
}

export const useStore = create<AppState>((set) => ({
  isMenuOpen: false,
  setMenuOpen: (open) => set({ isMenuOpen: open }),
  hoveredProject: null,
  setHoveredProject: (id) => set({ hoveredProject: id }),
}));
