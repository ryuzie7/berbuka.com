import type { Venue } from '@/types';

export const MOCK_VENUES: Venue[] = [
  {
    id: 'masjid-negeri-perak',
    name: 'Masjid Negeri Perak',
    type: 'masjid',
    lat: 4.6084,
    lng: 101.0901,
    address: 'Jalan Panglima Bukit Gantang Wahab, 30000 Ipoh, Perak',
    verified: true,
    description: 'The state mosque of Perak, featuring stunning architecture and spacious prayer halls. Hosts community Iftar programs during Ramadan.',
    capacity: 3000,
    facilities: ['Parking', 'Ablution Facilities', 'Air Conditioning', 'Wheelchair Access'],
    contactNumber: '+605-253-2626'
  },
  {
    id: 'masjid-india-muslim',
    name: 'Masjid India Muslim Ipoh',
    type: 'masjid',
    lat: 4.5975,
    lng: 101.0786,
    address: 'Jalan Masjid, 30300 Ipoh, Perak',
    verified: true,
    description: 'Historic mosque in the heart of Ipoh, known for its Moorish architecture. Offers daily Iftar meals for the community.',
    capacity: 800,
    facilities: ['Parking', 'Ablution Facilities', 'Fan Cooling'],
    contactNumber: '+605-254-3344'
  },
  {
    id: 'puo-musolla',
    name: 'Politeknik Ungku Omar Musolla',
    type: 'surau',
    lat: 4.5532,
    lng: 101.1104,
    address: 'Politeknik Ungku Omar, Jalan Raja Musa Mahadi, 31400 Ipoh, Perak',
    verified: true,
    description: 'Campus prayer hall welcoming students and nearby community for Ramadan activities. Youth-friendly atmosphere.',
    capacity: 300,
    facilities: ['Parking', 'Ablution Facilities', 'Air Conditioning', 'Library'],
    contactNumber: '+605-525-6200'
  },
  {
    id: 'bazaar-stadium-indera-mulia',
    name: 'Bazaar Ramadan Stadium Indera Mulia',
    type: 'bazaar',
    lat: 4.5931,
    lng: 101.0847,
    address: 'Stadium Indera Mulia, Jalan Stadium, 30000 Ipoh, Perak',
    verified: true,
    description: 'One of Ipoh\'s largest Ramadan bazaars with over 200 stalls offering local delicacies, traditional kuih, and fresh juices. Open daily from 3 PM.',
    facilities: ['Parking', 'ATM Nearby', 'Prayer Area', 'Food Court Seating'],
    contactNumber: '+605-208-3333'
  },
  {
    id: 'bazaar-mydin-meru',
    name: 'Bazaar Ramadan Mydin Meru',
    type: 'bazaar',
    lat: 4.6258,
    lng: 101.1251,
    address: 'Mydin Mall Meru Raya, Jalan Meru Bestari, 30020 Ipoh, Perak',
    verified: true,
    description: 'Indoor-outdoor bazaar at Mydin Mall featuring popular vendors and authentic Perak cuisine. Covered areas available during rain.',
    facilities: ['Parking', 'ATM', 'Prayer Area', 'Air Conditioned Mall', 'Wheelchair Access'],
    contactNumber: '+605-528-8888'
  }
];
