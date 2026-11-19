import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ALL } from './data';

const Ctx = createContext(null);
export const useStore = () => useContext(Ctx);

const KEY = 'dede-pilihan-v1';
const load = () => {
  try { const v = JSON.parse(localStorage.getItem(KEY) || '[]'); return v.filter(id => ALL[id]); } catch { return []; }
};

export function StoreProvider({ children }) {
  const [picked, setPicked] = useState(load);
  const [lb, setLb] = useState(null); // { list: [ids], index }

  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(picked)); } catch { /* mode privat */ } }, [picked]);

  const toggle = useCallback(id => setPicked(p => (p.includes(id) ? p.filter(x => x !== id) : [...p, id])), []);
  const clear = useCallback(() => setPicked([]), []);
  const open = useCallback((list, index) => setLb({ list, index }), []);
  const close = useCallback(() => setLb(null), []);
  const step = useCallback(d => setLb(s => (s ? { ...s, index: (s.index + d + s.list.length) % s.list.length } : s)), []);

  const value = useMemo(() => ({ picked, toggle, clear, lb, open, close, step }), [picked, toggle, clear, lb, open, close, step]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function PickButton({ id, className = '' }) {
  const { picked, toggle } = useStore();
  const on = picked.includes(id);
  const w = ALL[id];
  return (
    <button
      type="button"
      className={`pick ${on ? 'is-on' : ''} ${className}`}
      aria-pressed={on}
      aria-label={`${on ? 'Hapus' : 'Pilih'} ${w.label} ${on ? 'dari' : 'untuk'} brief`}
      onClick={e => { e.stopPropagation(); toggle(id); }}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
      <span>{on ? 'Dipilih' : 'Pilih'}</span>
    </button>
  );
}

export function Lightbox() {
  const { lb, close, step, picked, toggle } = useStore();
  const ref = useRef(null);
  useEffect(() => {
    const d = ref.current; if (!d) return;
    if (lb && !d.open) d.showModal();
    if (!lb && d.open) d.close();
  }, [lb]);
  const w = lb ? ALL[lb.list[lb.index]] : null;
  const on = w && picked.includes(w.id);
  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label="Pratinjau karya"
      onClose={close}
      onClick={e => { if (e.target === ref.current) close(); }}
      onKeyDown={e => { if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); }}
    >
      {w && (
        <div className="lb-inner">
          <button className="lb-btn lb-close" onClick={close} aria-label="Tutup">×</button>
          {lb.list.length > 1 && <button className="lb-btn lb-prev" onClick={() => step(-1)} aria-label="Sebelumnya">←</button>}
          <figure>
            <img src={w.src} alt={w.caption} />
            <figcaption>
              <span>{w.caption}</span>
              <button type="button" className={`pick ${on ? 'is-on' : ''}`} aria-pressed={on} onClick={() => toggle(w.id)}>
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
                <span>{on ? 'Dipilih' : 'Pilih untuk brief'}</span>
              </button>
            </figcaption>
          </figure>
          {lb.list.length > 1 && <button className="lb-btn lb-next" onClick={() => step(1)} aria-label="Berikutnya">→</button>}
        </div>
      )}
    </dialog>
  );
}
