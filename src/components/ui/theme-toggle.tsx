'use client';

import { useThemeStore, type ThemePreference } from '@/stores/themeStore';
import { Sun, Moon, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme, mounted } = useThemeStore();
  const t = useTranslations('profile');

  const handleThemeChange = (
    e: React.MouseEvent<HTMLButtonElement>,
    newTheme: ThemePreference
  ) => {
    // Skip if same theme
    if (theme === newTheme) return;

    // Capture click position
    const x = e.clientX;
    const y = e.clientY;

    // Set CSS variables for animation origin
    document.documentElement.style.setProperty('--click-x', `${x}px`);
    document.documentElement.style.setProperty('--click-y', `${y}px`);

    // Feature detection: use View Transitions if available
    if (!document.startViewTransition) {
      setTheme(newTheme);
      return;
    }

    // Start view transition with circular reveal
    document.startViewTransition(() => {
      setTheme(newTheme);
    });
  };

  const themeOptions = [
    { value: 'light' as const, icon: Sun, labelKey: 'light' },
    { value: 'dark' as const, icon: Moon, labelKey: 'dark' },
    { value: 'system' as const, icon: Monitor, labelKey: 'system' },
  ];

  return (
    <div className={cn('flex gap-2', className)}>
      {themeOptions.map(({ value, icon: Icon, labelKey }) => (
        <Button
          key={value}
          variant={mounted && theme === value ? 'default' : 'outline'}
          size="sm"
          onClick={(e) => handleThemeChange(e, value)}
          className="flex-1 gap-1.5"
        >
          <Icon className="h-4 w-4" />
          {t(labelKey)}
        </Button>
      ))}
    </div>
  );
}
