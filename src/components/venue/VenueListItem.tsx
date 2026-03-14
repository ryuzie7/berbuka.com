'use client';

import { useTranslations } from 'next-intl';
import { CheckCircle2, Landmark, MoonStar, ShoppingBag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Venue, VenueType } from '@/types';
import { useLocationStore } from '@/stores/locationStore';
import { calculateDistance, formatDistance } from '@/lib/utils';

const VENUE_ICON_MAP: Record<VenueType, React.ComponentType<{ className?: string }>> = {
  masjid: Landmark,
  surau: MoonStar,
  bazaar: ShoppingBag,
};

interface VenueListItemProps {
  venue: Venue;
  isSelected: boolean;
  onClick: (venue: Venue) => void;
}

export function VenueListItem({ venue, isSelected, onClick }: VenueListItemProps) {
  const { userLocation } = useLocationStore();
  const t = useTranslations('venue');
  const IconComponent = VENUE_ICON_MAP[venue.type];

  const distance = userLocation
    ? calculateDistance(userLocation.lat, userLocation.lng, venue.lat, venue.lng)
    : null;

  const maxFacilities = 3;
  const visibleFacilities = venue.facilities?.slice(0, maxFacilities) ?? [];
  const extraCount = (venue.facilities?.length ?? 0) - maxFacilities;

  return (
    <button
      onClick={() => onClick(venue)}
      className={`w-full text-left p-4 flex items-start gap-3 min-h-[44px] transition-colors ${
        isSelected
          ? 'bg-primary/10'
          : 'hover:bg-muted'
      }`}
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
        <IconComponent className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm truncate">{venue.name}</span>
          {venue.verified && (
            <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0" />
          )}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <Badge variant="secondary" className="text-xs">
            {t(venue.type)}
          </Badge>
          {distance !== null && (
            <span className="text-xs text-muted-foreground">
              {formatDistance(distance)}
            </span>
          )}
        </div>
        {visibleFacilities.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {visibleFacilities.map((facility) => (
              <Badge key={facility} variant="outline" className="text-xs py-0">
                {facility}
              </Badge>
            ))}
            {extraCount > 0 && (
              <span className="text-xs text-muted-foreground">+{extraCount} more</span>
            )}
          </div>
        )}
      </div>
    </button>
  );
}
