import type { VenueType } from '@/types';

export const VENUE_COLORS: Record<VenueType, string> = {
  masjid: '#10b981',  // Emerald green
  surau: '#14b8a6',   // Teal (distinct from masjid)
  bazaar: '#f97316'   // Orange
};

export const VENUE_LABELS: Record<VenueType, string> = {
  masjid: 'Masjid',
  surau: 'Surau',
  bazaar: 'Bazaar Ramadan'
};

export const MIN_TOUCH_TARGET_SIZE = 44; // pixels

export const DEFAULT_RADIUS = 10; // kilometers

export const MAP_STYLES = {
  containerStyle: {
    width: '100%',
    height: '100%'
  }
};
