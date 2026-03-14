'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Custom spring configurations for the liquid glass effect.
 * These are tuned specifically for the "bouncy" iOS button feel.
 */
const liquidSprings = {
  /** Stiff spring for immediate press feedback */
  press: { type: 'spring', stiffness: 600, damping: 30 },
  /** Wobbly spring for playful release animation */
  release: { type: 'spring', mass: 1, stiffness: 400, damping: 10 },
  /** Balanced spring for subtle hover lift */
  hover: { type: 'spring', stiffness: 400, damping: 25 },
} as const;

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

interface LiquidButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  /** Glow color for refraction effect (default: white) */
  glowColor?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * LiquidButton - Apple "Liquid Glass" inspired button component.
 *
 * Creates a premium glass-morphism effect with:
 * - Translucent backdrop blur (glass material)
 * - Top specular highlight (curved glass illusion)
 * - Soft colored glow shadow (refraction depth)
 * - Spring physics animations for press/release/hover
 */
export function LiquidButton({
  children,
  glowColor = 'rgba(255,255,255,0.3)',
  size = 'md',
  className,
  ...props
}: LiquidButtonProps) {
  return (
    <motion.button
      whileHover={{
        y: -2,
        transition: liquidSprings.hover,
      }}
      whileTap={{
        scale: 0.9,
        transition: liquidSprings.press,
      }}
      transition={liquidSprings.release}
      className={cn(
        // Base
        'relative overflow-hidden rounded-2xl font-medium',
        // Glass material
        'bg-white/20 backdrop-blur-xl',
        'border border-white/40',
        // Text
        'text-white',
        // Focus ring for accessibility
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50',
        // Disabled state
        'disabled:pointer-events-none disabled:opacity-50',
        // Size
        sizeClasses[size],
        className
      )}
      style={{
        // Refraction glow + inner top highlight
        boxShadow: `0 8px 32px ${glowColor}, inset 0 1px 0 rgba(255,255,255,0.4)`,
      }}
      {...props}
    >
      {/* Specular highlight - simulates light hitting curved glass */}
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Content layer - sits above the highlight */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
