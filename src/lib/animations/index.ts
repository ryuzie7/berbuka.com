/**
 * Animation system exports for berbuka.com
 *
 * Usage:
 *   import { springs, pageVariants, bottomSheetVariants } from '@/lib/animations';
 */

export { springs, type SpringName } from './springs';
export {
  pageVariants,
  bottomSheetVariants,
  listItemVariants,
  staggerContainerVariants,
  fadeScaleVariants,
  scrollRevealVariants,
  markerBounceVariants,
} from './variants';
export { instantTransition, getTransition } from './reducedMotion';
