/**
 * Google Maps "Quiet" Style Configuration
 *
 * Desaturates the map background to greyscale so colored venue markers
 * stand out with high contrast. Hides all Points of Interest to eliminate
 * visual competition from business icons, landmarks, etc.
 */
export const quietMapStyle: google.maps.MapTypeStyle[] = [
  // Global desaturation — removes ~80% of color from all map elements
  {
    featureType: 'all',
    elementType: 'all',
    stylers: [{ saturation: -80 }, { lightness: 20 }],
  },
  // Hide all Points of Interest (businesses, landmarks, parks, etc.)
  {
    featureType: 'poi',
    elementType: 'all',
    stylers: [{ visibility: 'off' }],
  },
  // Keep roads visible but subtle — white with slight lightening
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#ffffff' }, { lightness: 10 }],
  },
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [{ visibility: 'simplified' }, { lightness: 50 }],
  },
  // Lighten water to soft grey
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#e0e0e0' }, { lightness: 70 }],
  },
  // Very light grey landscape
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{ color: '#f5f5f5' }, { lightness: 80 }],
  },
  // Administrative borders — keep visible but faint
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [{ visibility: 'on' }, { lightness: 70 }],
  },
];
