import { useMemo } from 'react';
import DotGrid from './reactbits/DotGrid/DotGrid.jsx';
import { hasWebGL, useReducedMotion } from '../hooks';
import { ALL } from '../data';
import { useStore } from '../store.jsx';

/* Hero meniru kartu "PORTFOLIO" di referensi: monitor biru, keycap melayang, cetakan keluar dari monitor. */
export default function Hero() {
  const gl = useMemo(hasWebGL, []);
  const reduce = useReducedMotion();
  const { open } = useStore();
  const print = ALL['flyer-03'];
  return (
    <section id="top" className="hero card" aria-labelledby="h1">
      <div className="hero-panel">
        {gl && (
          <div className="hero-dots" aria-hidden="true">
            <DotGrid dotSize={3} gap={20} baseColor="#c9d6ff" activeColor="#2f64f5" proximity={130} paused={reduce} intro={!reduce} />
          </div>
        )}
        <div className="hero-year" aria-hidden="true">2024</div>

        <div className="hero-stage">
          {/* keycap kiri */}
          <span className="key key-blue k1" aria-hidden="true">Aa</span>
          <span className="key key-orange k2" aria-hidden="true">Logo</span>
          {/* keycap kanan */}
          <span className="key key-white k3" aria-hidden="true">Pt</span>
          <span className="key key-teal k4" aria-hidden="true">Ps</span>
          <span className="burst b1" aria-hidden="true"><i>D</i></span>

          <div className="monitor">
            <div className="monitor-screen">
              <h1 id="h1"><span>PORTO</span><span>FOLIO</span></h1>
              <span className="note" aria-hidden="true">Graphic<br />Designer</span>
            </div>
            <span className="monitor-eye" aria-hidden="true" />
            <span className="monitor-tag" aria-hidden="true">NEW</span>
          </div>

          <button type="button" className="printout" onClick={() => open([print.id], 0)} aria-label="Buka contoh cetakan flyer">
            <img src={print.src} alt="" width={print.w} height={print.h} />
          </button>

          <div className="pedestal" aria-hidden="true"><span className="badge">DEDE K.</span></div>
        </div>
      </div>

      <div className="hero-foot">
        <p><b>Dede Kismantoro</b>, desainer grafis untuk logo, flyer, poster, feed media sosial, banner, dan kalender.</p>
        <div className="hero-cta">
          <a className="btn btn-blue" href="#karya">Lihat karya</a>
          <a className="btn btn-white" href="#kontak">Kirim brief</a>
        </div>
      </div>
    </section>
  );
}
