import { create } from 'zustand';
import type { MapState } from '@/types';

export const useMapStore = create<MapState>((set) => ({
  theme: 'quiet',
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'quiet' ? 'default' : 'quiet',
    })),
}));
