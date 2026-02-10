'use client';

import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { VenueMarker } from './VenueMarker';
import { VenueCard } from '@/components/venue/VenueCard';
import type { Venue } from '@/types';
import { DEFAULT_REGION } from '@/config/regions';
import { useVenueStore } from '@/stores/venueStore';
import { useFilterStore } from '@/stores/filterStore';
import { useMapBounds } from '@/hooks/useMapBounds';
import { useMemo } from 'react';

interface MapContainerProps {
  venues: Venue[];
}

export function MapContainer({ venues }: MapContainerProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
  const { selectedVenue, setSelectedVenue, clearSelectedVenue } = useVenueStore();
  const { activeVenueTypes, showVerifiedOnly } = useFilterStore();
  const mapBounds = useMapBounds();

  // Filter venues based on active filters
  const filteredVenues = useMemo(() => {
    return venues.filter((venue) => {
      // Filter by venue type
      if (!activeVenueTypes.includes(venue.type)) {
        return false;
      }

      // Filter by verification status
      if (showVerifiedOnly && !venue.verified) {
        return false;
      }

      return true;
    });
  }, [venues, activeVenueTypes, showVerifiedOnly]);

  const { center, zoom } = DEFAULT_REGION.mapConfig;

  if (!apiKey) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 max-w-md">
          <h2 className="text-xl font-semibold mb-2">Google Maps API Key Required</h2>
          <p className="text-gray-600">
            Please add your Google Maps API key to the <code className="bg-gray-200 px-2 py-1 rounded">.env.local</code> file.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative">
      <APIProvider apiKey={apiKey}>
        <Map
          mapId="berbuka-map"
          defaultCenter={center}
          defaultZoom={zoom}
          gestureHandling="greedy"
          disableDefaultUI={false}
          {...mapBounds}
          style={{ width: '100%', height: '100%' }}
        >
          {filteredVenues.map((venue) => (
            <VenueMarker
              key={venue.id}
              venue={venue}
              isSelected={selectedVenue?.id === venue.id}
              onClick={setSelectedVenue}
            />
          ))}
        </Map>
      </APIProvider>

      {selectedVenue && (
        <VenueCard venue={selectedVenue} onClose={clearSelectedVenue} />
      )}
    </div>
  );
}
