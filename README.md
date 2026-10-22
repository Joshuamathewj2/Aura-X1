# AURA X1: Concept Product Launch Page

An editorial, award-style launch page for **AURA X1**, a fictional pair of premium wireless earbuds, reimagined from the ground up in the distinctive design language inspired by the author's own **Red Velvet** site (`https://boisterous-praline-6e4ce1.netlify.app/`).

> **Concept Project**: AURA X1 is a concept audio product demonstrating advanced web animation, scroll-driven storytelling, and high-end editorial UI engineering.

---

## Design Language & System

The aesthetic adapts the refined, high-impact editorial techniques of Red Velvet into a sophisticated industrial audio launch experience:

- **Preloader**: Giant condensed wordmark `AURA X1.` with an illuminated signal orange accent full stop and an animated underline that draws smoothly before peeling open with a clip-path reveal.
- **Typography**:
  - **Display**: [Anton](https://fonts.google.com/specimen/Anton) for monumental condensed headlines (`font-display`).
  - **Body**: [DM Sans](https://fonts.google.com/specimen/DM+Sans) for crisp, readable technical and editorial copy (`font-body`).
  - **Script Accent**: [Yellowtail](https://fonts.google.com/specimen/Yellowtail) for expressive cursive lead-ins (`font-script`).
  - **Signature Outlined Text**: Dual-line headline treatment repeating words in transparent fill with sharp text-stroke (`-webkit-text-stroke: 2px currentColor`), establishing high contrast without visual clutter.
- **Colour Palette**:
  - **Silver Mist** (`#E9E9E6`): Clean, technical light grey matching studio product photography.
  - **Graphite** (`#121314`): Deep, ink-dark backdrop for internal component deep-dives and footer.
  - **Off-White** (`#F6F5F1`): Warm porcelain light tone for lineup and feature cards.
  - **Deep Accent** (`#1B1F2A`): Acoustic chamber blue-black for the Active Noise Cancellation demonstration.
  - **Signal Orange** (`#FF5A1F`): Singular high-energy accent for full stops, interactive toggles, primary CTA buttons, and status indicators.
- **Dynamic Color-Blocked Navigation**:
  - Fixed top navigation detects the active underlying section via `data-nav` attributes and an `IntersectionObserver` / scroll hook (`useNavTheme`).
  - Automatically flips between dark text (`#121314`) on light sections and light text (`#F6F5F1`) on dark sections.
  - Mobile full-screen navigation utilizes a circular clip-path transition anchored to the burger button.
- **Drifting Background Typographic Marquee**:
  - Massive low-contrast outlined display words (`PURE SOUND`, `AURA X1`, `EXPLODED ARCHITECTURE`) drift horizontally in opposite directions as the user scrolls.
- **Magnetic Micro-Interactions & Desktop Cursor**:
  - Interactive pill buttons with magnetic mouse-tracking and slide-up color fills.
  - Ambient orange cursor glow follower for fine pointer devices (`(hover: hover) and (pointer: fine)`).
  - Respects `prefers-reduced-motion` everywhere (disabling scrub pinning, particle drift, magnetic translation, and cursor followers).

---

## Page Structure & Sections

| # | Section | Theme | Key Features & Techniques |
|---|---|---|---|
| 1 | **Hero** | Silver Mist (`#E9E9E6`)<br>`data-nav="dark"` | Cursive lead-in *"Hear what you've been missing"*, monumental `PURE / SOUND.` outlined headline, large intact earbud render (frame 001) with 8% watermark crop, floating specks, and spec chips. |
| 2 | **"More than earbuds"** | Graphite (`#121314`)<br>`data-nav="light"` | Editorial narrative and 4-column component card showcase (**Acoustic Driver**, **Audio SoC**, **Micro-Cell Battery**, **Titanium Enclosure**) with hover lifts and precision-cropped teardown renders. |
| 3 | **TEARDOWN (Pinned Scroll Scene)** | Silver Mist (`#E9E9E6`)<br>`data-nav="dark"` | The centerpiece scene: pins for ~250vh while a `<canvas>` scrubs frames 1→180 using GSAP `ScrollTrigger`. Earbud explodes smoothly into individual components while synchronized milestone callouts illuminate (*Titanium Stem*, *Audio SoC*, *Energy Core*, *11mm Graphene Driver*). Includes accessible fallback slider when `prefers-reduced-motion` is active. |
| 4 | **Signature Lineup** | Off-White (`#F6F5F1`)<br>`data-nav="dark"` | Bento grid featuring the flagship **AURA X1 Pro** ($349) alongside **AURA X1 Studio** ($249), **AURA X1 Sport** ($279), and **Alloy Power Case** ($89). Includes watermark wordings and magnetic pill buttons. |
| 5 | **Adaptive ANC 2.0** | Deep Accent (`#1B1F2A`)<br>`data-nav="light"` | Interactive acoustic demonstration. Toggle between **Active Silence Mode** (48 dB reduction, calming flattened waveform) and **Ambient Transparency Mode** (turbulent orange/yellow soundwaves). |
| 6 | **Intelligent Features** | Off-White (`#F6F5F1`)<br>`data-nav="dark"` | 6-card grid highlighting *Instant Pairing*, *Fast Fuel Charging*, *Sweat & Weather Shield*, *Precision Find My*, *Triple-Mic Beamforming*, and *Aerodynamic Wind Guard*. |
| 7 | **CTA Banner** | Signal Orange (`#FF5A1F`)<br>`data-nav="light"` | High-impact closing banner: script lead-in *"Silence is waiting."*, giant `READY TO HEAR / EVERYTHING?`, and magnetic preorder trigger. |
| 8 | **Footer** | Graphite (`#121314`)<br>`data-nav="light"` | Giant `AURA X1.` condensed display logo, four-column directory, and concept product disclaimer. |

---

## Technical Architecture

- **Framework**: Next.js 16 (App Router) with React 19 and TypeScript.
- **Styling**: Tailwind CSS v4 with custom `@theme` tokens and CSS variable integration.
- **Scroll & Animation**:
  - Lenis smooth momentum scrolling.
  - GSAP `ScrollTrigger` for pinning and frame interpolation.
  - Custom `requestAnimationFrame` loops for drifting background typography and custom cursor glow.
- **Asset Processing**:
  - High-resolution 1280×720 sequence frames (`/frames/ezgif-frame-001.jpg` … `-180.jpg`).
  - Strict watermark clipping: canvas and image wrappers scale frames ~108–114% anchored top-left so the bottom-right watermark is completely occluded.

---

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

```bash
# Production build & verification
npm run build
npm start
```

## Image credits

Lifestyle and product photos are from [Unsplash](https://unsplash.com) and used under the [Unsplash License](https://unsplash.com/license):

| File | Source |
| --- | --- |
| `public/photos/walkway.webp` | https://unsplash.com/photos/photo-1770177359859-438458e807d7 |
| `public/photos/city.webp` | https://unsplash.com/photos/photo-1772441936520-9db6ae519262 |
| `public/photos/midnight-wood.webp` | https://unsplash.com/photos/photo-1578319439584-104c94d37305 |
| `public/photos/midnight-red.webp` | https://unsplash.com/photos/photo-1606220588913-b3aacb4d2f46 |
| `public/photos/midnight-case.webp` | https://unsplash.com/photos/photo-1667178173387-7e0cb51c0b4f |

The transparent earbud and component cut-outs in `public/cutouts/` were extracted from the project's own product render frames with [rembg](https://github.com/danielgatis/rembg) (BiRefNet model).
