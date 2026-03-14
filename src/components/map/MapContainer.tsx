'use client';

import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { Palette } from 'lucide-react';
import { VenueMarker } from './VenueMarker';
import { VenueCard } from '@/components/venue/VenueCard';
import { FilterButton } from '@/components/filter/FilterButton';
import { Button } from '@/components/ui/button';
import type { Venue } from '@/types';
import { DEFAULT_REGION } from '@/config/regions';
import { quietMapStyle } from '@/config/map-style';
import { useVenueStore } from '@/stores/venueStore';
import { useFilterStore } from '@/stores/filterStore';
import { useLocationStore } from '@/stores/locationStore';
import { useMapStore } from '@/stores/mapStore';
import { useMapBounds } from '@/hooks/useMapBounds';
import { calculateDistance } from '@/lib/utils';
import { useMemo } from 'react';

interface MapContainerProps {
  venues: Venue[];
}

export function MapContainer({ venues }: MapContainerProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
  const { selectedVenue, setSelectedVenue, clearSelectedVenue } = useVenueStore();
  const { activeVenueTypes, showVerifiedOnly, radius } = useFilterStore();
  const { userLocation } = useLocationStore();
  const { theme, toggleTheme } = useMapStore();
  const mapBounds = useMapBounds();

  // Filter venues based on active filters
  const filteredVenues = useMemo(() => {
    return venues.filter((venue) => {
      if (!activeVenueTypes.includes(venue.type)) return false;
      if (showVerifiedOnly && !venue.verified) return false;
      if (userLocation) {
        const dist = calculateDistance(
          userLocation.lat, userLocation.lng,
          venue.lat, venue.lng
        );
        if (dist > radius) return false;
      }
      return true;
    });
  }, [venues, activeVenueTypes, showVerifiedOnly, radius, userLocation]);

  const { center, zoom } = DEFAULT_REGION.mapConfig;

  if (!apiKey) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-muted">
        <div className="text-center p-8 max-w-md">
          <h2 className="text-xl font-semibold mb-2">Google Maps API Key Required</h2>
          <p className="text-muted-foreground">
            Please add your Google Maps API key to the <code className="bg-secondary px-2 py-1 rounded">.env.local</code> file.
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
          styles={theme === 'quiet' ? quietMapStyle : undefined}
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

      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className="bg-background shadow-md h-11 w-11"
          aria-label={theme === 'quiet' ? 'Switch to colorful map' : 'Switch to quiet map'}
        >
          <Palette className="h-5 w-5" />
        </Button>
        <FilterButton />
      </div>

      {selectedVenue && (
        <VenueCard venue={selectedVenue} onClose={clearSelectedVenue} />
      )}
    </div>
  );
}
