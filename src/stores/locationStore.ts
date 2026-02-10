import { create } from 'zustand';
import type { LocationState, UserLocation } from '@/types';

export const useLocationStore = create<LocationState>((set) => ({
  userLocation: null,
  loading: false,
  error: null,

  setUserLocation: (location: UserLocation | null) =>
    set({ userLocation: location, error: null }),

  setLoading: (loading: boolean) =>
    set({ loading }),

  setError: (error: string | null) =>
    set({ error, loading: false }),

  clearLocation: () =>
    set({ userLocation: null, error: null, loading: false }),
}));
