# 🚀 Quick Start Guide

Get Berbuka.com running in 3 minutes!

## Prerequisites

- Node.js 18+ installed
- Google Maps API Key ([Get one free here](https://console.cloud.google.com/google/maps-apis))

## Installation Steps

### 1. Dependencies Already Installed ✅
The project is ready to go! All npm packages are installed.

### 2. Add Your Google Maps API Key

Open `.env.local` and add your API key:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=paste_your_api_key_here
```

**Don't have an API key yet?**
1. Visit [Google Cloud Console](https://console.cloud.google.com/google/maps-apis)
2. Create a project
3. Enable "Maps JavaScript API"
4. Create credentials → API Key
5. Copy the key to `.env.local`

### 3. Run the Development Server

```bash
npm run dev
```

### 4. Open in Browser

Visit [http://localhost:3000](http://localhost:3000)

## What You Should See

✅ A map centered on Ipoh, Perak
✅ 5 venue markers (3 green for masjid/surau, 2 orange for bazaars)
✅ Blue checkmarks on all markers (verified venues)
✅ Bottom navigation with 4 items
✅ Clicking a marker opens a detailed venue card

## Testing the Features

### Click on a Marker
- The marker scales up
- A card slides up from the bottom
- Shows venue details, facilities, and contact info
- "Get Directions" button opens Google Maps

### Test Location Permission
- Browser will ask for location permission
- Allow it to see distance calculations
- Distance appears on venue cards

### Test Bottom Navigation
- 4 tabs: Explore, List, Rides, Profile
- "Explore" is active (green highlight)
- Other tabs are placeholders for Sprint 2

## Building for Production

```bash
npm run build
npm start
```

Then visit [http://localhost:3000](http://localhost:3000) again.

### What's Different in Production?
- Service worker registers (for PWA)
- Optimized bundle size
- Better performance

## Testing PWA Features (Production Only)

1. Build and start production server (see above)
2. Open Chrome DevTools
3. Go to **Application** tab
4. Check:
   - **Manifest** should show "Berbuka.com"
   - **Service Workers** should show registered worker
   - **Icons** should display 192x192 and 512x512 images

## Deploying to Vercel (Recommended)

### Option A: Deploy via Vercel Dashboard
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add environment variable:
   - **Name:** `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
   - **Value:** Your API key
5. Click Deploy
6. Visit the deployed URL

### Option B: Deploy via CLI
```bash
npm install -g vercel
vercel
# Follow the prompts
# When asked for environment variables, add your API key
```

## Testing on Mobile

### Method 1: Use Vercel Deployment
After deploying to Vercel, visit the URL on your mobile device.

### Method 2: Local Network
1. Find your computer's IP address
2. Make sure phone is on same WiFi
3. Visit `http://YOUR_IP:3000` from mobile browser

### Install as PWA on Mobile
1. Visit the site in mobile browser
2. For iOS Safari: Tap share → "Add to Home Screen"
3. For Android Chrome: Tap menu → "Add to Home Screen"
4. The app icon should appear on your home screen

## Common Issues & Solutions

### ❌ "Google Maps API Key Required" Error
**Solution:** Make sure `.env.local` exists and contains the API key

### ❌ Map Doesn't Load
**Solution:**
1. Check that "Maps JavaScript API" is enabled in Google Cloud Console
2. Check browser console for errors
3. Verify API key is correct (no extra spaces)

### ❌ Location Permission Denied
**Solution:**
1. Check browser location settings
2. On mobile, check system location services are enabled
3. For localhost, some browsers require HTTPS for geolocation

### ❌ No Markers Showing
**Solution:**
1. Zoom level might be too far out (should be 13)
2. Check browser console for JavaScript errors
3. Verify Google Maps API key is valid

## Next Steps

✅ **Explore the Code**
- Check `src/data/mock-venues.ts` to see venue data
- Edit `src/config/regions.ts` to change map region
- Modify `tailwind.config.ts` to change colors

✅ **Add More Venues**
- Edit `src/data/mock-venues.ts`
- Add more locations with lat/lng coordinates

✅ **Customize Colors**
- Primary color: `tailwind.config.ts` → `ramadan.green`
- Bazaar color: `src/config/constants.ts` → `VENUE_COLORS.bazaar`

✅ **Prepare for Sprint 2**
- Review `IMPLEMENTATION.md` for roadmap
- Consider backend options (Supabase, Firebase, custom API)

## Support

Found an issue? Check:
1. `SETUP.md` for detailed troubleshooting
2. `README.md` for project overview
3. `IMPLEMENTATION.md` for technical details

---

**Ready to berbuka!** 🌙✨

Enjoy testing the app!
