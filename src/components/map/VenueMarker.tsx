'use client';

import { useState } from 'react';
import { AdvancedMarker, CollisionBehavior } from '@vis.gl/react-google-maps';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Landmark, MoonStar, ShoppingBag } from 'lucide-react';
import type { Venue, VenueType } from '@/types';
import { VENUE_COLORS, VENUE_LABELS } from '@/config/constants';
import { cn } from '@/lib/utils';
import { springs, markerBounceVariants } from '@/lib/animations';

const VENUE_ICON_MAP: Record<VenueType, React.ComponentType<{ className?: string }>> = {
  masjid: Landmark,
  surau: MoonStar,
  bazaar: ShoppingBag,
};

interface VenueMarkerProps {
  venue: Venue;
  isSelected: boolean;
  onClick: (venue: Venue) => void;
}

export function VenueMarker({ venue, isSelected, onClick }: VenueMarkerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const color = VENUE_COLORS[venue.type];
  const accessibleTitle = `${venue.name}, ${VENUE_LABELS[venue.type]}${venue.verified ? ', Verified' : ''}`;
  const IconComponent = VENUE_ICON_MAP[venue.type];

  const zIndex = isSelected ? 200 : isHovered ? 150 : 100;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(venue);
    }
  };

  return (
    <AdvancedMarker
      position={{ lat: venue.lat, lng: venue.lng }}
      onClick={() => onClick(venue)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={accessibleTitle}
      zIndex={zIndex}
      collisionBehavior={CollisionBehavior.REQUIRED_AND_HIDES_OPTIONAL}
    >
      <motion.div
        initial="initial"
        animate={isSelected ? 'selected' : isHovered ? 'hover' : 'animate'}
        variants={markerBounceVariants}
        whileTap={{ scale: 0.95 }}
        transition={springs.snappy}
        className={cn(
          'relative flex items-center justify-center',
          'rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          isSelected ? 'drop-shadow-2xl' : 'drop-shadow-lg',
        )}
        role="button"
        tabIndex={0}
        aria-label={accessibleTitle}
        aria-pressed={isSelected}
        onKeyDown={handleKeyDown}
      >
        {/* Pulse ring for featured venues (hidden when selected) */}
        <AnimatePresence>
          {venue.featured && !isSelected && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              className="absolute inset-0 rounded-full animate-pulse-ring"
              style={{ backgroundColor: color }}
              aria-hidden="true"
            />
          )}
        </AnimatePresence>

        {/* Circular marker with icon */}
        <div className="relative w-10 h-10 flex items-center justify-center">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="20"
              cy="20"
              r="16"
              fill={color}
              stroke="white"
              strokeWidth="3"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <IconComponent className="h-4 w-4 text-white" />
          </div>
        </div>

        {/* Verification badge */}
        <AnimatePresence>
          {venue.verified && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={springs.bouncy}
              className="absolute -top-1 -right-1 rounded-full bg-white shadow-md"
            >
              <CheckCircle2 className="h-5 w-5 text-blue-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AdvancedMarker>
  );
}
