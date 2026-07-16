# NA Daily Inventory

A private, anonymous daily 10th-step inventory tool for members of Narcotics Anonymous,
based on IP #9 *"Living the Program"*. Live at **https://nadailyinventory.com**.

Nothing you write is ever sent to a server. Drafts and saved entries live **only on your
device**. You can download a PDF of any inventory.

## Stack

Universal **Expo (SDK 54) + Expo Router** app — one TypeScript codebase targets **web,
iOS, and Android**.

- **Web** is a statically-rendered site (`web.output: "static"` in `app.json`), so every
  route is pre-rendered to real, indexable HTML for SEO.
- **On-device storage** via AsyncStorage (localStorage on web, native store on device).
- **PDF export** via `expo-print` + `expo-sharing`.

## Project layout

```
src/
  app/                 Expo Router routes (file-based)
    _layout.tsx        Header + Footer shell, InventoryProvider
    +html.tsx          Global <head> / SEO / PWA tags (web only)
    index.tsx          Menu / landing
    inventory/[step].tsx   The inventory form (steps 0–6, pre-rendered)
    basic-text.tsx / it-works.tsx   Step 10 reading pages
    about.tsx / history.tsx
    bt.tsx / gg.tsx    Redirects from legacy URLs
  components/          Header, Footer, Screen, Seo, PromptField, Button, …
  data/                fullText.ts (inventory content), readings.ts
  services/            storage.ts (device persistence), exportPdf.ts
  store/               inventory.tsx (answers context + draft autosave)
  constants/theme.ts   Brand palette + spacing
public/                robots.txt, sitemap.xml, manifest.json, icons
```

## Develop

```bash
npm install
npm run web      # web dev server (http://localhost:8081)
npm run ios      # iOS simulator (needs Xcode)
npm run android  # Android emulator
```

## Build the website

```bash
npm run build:web   # → static site in ./dist
```

Deploy `dist/` to any static host (Vercel / Netlify / Cloudflare Pages). **Enable
"clean URLs"** on the host so `/basic-text` serves `basic-text.html` (Vercel: `"cleanUrls": true`).
For SEO, also configure host-level 301s from the legacy `/bt` and `/gg` paths (client-side
redirect routes are included as a fallback).

## Ship to the app stores (next phase)

The same code builds native apps via EAS:

```bash
npx eas build -p ios
npx eas build -p android
```

App icons/splash and store listings still need real branding (currently placeholder Expo art).

## License & content

The code is MIT-licensed and open-source. All inventory and Step 10 text is copyright
Narcotics Anonymous World Services, Inc. This app is not officially endorsed by NA World Services.
