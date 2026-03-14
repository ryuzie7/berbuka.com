'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import type { Locale } from '@/i18n/config';

export function useLocaleSwitch() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (locale: Locale) => {
    document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=31536000`;
    startTransition(() => {
      router.refresh();
    });
  };

  return { switchLocale, isPending };
}
