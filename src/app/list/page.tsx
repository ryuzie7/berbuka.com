'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { MapPin } from 'lucide-react';
import { MOCK_VENUES } from '@/data/mock-venues';
import { VenueListItem } from '@/components/venue/VenueListItem';
import { VenueCard } from '@/components/venue/VenueCard';
import { SearchBar } from '@/components/search/SearchBar';
import { FilterButton } from '@/components/filter/FilterButton';
import { AnimatedList, AnimatedListItem } from '@/components/motion';
import { useFilterStore } from '@/stores/filterStore';
import { useLocationStore } from '@/stores/locationStore';
import { useVenueStore } from '@/stores/venueStore';
import { calculateDistance } from '@/lib/utils';

export default function ListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const t = useTranslations('venue');
  const { activeVenueTypes, showVerifiedOnly, radius } = useFilterStore();
  const { userLocation } = useLocationStore();
  const { selectedVenue, setSelectedVenue, clearSelectedVenue } = useVenueStore();

  const filteredVenues = useMemo(() => {
    let venues = MOCK_VENUES.filter((venue) => {
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

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      venues = venues.filter(
        (v) =>
          v.name.toLowerCase().includes(query) ||
          v.address.toLowerCase().includes(query) ||
          v.description?.toLowerCase().includes(query)
      );
    }

    if (userLocation) {
      venues.sort((a, b) => {
        const distA = calculateDistance(userLocation.lat, userLocation.lng, a.lat, a.lng);
        const distB = calculateDistance(userLocation.lat, userLocation.lng, b.lat, b.lng);
        return distA - distB;
      });
    }

    return venues;
  }, [activeVenueTypes, showVerifiedOnly, radius, userLocation, searchQuery]);

  return (
    <div className="h-full flex flex-col">
      <div className="sticky top-0 z-30 bg-background border-b border-border p-3 space-y-2">
        <div className="flex items-center gap-2">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <FilterButton />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredVenues.length > 0 ? (
          <AnimatedList
            animationKey={`${searchQuery}-${activeVenueTypes.join()}-${showVerifiedOnly}-${radius}`}
            className="divide-y divide-border"
          >
            {filteredVenues.map((venue) => (
              <AnimatedListItem key={venue.id}>
                <VenueListItem
                  venue={venue}
                  isSelected={selectedVenue?.id === venue.id}
                  onClick={setSelectedVenue}
                />
              </AnimatedListItem>
            ))}
          </AnimatedList>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <MapPin className="h-12 w-12 text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground font-medium">{t('noVenuesFound')}</p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              {t('noVenuesHint')}
            </p>
          </div>
        )}
      </div>

      {selectedVenue && (
        <VenueCard venue={selectedVenue} onClose={clearSelectedVenue} />
      )}
    </div>
  );
}
