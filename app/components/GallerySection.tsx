'use client';

import { motion } from 'framer-motion';

const PHOTOS = [
  {
    src: '/images/gallery/academy/joy-and-ball.webp',
    title: 'Futbolla İlk Heyecan',
    layout: 'col-span-2 row-span-2',
    position: 'center 42%',
  },
  {
    src: '/images/gallery/academy/welcome-wave.webp',
    title: 'Sahada Neşe',
    layout: 'row-span-2',
    position: 'center 38%',
  },
  {
    src: '/images/gallery/academy/coach-on-ball.webp',
    title: 'Uzman Antrenörlük',
  },
  {
    src: '/images/gallery/academy/team-spirit.webp',
    title: 'Takım Ruhu',
  },
  {
    src: '/images/gallery/academy/training-detail.webp',
    title: 'Teknik Detaylar',
    layout: 'col-span-2',
    position: 'center 64%',
  },
  {
    src: '/images/gallery/academy/academy-play.webp',
    title: 'Futbolun Eğlencesi',
  },
  {
    src: '/images/gallery/academy/focused-training.webp',
    title: 'Odak ve Disiplin',
  },
  {
    src: '/images/gallery/academy/first-steps.webp',
    title: 'İlk Adımlar',
    layout: 'row-span-2',
    position: 'center 38%',
  },
  {
    src: '/images/gallery/academy/guided-training.webp',
    title: 'Birebir Yönlendirme',
  },
  {
    src: '/images/gallery/academy/ball-control.webp',
    title: 'Top Kontrolü',
    layout: 'col-span-2',
  },
  {
    src: '/images/gallery/academy/academy-smile.webp',
    title: 'Akademi Gülümsemesi',
    position: 'center 32%',
  },
  {
    src: '/images/gallery/academy/sideline-control.webp',
    title: 'Oyuna Hazırlık',
  },
];

export default function GallerySection() {
  return (
    <section
      id="galeri"
      className="relative scroll-mt-20 overflow-hidden bg-black py-20 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-[#050505] to-black" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-amber-400/80 md:text-sm">
            Galeri
          </p>
          <h2 className="mb-4 text-3xl font-extrabold text-white md:text-5xl">
            Sahadan{' '}
            <span className="bg-gradient-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">
              Kareler
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-white/50 md:text-lg">
            Juventus Academy Batıkent&apos;te çocuklarımızın antrenman ve maç anları
          </p>
        </motion.div>

        <div className="grid grid-flow-row-dense grid-cols-2 auto-rows-[180px] gap-3 sm:auto-rows-[230px] md:grid-cols-3 md:auto-rows-[250px] md:gap-4 lg:auto-rows-[290px]">
          {PHOTOS.map((photo, index) => (
            <motion.figure
              key={photo.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: Math.min(index * 0.06, 0.3) }}
              className={`group relative isolate overflow-hidden rounded-2xl bg-[#0A0A0A] md:rounded-3xl ${photo.layout ?? ''}`}
            >
              <img
                src={photo.src}
                alt={photo.title}
                loading="lazy"
                decoding="async"
                style={{ objectPosition: photo.position ?? 'center' }}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-transparent opacity-75 transition-opacity duration-500 group-hover:opacity-100" />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 transition-transform duration-500 group-hover:-translate-y-1 md:p-6">
                <span className="text-sm font-semibold text-white md:text-base">
                  {photo.title}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
