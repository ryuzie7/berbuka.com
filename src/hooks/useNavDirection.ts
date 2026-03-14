'use client';

/**
 * Hook for tracking and updating navigation direction.
 *
 * Use this hook in page components to register route changes
 * and get the current navigation direction for animations.
 */

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useNavigationStore } from '@/stores/navigationStore';

export function useNavDirection() {
  const pathname = usePathname();
  const { direction, setPath } = useNavigationStore();

  useEffect(() => {
    setPath(pathname);
  }, [pathname, setPath]);

  return direction;
}
