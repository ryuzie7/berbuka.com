'use client';

import { useTranslations } from 'next-intl';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useFilterStore } from '@/stores/filterStore';
import type { VenueType } from '@/types';

const VENUE_TYPES: VenueType[] = ['masjid', 'surau', 'bazaar'];

interface FilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FilterSheet({ open, onOpenChange }: FilterSheetProps) {
  const t = useTranslations('filter');
  const tv = useTranslations('venue');
  const {
    activeVenueTypes,
    showVerifiedOnly,
    radius,
    toggleVenueType,
    setShowVerifiedOnly,
    setRadius,
    resetFilters,
  } = useFilterStore();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-2xl">
        <SheetHeader>
          <SheetTitle>{t('title')}</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 py-4">
          {/* Venue type toggles */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">{t('venueType')}</Label>
            <div className="flex flex-wrap gap-2">
              {VENUE_TYPES.map((type) => (
                <Button
                  key={type}
                  variant={activeVenueTypes.includes(type) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleVenueType(type)}
                  className="rounded-full"
                >
                  {tv(type)}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Verified only toggle */}
          <div className="flex items-center justify-between">
            <Label htmlFor="verified-switch" className="text-sm font-medium">
              {t('verifiedOnly')}
            </Label>
            <Switch
              id="verified-switch"
              checked={showVerifiedOnly}
              onCheckedChange={setShowVerifiedOnly}
            />
          </div>

          <Separator />

          {/* Radius slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">{t('searchRadius')}</Label>
              <span className="text-sm text-muted-foreground">{t('radiusValue', { value: radius })}</span>
            </div>
            <Slider
              value={[radius]}
              onValueChange={([value]) => setRadius(value)}
              min={1}
              max={50}
              step={1}
            />
          </div>

          <Separator />

          {/* Action buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={resetFilters}
              className="flex-1"
            >
              {t('reset')}
            </Button>
            <Button
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              {t('apply')}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
