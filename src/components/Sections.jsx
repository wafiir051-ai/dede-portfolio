import { useEffect, useMemo, useRef, useState } from 'react';
import CircularGallery from './reactbits/CircularGallery/CircularGallery.jsx';
import TiltedCard from './reactbits/TiltedCard/TiltedCard.jsx';
import Stack from './reactbits/Stack/Stack.jsx';
import ScrollVelocity from './reactbits/ScrollVelocity/ScrollVelocity.jsx';
import { ALL, BRANDS, CATS, WORKS, catOf } from '../data';
import { hasWebGL } from '../hooks';
import { PickButton, useStore } from '../store.jsx';
import { CONTACT } from '../config';

const ids = key => WORKS[key].map(w => w.id);
const pad = n => String(n).padStart(2, '0');

/* ---------- Kartu Tentang + Kontak + ID card ---------- */
export function About() {
  const { open } = useStore();
  return (
    <section id="tentang" className="card about" aria-labelledby="about-h">
      <div className="about-copy">
        <h2 id="about-h">Di Balik Visual</h2>
        <p>Saya Dede Kismantoro, desainer grafis. Saya mengerjakan materi promosi dari logo sampai kalender: flyer, brosur, poster, menu, feed Instagram, banner, spanduk, dan twibbon.</p>
        <p>Kekuatan saya ada di kerapian informasi dan warna yang mengikuti karakter brand, supaya hasilnya mudah dibaca dan siap cetak atau unggah.</p>

        <h3>Ayo Terhubung</h3>
        <ul className="connect">
          {CONTACT.whatsapp && <li><i className="ci ci-green" aria-hidden="true">W</i><a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener">WhatsApp +62 857 8080 5077</a></li>}
          {CONTACT.telegram && <li><i className="ci ci-teal" aria-hidden="true">T</i><a href={`https://t.me/${CONTACT.telegram}`} target="_blank" rel="noopener">Telegram @{CONTACT.telegram}</a></li>}
          {CONTACT.email && <li><i className="ci ci-red" aria-hidden="true">@</i><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>}
          {CONTACT.instagram && <li><i className="ci ci-blue" aria-hidden="true">I</i><a href={`https://instagram.com/${CONTACT.instagram}`} target="_blank" rel="noopener">@{CONTACT.instagram}</a></li>}
          {!CONTACT.whatsapp && !CONTACT.telegram && !CONTACT.email && !CONTACT.instagram && <li className="connect-empty">Kontak langsung akan segera ditambahkan. Untuk sementara, gunakan formulir brief di bawah.</li>}
        </ul>
        <a className="btn btn-blue" href="#kontak">Kirim brief</a>
      </div>

      <div className="idcard-wrap">
        <span className="starburst" aria-hidden="true" />
        <div className="lanyard" aria-hidden="true"><span>PORTFOLIO ✦ PORTFOLIO ✦ PORTFOLIO ✦ PORTFOLIO ✦ PORTFOLIO ✦ PORTFOLIO</span></div>
        <div className="idcard">
          <i className="idclip" />
          <div className="idphoto">
            <img src="/assets/dede.jpg" alt="Foto Dede Kismantoro" width="640" height="640" />
          </div>
          <b>DEDE<br />KISMANTORO</b>
          <small>Graphic Designer</small>
          <span className="idqr" />
        </div>
      </div>
    </section>
  );
}

/* ---------- Layanan + Dalam angka ---------- */
export function Skills() {
  const services = ['Desain logo', 'Flyer & brosur', 'Poster & leaflet', 'Menu makanan', 'Feed media sosial', 'Banner & spanduk', 'Kalender', 'Twibbon', 'Sketsa tangan'];
  const counts = [
    { n: WORKS.logo.length, t: 'Desain logo' },
    { n: WORKS.flyer.length + WORKS.poster.length, t: 'Flyer, brosur, poster' },
    { n: WORKS.banner.length, t: 'Banner & spanduk' },
  ];
  return (
    <div className="duo">
      <section className="card pad" aria-labelledby="skill-h">
        <h2 id="skill-h">Layanan</h2>
        <ul className="pills">{services.map(s => <li key={s}>{s}</li>)}</ul>
      </section>
      <section className="card pad" aria-labelledby="num-h">
        <h2 id="num-h">Dalam Angka</h2>
        <ol className="timeline">
          {counts.map(c => <li key={c.t}><b>{c.n}</b><span>{c.t}</span></li>)}
        </ol>
      </section>
    </div>
  );
}

/* ---------- Karya: tab per kategori, tiap kategori punya perangkat sendiri ---------- */
function Logos() {
  const { open } = useStore();
  const gl = useMemo(hasWebGL, []);
  const list = ids('logo');
  return (
    <>
      {gl && (
        <div className="logo-stage">
          <CircularGallery
            items={WORKS.logo.map(w => ({ image: w.src, text: w.label }))}
            bend={2.2} textColor="#10152e" itemAspect={1} itemSize={0.85} borderRadius={0.1} fadeEdges={0.2}
            openOnClick={false} onItemClick={(_, i) => open(list, i)}
          />
        </div>
      )}
      <details className="logo-all" open={!gl}>
        <summary>Semua {list.length} logo, pilih untuk brief</summary>
        <ul className="logo-grid">
          {WORKS.logo.map((w, i) => (
            <li key={w.id}>
              <button type="button" className="logo-tile" onClick={() => open(list, i)} aria-label={`Perbesar ${w.label}`}>
                <img src={w.src} width={w.w} height={w.h} alt={w.caption} loading="lazy" decoding="async" />
              </button>
              <PickButton id={w.id} className="pick-sm" />
            </li>
          ))}
        </ul>
      </details>
    </>
  );
}

function Tilted({ w, list }) {
  const { open } = useStore();
  const i = list.indexOf(w.id);
  return (
    <figure className="tilt">
      <TiltedCard
        imageSrc={w.src} altText={w.caption}
        containerHeight={`${Math.round(300 * (w.h / w.w))}px`} imageHeight={`${Math.round(300 * (w.h / w.w))}px`} imageWidth="300px" containerWidth="300px"
        rotateAmplitude={9} scaleOnHover={1.04} showTooltip={false} flipOnClick={false} glare={0.3} radius={14} intro={false}
        onClick={() => open(list, i)}
      />
      <figcaption className="label"><span><b>No. {pad(w.n)}</b> {catOf[w.cat].short}</span><PickButton id={w.id} /></figcaption>
    </figure>
  );
}

function Masonry({ cat }) {
  const list = ids(cat);
  return <div className="masonry">{WORKS[cat].map(w => <Tilted key={w.id} w={w} list={list} />)}</div>;
}

function Plain({ cat, className }) {
  const { open } = useStore();
  const list = ids(cat);
  return (
    <div className={className}>
      {WORKS[cat].map((w, i) => (
        <figure className="work" key={w.id}>
          <button type="button" className="work-img" onClick={() => open(list, i)} aria-label={`Perbesar ${w.label}`}>
            <img src={w.src} width={w.w} height={w.h} alt={w.caption} loading="lazy" decoding="async" />
          </button>
          <figcaption className="label"><span><b>No. {pad(w.n)}</b> {catOf[w.cat].short}</span><PickButton id={w.id} /></figcaption>
        </figure>
      ))}
    </div>
  );
}

function Kalender() {
  const w = WORKS.kalender[0];
  const { open } = useStore();
  const ref = useRef(null);
  const move = e => {
    if (e.pointerType === 'touch') return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--x', `${((e.clientX - r.left) / r.width) * 100}%`);
    ref.current.style.setProperty('--y', `${((e.clientY - r.top) / r.height) * 100}%`);
  };
  return (
    <figure className="inspect">
      <button ref={ref} type="button" className="inspect-img" onPointerMove={move} onClick={() => open([w.id], 0)} aria-label="Perbesar kalender dan twibbon">
        <img src={w.src} width={w.w} height={w.h} alt={w.caption} loading="lazy" decoding="async" />
      </button>
      <figcaption className="label"><span>Arahkan kursor untuk memeriksa detail</span><PickButton id={w.id} /></figcaption>
    </figure>
  );
}

export function Karya() {
  const [tab, setTab] = useState(0);
  const cat = CATS[tab];
  useEffect(() => {
    const on = e => { const i = CATS.findIndex(c => c.key === e.detail); if (i >= 0) setTab(i); };
    window.addEventListener('karya-tab', on); return () => window.removeEventListener('karya-tab', on);
  }, []);
  const panel = {
    logo: <Logos />,
    flyer: <Masonry cat="flyer" />,
    poster: <Masonry cat="poster" />,
    feed: <Plain cat="feed" className="phones" />,
    banner: <Plain cat="banner" className="banners" />,
    kalender: <Kalender />,
  }[cat.key];
  const onKey = (e, i) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const n = (i + (e.key === 'ArrowRight' ? 1 : -1) + CATS.length) % CATS.length;
    setTab(n); document.getElementById(`tab-${CATS[n].key}`)?.focus();
  };
  return (
    <section id="karya" className="card pad" aria-labelledby="karya-h">
      <h2 id="karya-h">Karya Pilihan</h2>
      <p className="sub">Pilih kategori. Klik gambar untuk memperbesar, tekan Pilih untuk memasukkannya ke brief.</p>
      <div className="tabs" role="tablist" aria-label="Kategori karya">
        {CATS.map((c, i) => (
          <button key={c.key} id={`tab-${c.key}`} role="tab" type="button" aria-selected={i === tab} aria-controls="karya-panel" tabIndex={i === tab ? 0 : -1}
            className="tab" onClick={() => setTab(i)} onKeyDown={e => onKey(e, i)}>
            {c.title}<small>{WORKS[c.key].length}</small>
          </button>
        ))}
      </div>
      <div id="karya-panel" role="tabpanel" aria-labelledby={`tab-${cat.key}`} className="panel" key={cat.key}>{panel}</div>
    </section>
  );
}

