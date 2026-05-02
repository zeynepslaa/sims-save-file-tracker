# Sims Save File Tracker

A **local-only** web app for Sims 4 players and creators to track worlds, lots, residents (Sims), and build checklists.  
**Stack:** React + Vite + Tailwind CSS. Data lives in **localStorage** (no backend).

---

## Beginner: run the project (step by step)

### 1) Install Node.js

If you don’t have Node yet, install **LTS** from [https://nodejs.org](https://nodejs.org).  
This gives you `npm` in the terminal.

### 2) Open a terminal in this folder

```bash
cd sims-save-file-tracker
```

### 3) Install dependencies

```bash
npm install
```

This reads `package.json` and downloads React, Vite, Tailwind, etc. into `node_modules/`.

### 4) Start the dev server

```bash
npm run dev
```

Vite prints a URL (usually `http://localhost:5173`). Open it in your browser.

### 5) Build for production (optional)

```bash
npm run build
npm run preview
```

`npm run build` creates a `dist/` folder you can host on Netlify, Vercel, GitHub Pages, etc.

### Deploy in a few minutes (Vercel)

1. Push this folder to GitHub (or use Vercel CLI).
2. On [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. **Framework preset:** Vite. **Build command:** `npm run build`. **Output directory:** `dist`.
4. Deploy. The included `vercel.json` rewrites client routes so `/worlds` and deep links work.

### Deploy on Netlify

Same build settings (`npm run build`, publish `dist`). The included `public/_redirects` is copied into `dist` for SPA fallback.

**After deploy:** Share your public URL with Patreon supporters. Point them to **About** (`/about`) for data-privacy and game-sync expectations.

---

## How data is saved

- Key: `sims-save-file-tracker-v1` in **localStorage**
- On every change, the app writes JSON there
- Refreshing the page keeps your data
- Clearing site data / another browser = empty state again

**Backup:** Dashboard → **Download backup (.json)** / **Import backup**.

To **reset everything**, use Dashboard → **Clear saved data** (or delete the localStorage key in DevTools).

---

## Optional: “live” sync with the game (bridge)

The game cannot talk to the browser directly. This project includes a **small local server** that receives updates and the web app **polls** it.

1. Second terminal: `npm run bridge` (listens on `http://localhost:3847`)
2. In the app: **Settings** → enable **Bridge polling**
3. Anything that `POST`s `{ "updates": [ ... ] }` to `/api/push` will be consumed when the app calls `GET /api/pull`

See **`docs/GAME_BRIDGE_TR.md`** (Turkish) for the full picture and a future Sims 4 mod outline.

---

## Project structure (what each folder does)

```
sims-save-file-tracker/
├── index.html              # HTML shell; Vite injects the React app here
├── package.json            # Dependencies and npm scripts
├── vite.config.js          # Vite bundler config
├── tailwind.config.js      # Tailwind theme (colors, fonts)
├── postcss.config.js       # Tailwind PostCSS pipeline
├── src/
│   ├── main.jsx            # React entry: mounts <App /> into #root
│   ├── App.jsx             # Routes + layout provider
│   ├── index.css           # Tailwind layers + global background
│   ├── constants/          # Shared dropdown options (lot type, style)
│   ├── data/               # Preloaded world names + inspiration cards
│   ├── lib/id.js           # Tiny ID helper for new rows
│   ├── hooks/
│   │   └── useSaveTracker.js   # All state + localStorage read/write
│   ├── context/
│   │   └── SaveTrackerContext.jsx  # Makes hook available everywhere
│   ├── components/
│   │   ├── layout/         # Header, shell
│   │   ├── dashboard/      # Stats cards + progress bar
│   │   ├── worlds/         # WorldCard
│   │   ├── lots/           # LotCard, LotChecklist
│   │   ├── residents/    # SimCard (per-lot Sims)
│   │   └── inspiration/    # Inspiration grid
│   └── pages/              # One file per screen (route)
```

---

## Main screens

| Route | Purpose |
|-------|---------|
| `/` | Dashboard: totals + overall % |
| `/worlds` | List worlds + add custom world |
| `/worlds/:id` | Add/list lots for that world |
| `/worlds/:id/lots/:id` | Edit lot, checklist, residents |
| `/inspiration` | Static build idea cards |
| `/about` | What is / isn’t synced; Patreon-friendly notes |
| `/settings` | Optional game bridge polling |

---

## Customizing

- **More worlds in the preload list:** edit `src/data/preloadedWorlds.js`
- **More inspiration cards:** edit `src/data/inspirationIdeas.js`
- **Colors / fonts:** edit `tailwind.config.js` and `src/index.css`

---

## License

Use freely for your personal or Patreon-related tooling.
