'use client';

import { useEffect } from 'react';
import { MapContainer } from '@/components/map/MapContainer';
import { MOCK_VENUES } from '@/data/mock-venues';
import { useGeolocation } from '@/hooks/useGeolocation';
import { registerServiceWorker } from '@/lib/register-sw';

export default function MapPage() {
  // Enable watch mode for real-time location tracking
  useGeolocation(true);

  // Register service worker for PWA functionality
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      registerServiceWorker();
    }
  }, []);

  return (
    <div className="h-full w-full">
      <MapContainer venues={MOCK_VENUES} />
    </div>
  );
}
