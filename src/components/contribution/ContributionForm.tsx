'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Venue, FoodStatus, CrowdLevel, VenueContribution } from '@/types';

interface ContributionFormProps {
  venue: Venue;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FOOD_STATUS_OPTIONS: FoodStatus[] = ['available', 'running_low', 'finished'];
const CROWD_LEVEL_OPTIONS: CrowdLevel[] = ['quiet', 'moderate', 'crowded'];

export function ContributionForm({ venue, open, onOpenChange }: ContributionFormProps) {
  const t = useTranslations('contribution');
  const [todaysMenu, setTodaysMenu] = useState('');
  const [foodStatus, setFoodStatus] = useState<FoodStatus>('available');
  const [crowdLevel, setCrowdLevel] = useState<CrowdLevel>('moderate');

  const handleSubmit = () => {
    const contribution: VenueContribution = {
      venueId: venue.id,
      todaysMenu: todaysMenu || undefined,
      foodStatus,
      crowdLevel,
      submittedAt: new Date(),
    };

    // Log to console for now (will be replaced with API call)
    console.log('Venue Contribution:', contribution);

    // Show success toast
    toast.success(t('success'));

    // Reset form and close sheet
    setTodaysMenu('');
    setFoodStatus('available');
    setCrowdLevel('moderate');
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-2xl">
        <SheetHeader>
          <SheetTitle>{t('title')}</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 py-4">
          {/* Today's Menu */}
          <div className="space-y-2">
            <Label htmlFor="todaysMenu">{t('todaysMenu')}</Label>
            <Textarea
              id="todaysMenu"
              placeholder={t('todaysMenuPlaceholder')}
              value={todaysMenu}
              onChange={(e) => setTodaysMenu(e.target.value)}
              rows={3}
            />
          </div>

          {/* Food Status */}
          <div className="space-y-2">
            <Label htmlFor="foodStatus">{t('foodStatus')}</Label>
            <Select value={foodStatus} onValueChange={(v) => setFoodStatus(v as FoodStatus)}>
              <SelectTrigger id="foodStatus">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FOOD_STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status} value={status}>
                    {t(`foodStatusOptions.${status}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Crowd Level */}
          <div className="space-y-2">
            <Label htmlFor="crowdLevel">{t('crowdLevel')}</Label>
            <Select value={crowdLevel} onValueChange={(v) => setCrowdLevel(v as CrowdLevel)}>
              <SelectTrigger id="crowdLevel">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CROWD_LEVEL_OPTIONS.map((level) => (
                  <SelectItem key={level} value={level}>
                    {t(`crowdLevelOptions.${level}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <Button onClick={handleSubmit} className="w-full">
            {t('submit')}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
