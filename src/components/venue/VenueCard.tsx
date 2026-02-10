'use client';

import { X, Navigation, Phone, Users, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Venue } from '@/types';
import { useLocationStore } from '@/stores/locationStore';
import { calculateDistance, formatDistance } from '@/lib/utils';
import { VENUE_LABELS } from '@/config/constants';

interface VenueCardProps {
  venue: Venue;
  onClose: () => void;
}

export function VenueCard({ venue, onClose }: VenueCardProps) {
  const { userLocation } = useLocationStore();

  const distance = userLocation
    ? calculateDistance(
        userLocation.lat,
        userLocation.lng,
        venue.lat,
        venue.lng
      )
    : null;

  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${venue.lat},${venue.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-20 left-0 right-0 z-40 px-4 animate-in slide-in-from-bottom-5">
      <Card className="w-full max-w-2xl mx-auto shadow-2xl">
        <CardHeader className="relative pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <CardTitle className="text-lg">{venue.name}</CardTitle>
                {venue.verified && (
                  <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="text-xs">
                  {VENUE_LABELS[venue.type]}
                </Badge>
                {distance !== null && (
                  <span className="text-sm text-muted-foreground">
                    {formatDistance(distance)}
                  </span>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-11 w-11 -mt-2 -mr-2 flex-shrink-0"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pb-4">
          {venue.description && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {venue.description}
            </p>
          )}

          <div className="space-y-2 text-sm">
            <p className="text-muted-foreground">{venue.address}</p>

            {venue.capacity && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>Capacity: {venue.capacity.toLocaleString()} people</span>
              </div>
            )}

            {venue.contactNumber && (
              <a
                href={`tel:${venue.contactNumber}`}
                className="flex items-center gap-2 text-ramadan-green hover:underline"
              >
                <Phone className="h-4 w-4" />
                <span>{venue.contactNumber}</span>
              </a>
            )}
          </div>

          {venue.facilities && venue.facilities.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {venue.facilities.map((facility) => (
                <Badge key={facility} variant="outline" className="text-xs">
                  {facility}
                </Badge>
              ))}
            </div>
          )}

          <Button
            onClick={handleGetDirections}
            className="w-full bg-ramadan-green hover:bg-ramadan-green/90"
          >
            <Navigation className="h-4 w-4 mr-2" />
            Get Directions
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
