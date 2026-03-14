'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FilterSheet } from './FilterSheet';
import { useFilterStore } from '@/stores/filterStore';
import { DEFAULT_RADIUS } from '@/config/constants';

export function FilterButton() {
  const [open, setOpen] = useState(false);
  const t = useTranslations('filter');
  const { activeVenueTypes, showVerifiedOnly, radius } = useFilterStore();

  let activeCount = 0;
  if (activeVenueTypes.length < 3) activeCount++;
  if (showVerifiedOnly) activeCount++;
  if (radius !== DEFAULT_RADIUS) activeCount++;

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setOpen(true)}
        className="relative h-10 w-10 flex-shrink-0"
        aria-label={t('filterVenues')}
      >
        <SlidersHorizontal className="h-4 w-4" />
        {activeCount > 0 && (
          <Badge className="absolute -top-1.5 -right-1.5 h-5 w-5 p-0 flex items-center justify-center text-xs">
            {activeCount}
          </Badge>
        )}
      </Button>
      <FilterSheet open={open} onOpenChange={setOpen} />
    </>
  );
}
