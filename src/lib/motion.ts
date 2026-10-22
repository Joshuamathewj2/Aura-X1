// Small motion toolkit shared by the animated scenes (mirrors the Red Velvet helpers).

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const hasFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/** Normalised pointer position (-1..1 from the viewport centre), smoothed by the caller. */
export const pointer = { x: 0, y: 0 };
if (typeof window !== 'undefined') {
  window.addEventListener(
    'pointermove',
    (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    },
    { passive: true },
  );
}

export const PARTS = [
  '/cutouts/part-battery.webp',
  '/cutouts/part-coil.webp',
  '/cutouts/part-driver.webp',
  '/cutouts/part-shield.webp',
  '/cutouts/part-screw.webp',
  '/cutouts/part-screw-2.webp',
];
