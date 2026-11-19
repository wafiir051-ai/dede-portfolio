import { useMemo, useState } from 'react';
import { ALL, catOf } from '../data';
import { CONTACT } from '../config';
import { useStore } from '../store.jsx';

export default function Brief() {
  const { picked, toggle, clear } = useStore();
  const [note, setNote] = useState('');
  const [copied, setCopied] = useState(false);

  const message = useMemo(() => {
    const lines = picked.length
      ? ['Halo Pak Dede, saya tertarik dengan karya berikut:', ...picked.map(id => `- ${ALL[id].label} (${catOf[ALL[id].cat].title})`)]
      : ['Halo Pak Dede, saya ingin berdiskusi soal desain.'];
    if (note.trim()) lines.push('', `Kebutuhan saya: ${note.trim()}`);
    return lines.join('\n');
  }, [picked, note]);

  const copy = async () => {
    try { await navigator.clipboard.writeText(message); setCopied(true); setTimeout(() => setCopied(false), 2200); }
    catch { window.prompt('Salin pesan ini:', message); }
  };

  const wa = CONTACT.whatsapp && `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
  const mail = CONTACT.email && `mailto:${CONTACT.email}?subject=${encodeURIComponent('Brief desain')}&body=${encodeURIComponent(message)}`;
  const tg = CONTACT.telegram && `https://t.me/${CONTACT.telegram}`;
  const ig = CONTACT.instagram && `https://instagram.com/${CONTACT.instagram}`;

  return (
    <section id="kontak" className="card brief" aria-labelledby="brief-h">
      <div className="brief-wrap">
        <header className="brief-head">
          <h2 id="brief-h">Pilih karya.<br />Kirim brief.</h2>
          <p>Tandai karya yang cocok dengan seleranya, tulis kebutuhanmu, lalu kirim. Pak Dede langsung tahu arah yang kamu mau.</p>
        </header>

        <div className="plate">
          <div className="plate-list" role="region" aria-label="Karya yang dipilih">
            <p className="plate-title label"><b>Brief</b> {picked.length ? `${picked.length} karya dipilih` : 'belum ada karya dipilih'}</p>
            {picked.length === 0 ? (
              <p className="plate-empty">Belum ada pilihan. Tekan tombol Pilih pada karya mana saja, atau langsung tulis kebutuhanmu di bawah.</p>
            ) : (
              <ul>
                {picked.map(id => {
                  const w = ALL[id];
                  return (
                    <li key={id}>
                      <img src={w.src} alt="" width="40" height="40" />
                      <span><b>{w.label}</b> <i>{catOf[w.cat].title}</i></span>
                      <button type="button" onClick={() => toggle(id)} aria-label={`Hapus ${w.label}`}>×</button>
                    </li>
                  );
                })}
              </ul>
            )}
            {picked.length > 0 && <button type="button" className="plate-clear" onClick={clear}>Kosongkan</button>}
          </div>

          <div className="plate-form">
            <label htmlFor="note">Kebutuhanmu</label>
            <textarea id="note" rows={4} value={note} onChange={e => setNote(e.target.value)} placeholder="Contoh: flyer promo Ramadhan, ukuran A4, butuh minggu depan." />
            <div className="plate-actions">
              {wa && <a className="btn btn-white" href={wa} target="_blank" rel="noopener">Kirim lewat WhatsApp</a>}
              {mail && <a className="btn btn-white" href={mail}>Kirim lewat email</a>}
              <button type="button" className={wa || mail ? 'btn btn-ghost' : 'btn btn-white'} onClick={copy}>{copied ? 'Tersalin' : 'Salin pesan'}</button>
              {tg && <a className="btn btn-ghost" href={tg} target="_blank" rel="noopener">Telegram</a>}
              {ig && <a className="btn btn-ghost" href={ig} target="_blank" rel="noopener">Instagram</a>}
            </div>
            {!wa && !mail && <p className="plate-note">Kontak langsung belum dipasang. Salin pesannya, lalu kirim lewat WhatsApp.</p>}
            <p className="sr-only" role="status">{copied ? 'Pesan tersalin' : ''}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
