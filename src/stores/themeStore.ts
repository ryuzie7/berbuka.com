'use client';

import { useTheme } from 'next-themes';
import { useCallback, useEffect, useState } from 'react';

export type ThemePreference = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: ThemePreference;
  setTheme: (theme: ThemePreference) => void;
  mounted: boolean;
}

export function useThemeStore(): ThemeState {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSetTheme = useCallback((newTheme: ThemePreference) => {
    setTheme(newTheme);
  }, [setTheme]);

  return {
    theme: (theme as ThemePreference) ?? 'system',
    setTheme: handleSetTheme,
    mounted,
  };
}
