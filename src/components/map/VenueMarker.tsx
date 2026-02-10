'use client';

import { AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { CheckCircle2 } from 'lucide-react';
import type { Venue } from '@/types';
import { VENUE_COLORS } from '@/config/constants';

interface VenueMarkerProps {
  venue: Venue;
  isSelected: boolean;
  onClick: (venue: Venue) => void;
}

export function VenueMarker({ venue, isSelected, onClick }: VenueMarkerProps) {
  const color = VENUE_COLORS[venue.type];
  const scale = isSelected ? 1.3 : 1;

  return (
    <AdvancedMarker
      position={{ lat: venue.lat, lng: venue.lng }}
      onClick={() => onClick(venue)}
      title={venue.name}
    >
      <div className="relative" style={{ transform: `scale(${scale})` }}>
        <Pin
          background={color}
          borderColor={color}
          glyphColor="#ffffff"
        />
        {venue.verified && (
          <div className="absolute -top-1 -right-1 bg-white rounded-full">
            <CheckCircle2 className="h-4 w-4 text-blue-500" />
          </div>
        )}
      </div>
    </AdvancedMarker>
  );
}
