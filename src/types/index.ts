export type VenueType = 'masjid' | 'surau' | 'bazaar';

export type ProgramType = 'iftar' | 'moreh' | 'terawih' | 'tadarus' | 'other';

export type FoodStatus = 'available' | 'running_low' | 'finished';
export type CrowdLevel = 'quiet' | 'moderate' | 'crowded';

export interface VenueContribution {
  venueId: string;
  todaysMenu?: string;
  foodStatus: FoodStatus;
  crowdLevel: CrowdLevel;
  submittedAt: Date;
}

export interface VenueProgram {
  id: string;
  name: string;
  description?: string;
  time: string;
  days: string[];
  type: ProgramType;
}

export interface Venue {
  id: string;
  name: string;
  type: VenueType;
  lat: number;
  lng: number;
  address: string;
  verified: boolean;
  description?: string;
  capacity?: number;
  facilities?: string[];
  contactNumber?: string;
  featured?: boolean;
  programs?: VenueProgram[];
}

export interface VenueSubmission {
  name: string;
  type: VenueType;
  address: string;
  description: string;
  lat?: number;
  lng?: number;
  facilities: string[];
  contactNumber?: string;
}

export type MapTheme = 'quiet' | 'default';

export interface MapState {
  theme: MapTheme;
  toggleTheme: () => void;
}

export interface MapConfig {
  center: { lat: number; lng: number };
  zoom: number;
  bounds: { north: number; south: number; east: number; west: number };
}

export interface Region {
  id: string;
  name: string;
  state: string;
  mapConfig: MapConfig;
}

export interface UserLocation {
  lat: number;
  lng: number;
  accuracy?: number;
}

export interface LocationState {
  userLocation: UserLocation | null;
  loading: boolean;
  error: string | null;
  setUserLocation: (location: UserLocation | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearLocation: () => void;
}

export interface FilterState {
  activeVenueTypes: VenueType[];
  showVerifiedOnly: boolean;
  radius: number;
  toggleVenueType: (type: VenueType) => void;
  setShowVerifiedOnly: (show: boolean) => void;
  setRadius: (radius: number) => void;
  resetFilters: () => void;
}

export interface VenueState {
  selectedVenue: Venue | null;
  setSelectedVenue: (venue: Venue | null) => void;
  clearSelectedVenue: () => void;
}
