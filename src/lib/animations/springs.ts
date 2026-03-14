/**
 * Spring physics configurations for Framer Motion animations.
 *
 * Spring animations feel more natural than duration-based easing because
 * they simulate real-world physics - objects have mass, tension, and friction.
 */

import type { Transition } from 'framer-motion';

export const springs = {
  /** Quick micro-interactions: button presses, toggles, icon states */
  snappy: { type: 'spring', stiffness: 400, damping: 30 } as Transition,

  /** Entrance animations: VenueCard appearing, modal opening */
  bouncy: { type: 'spring', stiffness: 300, damping: 20 } as Transition,

  /** Page transitions: smooth slide between routes */
  gentle: { type: 'spring', stiffness: 200, damping: 25 } as Transition,

  /** Gesture responses: drag, swipe, pan - needs fast response */
  responsive: { type: 'spring', stiffness: 500, damping: 35 } as Transition,

  /** Slow, deliberate movements: scroll reveals, stagger children */
  smooth: { type: 'spring', stiffness: 150, damping: 20 } as Transition,
} as const;

export type SpringName = keyof typeof springs;
