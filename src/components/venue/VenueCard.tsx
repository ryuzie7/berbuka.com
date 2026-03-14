'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { X, Navigation, Phone, Users, CheckCircle2, Edit3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SwipeCard } from '@/components/motion';
import type { Venue } from '@/types';
import { VenueSchedule } from './VenueSchedule';
import { ContributionForm } from '@/components/contribution/ContributionForm';
import { useLocationStore } from '@/stores/locationStore';
import { calculateDistance, formatDistance } from '@/lib/utils';

interface VenueCardProps {
  venue: Venue;
  onClose: () => void;
}

export function VenueCard({ venue, onClose }: VenueCardProps) {
  const { userLocation } = useLocationStore();
  const t = useTranslations('venue');
  const [showContribution, setShowContribution] = useState(false);

  const distance = userLocation
    ? calculateDistance(
        userLocation.lat,
        userLocation.lng,
        venue.lat,
        venue.lng
      )
    : null;

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [onClose]);

  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${venue.lat},${venue.lng}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <SwipeCard
        isOpen={true}
        onClose={onClose}
        className="fixed bottom-20 left-0 right-0 z-40 px-4"
      >
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
                    {t(venue.type)}
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
                  <span>{t('capacity', { count: venue.capacity.toLocaleString() })}</span>
                </div>
              )}

              {venue.contactNumber && (
                <a
                  href={`tel:${venue.contactNumber}`}
                  className="flex items-center gap-2 text-primary hover:underline"
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

            {venue.programs && venue.programs.length > 0 && (
              <VenueSchedule programs={venue.programs} />
            )}

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowContribution(true)}
                className="flex-1"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                {t('contribute')}
              </Button>
              <Button
                onClick={handleGetDirections}
                className="flex-1"
              >
                <Navigation className="h-4 w-4 mr-2" />
                {t('getDirections')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </SwipeCard>

      <ContributionForm
        venue={venue}
        open={showContribution}
        onOpenChange={setShowContribution}
      />
    </>
  );
}
