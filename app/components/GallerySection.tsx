'use client';

import { motion } from 'framer-motion';

const PHOTOS = [
  {
    src: '/images/gallery/gallery-1.jpg',
    title: 'Teknik Gelişim',
  },
  {
    src: '/images/gallery/gallery-2.jpg',
    title: 'Sahada Disiplin',
  },
  {
    src: '/images/gallery/gallery-3.jpg',
    title: 'Takım Ruhu',
  },
  {
    src: '/images/gallery/gallery-4.jpg',
    title: 'Geleceğin Yıldızları',
  },
  {
    src: '/images/gallery/gallery-5.jpg',
    title: 'Profesyonel Antrenman',
  },
  {
    src: '/images/gallery/gallery-6.jpg',
    title: 'Maç Günü',
  },
];

export default function GallerySection() {
  return (
    <section className="relative bg-black py-20 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050505] to-black pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-amber-400/80 text-xs md:text-sm uppercase tracking-[0.3em] mb-4 font-semibold">
            Galeri
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Sahadan <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-400">Kareler</span>
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto">
            Juventus Academy Batıkent'te çocuklarımızın antrenman ve maç anları
          </p>
        </motion.div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {PHOTOS.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl md:rounded-3xl ${
                i === 0 ? 'md:col-span-2 md:row-span-2' : ''
              } ${i === 3 ? 'md:col-span-2' : ''}`}
            >
              <div className="aspect-[4/3] md:aspect-[3/2]">
                <img
                  src={photo.src}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-white text-sm md:text-base font-semibold">{photo.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
