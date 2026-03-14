/**
 * Reusable animation variants for Framer Motion.
 *
 * Variants define named animation states that can be orchestrated
 * across component hierarchies using AnimatePresence and motion components.
 */

import type { Variants } from 'framer-motion';
import { springs } from './springs';

/**
 * Page transition variants - directional slide based on navigation.
 * Pass direction as custom prop: 1 for forward, -1 for back.
 */
export const pageVariants: Variants = {
  initial: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: springs.gentle,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-50%' : '50%',
    opacity: 0,
    transition: { ...springs.gentle, duration: 0.2 },
  }),
};

/**
 * Bottom sheet / VenueCard variants - slides up from bottom.
 */
export const bottomSheetVariants: Variants = {
  hidden: {
    y: '100%',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: springs.bouncy,
  },
  exit: {
    y: '100%',
    opacity: 0,
    transition: { ...springs.responsive, duration: 0.25 },
  },
};

/**
 * List item variants for stagger animations.
 * Use with parent container's staggerChildren.
 */
export const listItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springs.smooth,
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: { duration: 0.15 },
  },
};

/**
 * Container variants for orchestrating children animations.
 */
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

/**
 * Fade and scale variants for modal/overlay content.
 */
export const fadeScaleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springs.snappy,
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.15 },
  },
};

/**
 * Scroll reveal variants - fade up on scroll into view.
 */
export const scrollRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: springs.smooth,
  },
};

/**
 * Map marker bounce animation.
 */
export const markerBounceVariants: Variants = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: springs.bouncy,
  },
  selected: {
    scale: 1.2,
    transition: springs.snappy,
  },
  hover: {
    scale: 1.1,
    transition: springs.snappy,
  },
};
