import { useMemo } from 'react';
import { DEFAULT_REGION } from '@/config/regions';

export function useMapBounds() {
  return useMemo(() => {
    const { bounds } = DEFAULT_REGION.mapConfig;

    return {
      restriction: {
        latLngBounds: bounds,
        strictBounds: false, // Allow slight overflow for better UX
      },
    };
  }, []);
}
