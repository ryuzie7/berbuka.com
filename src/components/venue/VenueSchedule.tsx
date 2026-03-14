'use client';

import { useTranslations } from 'next-intl';
import { CalendarDays, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { VenueProgram, ProgramType } from '@/types';

const PROGRAM_BADGE_COLORS: Record<ProgramType, string> = {
  iftar: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
  moreh: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  terawih: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
  tadarus: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  other: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
};

interface VenueScheduleProps {
  programs: VenueProgram[];
}

export function VenueSchedule({ programs }: VenueScheduleProps) {
  const t = useTranslations('program');

  if (programs.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium">
        <CalendarDays className="h-4 w-4 text-primary" />
        <span>{t('title')}</span>
      </div>
      <div className="space-y-2">
        {programs.map((program) => (
          <div
            key={program.id}
            className="flex items-start gap-3 rounded-lg bg-muted/50 p-2.5 text-sm"
          >
            <Clock className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium">{program.name}</span>
                <Badge className={`text-xs ${PROGRAM_BADGE_COLORS[program.type]}`}>
                  {t(program.type)}
                </Badge>
              </div>
              <div className="text-muted-foreground">
                {program.time} · {program.days.join(', ')}
              </div>
              {program.description && (
                <p className="text-muted-foreground/80 text-xs">
                  {program.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
