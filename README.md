# Kansenradar — De Content Studio

Interactieve marktradar op FEBIAC-inschrijvingen (nieuwe personenwagens, per merk,
jan 2025 → jun 2026). Vier weergaves: kansenmatrix, momentum-ranglijst, merk-verkenner
en merkdossiers met marktcontext en importeur-duiding.

Gebouwd met Vite + React + Recharts.

## Lokaal draaien
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # productie-build in /dist
```

## Online zetten via GitHub + Vercel

**1. Naar GitHub**
```bash
git init
git add .
git commit -m "Kansenradar v1"
git branch -M main
git remote add origin https://github.com/<jouw-account>/kansenradar.git
git push -u origin main
```
(Of: maak de repo aan op github.com en sleep deze map erin via "Add file → Upload files".)

**2. Naar Vercel**
- Ga naar vercel.com → **Add New → Project**.
- Kies de GitHub-repo `kansenradar`.
- Vercel detecteert **Vite** automatisch. Laat de defaults staan:
  - Build Command: `vite build` (of `npm run build`)
  - Output Directory: `dist`
- Klik **Deploy**. Na ±1 minuut staat de tool live op een `*.vercel.app`-URL.

**Eigen domein** (optioneel): Project → Settings → Domains → domein toevoegen
(bv. `radar.decontentstudio.be`) en de DNS-instructie van Vercel volgen.

## Data verversen
De data zit ingebouwd bovenaan `src/App.jsx` (const `DATA`). Voor een nieuwe maand:
vervang dat object en push opnieuw — Vercel herbouwt automatisch.
