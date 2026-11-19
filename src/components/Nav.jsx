import { useStore } from '../store.jsx';

export default function Nav() {
  const { picked } = useStore();
  return (
    <>
      <header className="topnav">
        <nav className="pillnav" aria-label="Navigasi utama">
          <a className="brand" href="#top" aria-label="Dede Kismantoro, ke atas"><span className="brand-mark" aria-hidden="true">D</span><span className="brand-name">Dede Kismantoro</span></a>
          <ul>
            <li><a href="#karya">Karya</a></li>
            <li><a href="#sketsa">Sketsa</a></li>
            <li><a href="#tentang">Tentang</a></li>
            <li><a href="#kontak" className="nav-cta">Brief</a></li>
          </ul>
        </nav>
      </header>
      <a className={`tray ${picked.length ? 'has' : ''}`} href="#kontak" aria-label={`Brief: ${picked.length} karya dipilih`}>
        <span className="tray-n">{picked.length}</span>
        <span>{picked.length ? 'Kirim brief' : 'Brief kosong'}</span>
      </a>
    </>
  );
}
