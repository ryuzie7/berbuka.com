/**
 * Navigation direction store for page transition animations.
 *
 * Tracks whether the user is navigating "forward" (deeper into the app)
 * or "back" (returning to previous views), enabling directional slide animations.
 */

import { create } from 'zustand';

/** Route hierarchy for determining navigation direction */
const routeOrder: Record<string, number> = {
  '/': 0,
  '/map': 1,
  '/list': 2,
  '/profile': 3,
  '/profile/submit-venue': 4,
};

interface NavigationState {
  /** Current route path */
  currentPath: string;
  /** Previous route path */
  previousPath: string | null;
  /** Direction: 1 = forward (right to left), -1 = back (left to right) */
  direction: number;
  /** Update navigation state when route changes */
  setPath: (newPath: string) => void;
}

export const useNavigationStore = create<NavigationState>((set, get) => ({
  currentPath: '/',
  previousPath: null,
  direction: 1,

  setPath: (newPath: string) => {
    const { currentPath } = get();

    // Don't update if same path
    if (newPath === currentPath) return;

    // Calculate direction based on route hierarchy
    const currentOrder = routeOrder[currentPath] ?? 0;
    const newOrder = routeOrder[newPath] ?? 0;
    const direction = newOrder >= currentOrder ? 1 : -1;

    set({
      previousPath: currentPath,
      currentPath: newPath,
      direction,
    });
  },
}));
