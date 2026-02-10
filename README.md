# Berbuka.com - Ramadan Community PWA

A mobile-first Progressive Web App for finding Iftar/Moreh locations, Ramadan Bazaars, and Ride Shares during Ramadan. Pilot region: Kinta Utara / Ipoh, Perak.

## Features

- 🗺️ Interactive map with Google Maps integration
- 📍 Real-time geolocation tracking
- 🕌 Find Masjid, Surau, and Ramadan Bazaars
- ✅ Verified venue indicators
- 📱 Mobile-first PWA design
- 🎯 Touch-optimized UI (44x44px minimum targets)
- 🔄 Offline capability (PWA)

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Shadcn/UI
- **Maps:** @vis.gl/react-google-maps
- **State Management:** Zustand
- **Icons:** Lucide React
- **PWA:** next-pwa

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Google Maps API Key ([Get one here](https://console.cloud.google.com/google/maps-apis))

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create `.env.local` file and add your Google Maps API key:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

### Deploying to Vercel

1. Push code to GitHub
2. Import project in Vercel dashboard
3. Add environment variable: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
4. Deploy

## Project Structure

```
src/
├── app/                    # Next.js app router pages
├── components/
│   ├── layout/            # Navigation components
│   ├── map/               # Map and marker components
│   ├── venue/             # Venue detail components
│   └── ui/                # Shadcn/UI components
├── config/                # Configuration files
├── data/                  # Mock data (will be replaced with API)
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── stores/                # Zustand state stores
└── types/                 # TypeScript type definitions
```

## Mock Venues

The app currently displays 5 mock venues in Ipoh:

1. Masjid Negeri Perak
2. Masjid India Muslim Ipoh
3. Politeknik Ungku Omar Musolla
4. Bazaar Ramadan Stadium Indera Mulia
5. Bazaar Ramadan Mydin Meru

## Features Roadmap

### Sprint 1 (Current)
- ✅ Map interface with venue markers
- ✅ Venue detail cards
- ✅ Geolocation tracking
- ✅ Bottom navigation
- ✅ PWA setup

### Sprint 2 (Planned)
- [ ] List view page
- [ ] Filter UI (modal/sheet)
- [ ] Search functionality
- [ ] Backend integration (API/Supabase)
- [ ] User contributions (submit venues)
- [ ] Ride share feature
- [ ] Program schedules (Iftar/Moreh timings)

### Future Enhancements
- [ ] Multi-language support (Malay + English)
- [ ] Dark mode
- [ ] Push notifications
- [ ] User reviews and ratings
- [ ] Photo uploads

## Design Guidelines

- **Mobile-First:** All layouts optimized for 320px+ screens
- **Touch Targets:** Minimum 44x44px for interactive elements
- **Primary Color:** Emerald Green (#10b981)
- **Secondary Color:** Orange (#f97316) for bazaars
- **Verification Badge:** Blue (#3b82f6)

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps API Key | Yes |

## Browser Support

- Chrome/Edge (latest)
- Safari (latest)
- Firefox (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

Built with ❤️ for the Ramadan community