/* ---------- Sketsa: Stack React Bits ---------- */
export function Sketches() {
  const [top, setTop] = useState(0);
  const { open } = useStore();
  const list = ids('sketch');
  const cards = WORKS.sketch.map(w => <img key={w.id} src={w.src} alt={w.caption} draggable={false} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />);
  const cur = WORKS.sketch[top] || WORKS.sketch[0];
  return (
    <section id="sketsa" className="card pad" aria-labelledby="sketsa-h">
      <h2 id="sketsa-h">Sketsa Tangan</h2>
      <div className="sketch-grid">
        <div className="sketch-stack">
          <Stack cards={cards} layout="fan" visible={3} radius={14} frame={6} frameColor="#ffffff" tilt={18} sendToBackOnClick onChange={i => setTop(i)} />
        </div>
        <div className="sketch-info" aria-live="polite">
          <p className="label"><span><b>{pad(cur.n)} / {pad(list.length)}</b> Geser kartu untuk berikutnya</span></p>
          <h3>{cur.title}</h3>
          <p>{cur.medium}. {cur.note}</p>
          <div className="sketch-actions">
            <button type="button" className="btn btn-white" onClick={() => open(list, list.indexOf(cur.id))}>Perbesar</button>
            <PickButton id={cur.id} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Pita logo + teks brand (React Bits ScrollVelocity) ---------- */
function LogoRow({ items, reverse }) {
  return (
    <div className="band" aria-hidden="true">
      <div className={`band-track ${reverse ? 'is-rev' : ''}`}>
        {[...items, ...items].map((w, i) => (
          <img key={`${w.id}-${i}`} src={w.src} alt="" width="96" height="96" decoding="async" />
        ))}
      </div>
    </div>
  );
}

export function Marquee() {
  const logos = WORKS.logo;
  const half = Math.ceil(logos.length / 2);
  const text = BRANDS.join('  ✦  ') + '  ✦  ';
  return (
    <section className="card marquee" aria-label="Brand dan instansi dalam portofolio">
      <p className="marquee-title">Brand dan instansi dalam portofolio</p>
      <LogoRow items={logos.slice(0, half)} />
      <LogoRow items={logos.slice(half)} reverse />
      <div className="marquee-text" aria-hidden="true">
        <ScrollVelocity texts={[text]} velocity={40} numCopies={4} fontSize="clamp(20px, 2.8vw, 34px)" fontWeight={700} color="#10152e" outlineAlternate />
      </div>
      <p className="sr-only">{BRANDS.join(', ')}</p>
    </section>
  );
}

/* ---------- Indeks Proyek: satu "kotak" per kategori ---------- */
export function Boxes() {
  const go = key => {
    window.dispatchEvent(new CustomEvent('karya-tab', { detail: key }));
    document.getElementById('karya')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };
  return (
    <section id="indeks" className="card pad" aria-labelledby="indeks-h">
      <h2 id="indeks-h">Indeks Proyek</h2>
      <p className="sub">Enam kategori, {Object.values(WORKS).reduce((a, l) => a + l.length, 0) - WORKS.sketch.length} karya desain. Klik kotak untuk membuka isinya.</p>
      <ul className="boxes">
        {CATS.map(c => {
          const list = WORKS[c.key];
          return (
            <li key={c.key}>
              <button type="button" className="box" onClick={() => go(c.key)} aria-label={`Buka ${c.title}, ${list.length} karya`}>
                <span className="box-stage" aria-hidden="true">
                  {list.slice(0, 3).map((w, i) => <img key={w.id} src={w.src} alt="" loading="lazy" decoding="async" className={`bt bt-${i}`} />)}
                </span>
                <span className="box-label">
                  <i className="box-n">{c.idx}</i>
                  <b>{c.title}</b>
                  <em>{list.length} karya</em>
                </span>
                <span className="box-code" aria-hidden="true" />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ---------- Bidang yang pernah dikerjakan (dari karya yang ada) ---------- */
const FIELDS = [
  { t: 'Travel umrah dan haji', d: 'Flyer paket umrah, poster perlengkapan, dan banner untuk biro perjalanan ibadah.', ids: ['flyer-03', 'flyer-06', 'poster-03', 'banner-02'] },
  { t: 'Sekolah dan pendidikan', d: 'Flyer penerimaan peserta didik baru, banner santri baru, dan promosi bimbingan belajar.', ids: ['flyer-02', 'flyer-08', 'banner-01', 'banner-03'] },
  { t: 'Kuliner dan kafe', d: 'Poster menu, promo peluncuran, dan menu cetak untuk kafe dan kedai.', ids: ['poster-01', 'poster-02', 'poster-04'] },
  { t: 'Toko dan bisnis lokal', d: 'Flyer produk, poster layanan, dan feed Instagram untuk toko dan usaha.', ids: ['flyer-01', 'poster-05', 'feed-02'] },
];
export function Fields() {
  const { open } = useStore();
  return (
    <section id="bidang" className="card pad" aria-labelledby="bidang-h">
      <h2 id="bidang-h">Bidang yang Dikerjakan</h2>
      <p className="sub">Dikelompokkan dari karya yang sudah ada di portofolio ini.</p>
      <div className="fields">
        {FIELDS.map(f => (
          <article className="field" key={f.t}>
            <h3>{f.t}</h3>
            <p>{f.d}</p>
            <ul className="field-thumbs">
              {f.ids.map(id => (
                <li key={id}>
                  <button type="button" onClick={() => open(f.ids, f.ids.indexOf(id))} aria-label={`Perbesar ${ALL[id].label}`}>
                    <img src={ALL[id].src} alt={ALL[id].caption} width={ALL[id].w} height={ALL[id].h} loading="lazy" decoding="async" />
                  </button>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------- Alur kerja ---------- */
export function Steps() {
  const steps = [
    { t: 'Pilih referensi', d: 'Tandai karya yang cocok dengan seleramu di portofolio ini.' },
    { t: 'Kirim brief', d: 'Tulis kebutuhan, ukuran, dan tenggat, lalu kirim lewat WhatsApp atau Telegram.' },
    { t: 'Diskusi dan draf', d: 'Pak Dede menyesuaikan arah desain dengan brief dan referensimu.' },
    { t: 'Hasil siap pakai', d: 'Desain jadi untuk dicetak atau diunggah ke media sosial.' },
  ];
  return (
    <section id="alur" className="card pad" aria-labelledby="alur-h">
      <h2 id="alur-h">Alur Kerja</h2>
      <ol className="steps">
        {steps.map((s, i) => (
          <li key={s.t}><span className="step-n">{i + 1}</span><h3>{s.t}</h3><p>{s.d}</p></li>
        ))}
      </ol>
    </section>
  );
}
