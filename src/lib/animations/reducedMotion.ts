/**
 * Reduced motion utilities for accessibility.
 *
 * Respects the user's OS preference for reduced motion.
 * When enabled, animations become instant transitions.
 */

import type { Transition } from 'framer-motion';

/**
 * Instant transition for users who prefer reduced motion.
 */
export const instantTransition: Transition = {
  duration: 0,
};

/**
 * Returns either the provided transition or instant transition
 * based on the reducedMotion parameter.
 */
export function getTransition(
  transition: Transition,
  reducedMotion: boolean | null
): Transition {
  if (reducedMotion) {
    return instantTransition;
  }
  return transition;
}
