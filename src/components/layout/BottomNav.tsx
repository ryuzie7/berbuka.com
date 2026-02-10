'use client';

import { Map, List, Car, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

type NavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  {
    id: 'explore',
    label: 'Explore',
    icon: <Map className="h-6 w-6" />,
    href: '/',
  },
  {
    id: 'list',
    label: 'List',
    icon: <List className="h-6 w-6" />,
    href: '/list',
  },
  {
    id: 'rides',
    label: 'Rides',
    icon: <Car className="h-6 w-6" />,
    href: '/rides',
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: <User className="h-6 w-6" />,
    href: '/profile',
  },
];

export function BottomNav() {
  const [activeTab, setActiveTab] = useState('explore');

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex justify-around items-center h-16">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              'flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors',
              'min-w-[44px] min-h-[44px]', // Minimum touch target size
              activeTab === item.id
                ? 'text-ramadan-green'
                : 'text-gray-500 hover:text-gray-700'
            )}
            aria-label={item.label}
            aria-current={activeTab === item.id ? 'page' : undefined}
          >
            {item.icon}
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
