# Setup Instructions

## Quick Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Google Maps API Key

Add your Google Maps API key to `.env.local`:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

**How to get a Google Maps API Key:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/google/maps-apis)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Maps SDK for Android (for mobile)
   - Maps SDK for iOS (for mobile)
4. Go to Credentials and create an API key
5. (Optional) Restrict the key to your domain for production

### 3. Generate PWA Icons

The project includes an SVG icon at `public/icons/icon.svg`. You need to convert it to PNG format for PWA support.

**Option A: Use an online tool**
1. Visit [RealFaviconGenerator.net](https://realfavicongenerator.net/)
2. Upload `public/icons/icon.svg`
3. Generate icons
4. Download and extract to `public/icons/`
5. Make sure you have:
   - `icon-192x192.png`
   - `icon-512x512.png`

**Option B: Use ImageMagick (command line)**
```bash
# Install ImageMagick first if not installed
# Then run:
convert public/icons/icon.svg -resize 192x192 public/icons/icon-192x192.png
convert public/icons/icon.svg -resize 512x512 public/icons/icon-512x512.png
```

**Option C: Use Node script** (requires sharp package)
```bash
npm install -D sharp
node scripts/generate-icons.js
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Test PWA Functionality

1. Build the production version:
```bash
npm run build
npm start
```

2. Open Chrome DevTools
3. Go to Application tab
4. Check:
   - ✅ Manifest loaded correctly
   - ✅ Service Worker registered
   - ✅ Icons display properly

### 6. Test on Mobile Device

**Option A: Local Network**
1. Find your computer's IP address
2. Make sure your phone is on the same WiFi
3. Access `http://YOUR_IP:3000` from mobile browser

**Option B: Deploy to Vercel**
1. Push code to GitHub
2. Import to Vercel
3. Add `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` in environment variables
4. Deploy
5. Test PWA install on mobile

## Common Issues

### Issue: "Google Maps API Key Required" message
**Solution:** Make sure `.env.local` exists and contains `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key`

### Issue: Map doesn't load
**Solution:**
1. Check that Maps JavaScript API is enabled in Google Cloud Console
2. Check browser console for errors
3. Verify API key is correct

### Issue: Location permission denied
**Solution:**
1. Check browser location permissions
2. For localhost, use HTTPS or enable insecure origins in Chrome
3. On mobile, ensure location services are enabled

### Issue: PWA icons not showing
**Solution:** Make sure PNG icons are generated (see step 3 above)

### Issue: Service worker not registering
**Solution:**
1. Service workers only work in production (`npm run build && npm start`)
2. Or enable them in development by setting `disable: false` in `next.config.ts`

## Development Tips

### Hot Reload
The development server supports hot reload for all components.

### TypeScript Checking
```bash
npx tsc --noEmit
```

### Linting
```bash
npm run lint
```

### Adding New Venues
Edit `src/data/mock-venues.ts` to add more test venues.

### Changing Map Region
Edit `src/config/regions.ts` to change the default region or add new regions.

### Customizing Colors
Edit `tailwind.config.ts` to change the theme colors.

## Next Steps

After getting the app running:

1. ✅ Test all 5 mock venues appear on map
2. ✅ Click markers to open venue cards
3. ✅ Test "Get Directions" button
4. ✅ Test location permission
5. ✅ Test PWA install on mobile
6. ✅ Verify touch targets feel comfortable
7. ✅ Check responsive design at different screen sizes

## Production Deployment Checklist

- [ ] Google Maps API key added to Vercel environment variables
- [ ] PWA icons generated (192x192 and 512x512)
- [ ] API key restrictions configured in Google Cloud Console
- [ ] Test PWA install on iOS and Android
- [ ] Test offline functionality
- [ ] Run Lighthouse audit (target: PWA score > 85)
- [ ] Test on various screen sizes
- [ ] Verify safe areas on iOS devices
