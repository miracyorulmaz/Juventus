'use client';

import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

const COACHES = [
  {
    name: 'Abbas Saraç',
    photo: '/images/coaches/abbas-sarac.jpg',
  },
  {
    name: 'Onurcan Çınarcı',
    photo: '/images/coaches/onurcan-cinarci.jpg',
  },
  {
    name: 'Kadir Cerrahoğlu',
    photo: '/images/coaches/kadir-cerrahoglu.jpg',
  },
];

export default function CoachingStaff() {
  return (
    <section className="relative bg-black py-20 md:py-32 overflow-hidden">
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
            Kadromuz
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Antrenör{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-400">
              Kadrosu
            </span>
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto">
            Juventus Academy Ankara&apos;nın deneyimli ve lisanslı antrenörleriyle tanışın
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          {COACHES.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative rounded-3xl overflow-hidden border border-white/5 bg-[#0A0A0A] hover:border-amber-400/20 transition-all duration-500"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={c.photo}
                  alt={c.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-400/80 text-xs uppercase tracking-wider font-semibold">
                    Juventus Academy Ankara
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-white">{c.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
