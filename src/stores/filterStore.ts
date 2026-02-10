import { create } from 'zustand';
import type { FilterState, VenueType } from '@/types';
import { DEFAULT_RADIUS } from '@/config/constants';

export const useFilterStore = create<FilterState>((set) => ({
  activeVenueTypes: ['masjid', 'surau', 'bazaar'],
  showVerifiedOnly: false,
  radius: DEFAULT_RADIUS,

  toggleVenueType: (type: VenueType) =>
    set((state) => ({
      activeVenueTypes: state.activeVenueTypes.includes(type)
        ? state.activeVenueTypes.filter((t) => t !== type)
        : [...state.activeVenueTypes, type],
    })),

  setShowVerifiedOnly: (show: boolean) =>
    set({ showVerifiedOnly: show }),

  setRadius: (radius: number) =>
    set({ radius }),

  resetFilters: () =>
    set({
      activeVenueTypes: ['masjid', 'surau', 'bazaar'],
      showVerifiedOnly: false,
      radius: DEFAULT_RADIUS,
    }),
}));
