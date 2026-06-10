# Preview Project Workflow — Healthsync Medical Solutions

## Prerequisites
- `npm install` has been run (see `build_project.md`)
- Run from: `c:\Users\Asus\Downloads\project`

## Step 1: Start Dev Server

```powershell
npm run dev
```

This runs: `next dev --turbopack -p 9002`

## Step 2: Open Preview

Open in your browser:
- **Local**: http://localhost:9002
- **Network**: http://[your-local-ip]:9002

## Step 3: Pages to Verify

| Page | URL |
|---|---|
| Landing Page | http://localhost:9002/ |
| About | http://localhost:9002/about |
| Products | http://localhost:9002/products |
| Offers | http://localhost:9002/offers |
| Careers | http://localhost:9002/careers |
| Clients | http://localhost:9002/clients |
| Contact | http://localhost:9002/contact |

## Step 4: Landing Page Checklist

- [ ] Navbar renders with logo, navigation links, and "Get a Quote" CTA button
- [ ] Hero section shows medical image (from `/public/images/hero-medical.png`)
- [ ] Three trust badges visible below Hero CTA buttons
- [ ] TrustBar strip appears below Hero (DOH, ISO, 15+ years, 500+ clients, 1k+ products)
- [ ] Overview section shows team photo and stat cards
- [ ] Services Grid shows 6 cards with hover animations
- [ ] Equipment Financing Estimator sliders are interactive
- [ ] AI Product Advisor section shows "Coming Soon" state with category cards
- [ ] CTA section uses navy background with gradient overlay
- [ ] Footer shows all correct links (no `/about-us` 404)
- [ ] Mobile hamburger menu works correctly

## Stopping the Server

Press `Ctrl+C` in the terminal.

## Environment Variables

The AI features require a `GEMINI_API_KEY` in `.env`:
```
GEMINI_API_KEY=your_key_here
```
Without it, the AI Product Advisor shows a graceful "Coming Soon" UI.
