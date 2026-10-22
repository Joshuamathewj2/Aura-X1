# AURA X1: Concept Product Launch Page

An Apple-style launch page for **AURA X1**, a fictional pair of premium wireless earbuds, built to practise scroll-driven storytelling and real-time 3D on the web.

> Concept project: AURA X1 is not a real product.

## What's on the page

| Section | Technique |
|---|---|
| **Hero** | A 180-frame image sequence drawn to `<canvas>` and scrubbed by scroll with GSAP `ScrollTrigger`; frames are preloaded and drawn cover-fit |
| **Sound showcase** | Framer Motion `useScroll` / `useTransform` parallax tied to scroll progress |
| **360° viewer** | Earbud modelled from primitives in React Three Fiber (`sphereGeometry`, `capsuleGeometry`, `meshPhysicalMaterial`), drag-to-rotate via drei `PresentationControls` |
| **Adaptive ANC demo** | Interactive toggle that visualises noise cancellation on and off |
| **Smart features** | Animated feature grid (calls, fast charging, Find My, instant pairing, sweat proof, wind reduction) |
| **Pricing** | Plan cards |
| **Smooth scroll** | Lenis momentum scrolling wrapped around the whole page |

## Tech stack

Next.js (App Router) · React 19 · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger · Framer Motion · React Three Fiber / drei · Lenis · lucide-react

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build && npm start   # production build
npm run lint
```

## Project structure

```
src/
  app/            layout, global styles, page composition
  components/
    Hero.tsx            scroll-scrubbed canvas frame sequence
    SoundShowcase.tsx   scroll-linked parallax
    ThreeDViewer.tsx    React Three Fiber earbud model
    ANCShowcase.tsx     noise-cancellation demo
    SmartFeatures.tsx   feature grid
    PriceList.tsx       pricing cards
    Navbar.tsx, SmoothScroll.tsx
public/frames/    180 JPEG frames for the hero sequence
```
