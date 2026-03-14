'use client';

/**
 * AnimatedPage - Wrapper for page-level transitions.
 *
 * Wraps page content to animate in/out based on navigation direction.
 * Uses the navigation store to determine if we're going forward or back.
 */

import { motion } from 'framer-motion';
import { useNavDirection } from '@/hooks/useNavDirection';
import { pageVariants, springs } from '@/lib/animations';

interface AnimatedPageProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedPage({ children, className }: AnimatedPageProps) {
  const direction = useNavDirection();

  return (
    <motion.div
      custom={direction}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={springs.gentle}
      className={className}
    >
      {children}
    </motion.div>
  );
}
