'use client';

/**
 * ScrollReveal - Fade-in animation triggered when element scrolls into view.
 *
 * Uses Intersection Observer via Framer Motion's whileInView.
 * Respects prefers-reduced-motion automatically.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { scrollRevealVariants, springs } from '@/lib/animations';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay before animation starts (in seconds) */
  delay?: number;
  /** How much of the element should be visible before animating (0-1) */
  threshold?: number;
  /** Only animate once, or every time element enters viewport */
  once?: boolean;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  threshold = 0.2,
  once = true,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  // If user prefers reduced motion, render without animation
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={scrollRevealVariants}
      transition={{ ...springs.smooth, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggeredScrollReveal - Container for staggered scroll animations.
 * Children should be wrapped in ScrollRevealItem.
 */
interface StaggeredScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay between each child animation */
  staggerDelay?: number;
}

export function StaggeredScrollReveal({
  children,
  className,
  staggerDelay = 0.1,
}: StaggeredScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollRevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={scrollRevealVariants} className={className}>
      {children}
    </motion.div>
  );
}
