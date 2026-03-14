import type { Region } from '@/types';

export const REGIONS: Record<string, Region> = {
  kinta: {
    id: 'kinta',
    name: 'Kinta Utara',
    state: 'Perak',
    mapConfig: {
      center: { lat: 4.675, lng: 101.080 },  // Meru area center
      zoom: 14,
      bounds: {
        north: 4.70,
        south: 4.65,
        east: 101.10,
        west: 101.06
      }
    }
  }
};

export const DEFAULT_REGION = REGIONS.kinta;
