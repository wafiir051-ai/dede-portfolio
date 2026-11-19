import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Brief from './components/Brief.jsx';
import { About, Skills, Boxes, Karya, Fields, Steps, Sketches, Marquee } from './components/Sections.jsx';
import { Lightbox } from './store.jsx';

export default function App() {
  return (
    <>
      <a className="skip" href="#karya">Lewati ke karya</a>
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Boxes />
        <Karya />
        <Fields />
        <Marquee />
        <Steps />
        <Sketches />
        <Brief />
      </main>
      <footer className="foot">
        <span>© {new Date().getFullYear()} Dede Kismantoro. Seluruh karya milik pembuatnya.</span>
        <a href="#top">Ke atas ↑</a>
      </footer>
      <Lightbox />
    </>
  );
}
