'use client';

/**
 * AnimatedList - Staggered animation container for list items.
 *
 * Wraps a list to animate children with staggered delays.
 * Each child should use AnimatedListItem for the animation to work.
 */

import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainerVariants } from '@/lib/animations';

interface AnimatedListProps {
  children: React.ReactNode;
  className?: string;
  /** Unique key that triggers re-animation when changed (e.g., filter state) */
  animationKey?: string;
}

export function AnimatedList({ children, className, animationKey }: AnimatedListProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={animationKey}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={staggerContainerVariants}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * AnimatedListItem - Individual item wrapper for stagger animations.
 */
import { listItemVariants } from '@/lib/animations';

interface AnimatedListItemProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedListItem({ children, className }: AnimatedListItemProps) {
  return (
    <motion.div variants={listItemVariants} className={className}>
      {children}
    </motion.div>
  );
}
