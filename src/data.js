import works from './works.json';

export const CATS = [
  { key: 'logo',     idx: '01', title: 'Desain Logo',        short: 'Logo' },
  { key: 'flyer',    idx: '02', title: 'Flyer & Brosur',     short: 'Flyer' },
  { key: 'poster',   idx: '03', title: 'Poster & Leaflet',   short: 'Poster' },
  { key: 'feed',     idx: '04', title: 'Feed Media Sosial',  short: 'Feed' },
  { key: 'banner',   idx: '05', title: 'Banner & Spanduk',   short: 'Banner' },
  { key: 'kalender', idx: '06', title: 'Kalender & Twibbon', short: 'Kalender' },
];
export const SKETCH = { key: 'sketch', idx: '07', title: 'Sketsa Tangan', short: 'Sketsa' };

export const catOf = Object.fromEntries([...CATS, SKETCH].map(c => [c.key, c]));
const pad = n => String(n).padStart(2, '0');

export const SKETCH_INFO = [
  { title: 'Fakultas Pertanian IPB', medium: 'Pensil di atas kertas', note: 'Perspektif dan arsir.' },
  { title: 'Taman dan saung',        medium: 'Pensil warna',          note: 'Komposisi dan gradasi hijau.' },
  { title: 'Mawar di tebing',        medium: 'Pensil di atas kertas', note: 'Tekstur batu dan bayangan.' },
];

// Satu daftar datar semua karya, dengan label bergaya katalog.
export const ALL = {};
for (const [key, list] of Object.entries(works)) {
  const cat = catOf[key];
  works[key] = list.map(w => {
    const label = `${cat.short} ${pad(w.n)}`;
    const item = { ...w, cat: key, label, caption: `${cat.title} — ${pad(w.n)} dari ${pad(list.length)}` };
    if (key === 'sketch') { Object.assign(item, SKETCH_INFO[w.n - 1]); item.label = SKETCH_INFO[w.n - 1].title; item.caption = `${item.title}. ${item.medium}. ${item.note}`; }
    ALL[item.id] = item;
    return item;
  });
}
export const WORKS = works;

export const BRANDS = [
  'Harum Tours', 'Sekolah Juara Wirautama', 'Master Institut', "SMP Qu Cahaya Al-Qur'an", 'Abia Official',
  'Node Cafe & Resto', 'Kepuh Florist', 'Ash-Shaff Educenter', 'VW Amindo', 'Masjid Al Hurriyyah',
  'Rona Karya', 'Patroland', 'Q-Store', 'Zeuscargo',
];

export const INDEX = [
  { id: 'top', idx: '00', label: 'Dede' },
  ...CATS.map(c => ({ id: c.key, idx: c.idx, label: c.short })),
  { id: 'sketch', idx: SKETCH.idx, label: SKETCH.short },
  { id: 'kontak', idx: '08', label: 'Brief' },
];
