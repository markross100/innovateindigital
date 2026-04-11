import Image from 'next/image'

// Landscape images get colSpan 2, portrait get colSpan 1
// Grid: 10 columns total (2+2+2+1+2+1)
const photos = [
  { src: '/images/ev1.jpg', alt: 'Networking at InnovateInDigital roundtable',      span: 2 },
  { src: '/images/ev3.jpg', alt: 'AI presentation at InnovateInDigital event',      span: 2 },
  { src: '/images/ev4.jpg', alt: 'Apéro networking at InnovateInDigital',           span: 2 },
  { src: '/images/ev2.jpg', alt: 'Speaker presenting at roundtable session',        span: 1 },
  { src: '/images/ev5.jpg', alt: 'Live Mentimeter poll during event',               span: 2 },
  { src: '/images/ev6.jpg', alt: 'InnovateInDigital apéro food spread',             span: 1 },
]

export default function Gallery() {
  return (
    <section id="gallery" className="overflow-hidden">
      <div
        className="grid gap-[3px]"
        style={{ gridTemplateColumns: '2fr 2fr 2fr 1fr 2fr 1fr', height: '280px' }}
      >
        {photos.map(({ src, alt }) => (
          <div key={src} className="relative overflow-hidden group">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 960px) 33vw, 20vw"
              className="object-cover grayscale-[25%] brightness-[0.82] transition-all duration-500 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-[1.03]"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
