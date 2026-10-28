import hero1 from '../assets/hero/hero-1.jpg'
import hero2 from '../assets/hero/hero-2.jpg'
import hero3 from '../assets/hero/hero-3.jpg'
import hero4 from '../assets/hero/hero-4.jpg'
import './Hero.css'

const STRIPS = [hero1, hero2, hero3, hero4]

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__strips" aria-hidden="true">
        {STRIPS.map((src) => (
          <div key={src} className="hero__strip" style={{ backgroundImage: `url(${src})` }} />
        ))}
      </div>
      <h1 className="hero__title" id="hero-title">
        Магазин
        <span>парка техники</span>
      </h1>
    </section>
  )
}
