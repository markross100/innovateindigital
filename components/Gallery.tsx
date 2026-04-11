import Image from 'next/image'

// ev1, ev3, ev5 = portrait (1fr) | ev4 = landscape (2fr) | ev2, ev6 = portrait (1fr)
// Grid columns: 1fr 1fr 2fr 1fr 1fr 1fr
const photos = [
  { src: '/images/ev1.jpg', alt: 'Networking at InnovateInDigital roundtable' },
  { src: '/images/ev3.jpg', alt: 'AI presentation at InnovateInDigital event' },
  { src: '/images/ev4.jpg', alt: 'Apéro networking at InnovateInDigital' },
  { src: '/images/ev2.jpg', alt: 'Speaker presenting at roundtable session' },
  { src: '/images/ev5.jpg', alt: 'Live Mentimeter poll during event' },
  { src: '/images/ev6.jpg', alt: 'InnovateInDigital apéro food spread' },
]

export default function Gallery() {
  return (
    <section id="gallery" className="overflow-hidden">
      <div
        className="grid gap-[3px]"
        style={{ gridTemplateColumns: '1fr 1fr 2fr 1fr 1fr 1fr', height: '300px' }}
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
