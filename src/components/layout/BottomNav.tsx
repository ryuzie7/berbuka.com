'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Home, Map, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { springs } from '@/lib/animations';

type NavItem = {
  id: string;
  labelKey: string;
  Icon: React.ComponentType<{ className?: string }>;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  {
    id: 'home',
    labelKey: 'home',
    Icon: Home,
    href: '/',
  },
  {
    id: 'explore',
    labelKey: 'explore',
    Icon: Map,
    href: '/map',
  },
  {
    id: 'profile',
    labelKey: 'profile',
    Icon: User,
    href: '/profile',
  },
];

export function BottomNav() {
  const pathname = usePathname();
  const t = useTranslations('nav');

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex justify-around items-center h-16">
        {NAV_ITEMS.map((item) => {
          const label = t(item.labelKey);
          const active = isActive(item.href);

          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                'relative flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors',
                'min-w-[44px] min-h-[44px]',
                active
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              aria-label={label}
              aria-current={active ? 'page' : undefined}
            >
              {/* Animated background pill - uses layoutId for smooth transition */}
              {active && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-primary/10 rounded-lg"
                  transition={springs.snappy}
                />
              )}

              {/* Icon with scale animation */}
              <motion.div
                animate={{
                  scale: active ? 1.1 : 1,
                }}
                transition={springs.snappy}
              >
                <item.Icon className="h-6 w-6 relative z-10" />
              </motion.div>

              <span className="text-xs font-medium relative z-10">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
