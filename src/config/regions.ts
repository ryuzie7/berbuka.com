import type { Region } from '@/types';

export const REGIONS: Record<string, Region> = {
  kinta: {
    id: 'kinta',
    name: 'Kinta Utara',
    state: 'Perak',
    mapConfig: {
      center: { lat: 4.5975, lng: 101.0901 },  // Ipoh center
      zoom: 13,
      bounds: {
        north: 4.65,
        south: 4.54,
        east: 101.15,
        west: 101.03
      }
    }
  }
};

export const DEFAULT_REGION = REGIONS.kinta;
