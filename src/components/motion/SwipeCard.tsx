'use client';

/**
 * SwipeCard - Swipe-to-dismiss wrapper with spring physics.
 *
 * Features:
 * - Slides up from bottom with bouncy spring
 * - Drag down to dismiss (velocity-based threshold)
 * - Rubber-band effect at top edge
 * - Parallax on content during drag
 */

import { motion, useMotionValue, useTransform, PanInfo, AnimatePresence } from 'framer-motion';
import { springs, bottomSheetVariants } from '@/lib/animations';

interface SwipeCardProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export function SwipeCard({ children, isOpen, onClose, className }: SwipeCardProps) {
  // Track drag distance
  const y = useMotionValue(0);

  // Parallax effect: content moves slightly as card is dragged
  const contentY = useTransform(y, [0, 200], [0, -20]);

  // Opacity fades as card is dragged down
  const opacity = useTransform(y, [0, 150], [1, 0.5]);

  // Scale slightly as dragged
  const scale = useTransform(y, [0, 200], [1, 0.95]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    // Dismiss if dragged down fast enough OR far enough
    const shouldDismiss =
      info.velocity.y > 500 || // Fast downward swipe
      info.offset.y > 100;     // Dragged more than 100px down

    if (shouldDismiss) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={bottomSheetVariants}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0.1, bottom: 0.5 }} // Rubber-band at top
          onDragEnd={handleDragEnd}
          style={{ y, scale }}
          transition={springs.bouncy}
          className={className}
        >
          {/* Drag handle indicator */}
          <div className="flex justify-center pt-2 pb-1">
            <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
          </div>

          {/* Content with parallax */}
          <motion.div style={{ y: contentY, opacity }}>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
