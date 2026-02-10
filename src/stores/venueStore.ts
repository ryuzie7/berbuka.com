import { create } from 'zustand';
import type { VenueState, Venue } from '@/types';

export const useVenueStore = create<VenueState>((set) => ({
  selectedVenue: null,

  setSelectedVenue: (venue: Venue | null) =>
    set({ selectedVenue: venue }),

  clearSelectedVenue: () =>
    set({ selectedVenue: null }),
}));
