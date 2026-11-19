import { useEffect, useLayoutEffect, useState } from 'react';

export function useMedia(query) {
  const get = () => (typeof matchMedia === 'undefined' ? false : matchMedia(query).matches);
  const [m, setM] = useState(get);
  useEffect(() => {
    const mq = matchMedia(query); const on = () => setM(mq.matches);
    on(); mq.addEventListener('change', on); return () => mq.removeEventListener('change', on);
  }, [query]);
  return m;
}
export const useReducedMotion = () => useMedia('(prefers-reduced-motion: reduce)');

/** Menulis --p (0..1) ke elemen saat melewati viewport. CSS yang mengurus geraknya. */
export function useScrollProgress(ref, { enabled = true } = {}) {
  useLayoutEffect(() => {
    const el = ref.current; if (!el) return;
    if (!enabled) { el.style.setProperty('--p', '0.5'); return; }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect(); const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      el.style.setProperty('--p', p.toFixed(4));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [ref, enabled]);
}

export function hasWebGL() {
  try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; }
}
