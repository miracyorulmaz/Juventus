'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Shield, Star } from 'lucide-react';
import JuventusLogo from './JuventusLogo';

const YOUTH_PHOTOS = [
  'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&q=80',
  'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80',
  'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800&q=80',
];

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen bg-black overflow-hidden flex items-center">
      {/* Hero background — youth football photo with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={YOUTH_PHOTOS[0]}
          alt="Juventus Academy Youth Training"
          className="w-full h-full object-cover object-center opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Juventus stripe pattern overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.5) 40px, rgba(255,255,255,0.5) 42px)',
          backgroundSize: '100% 80px',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20 md:py-24">
        <div className="flex flex-col items-center text-center">
          {/* Juventus Official Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="mb-6"
          >
            <JuventusLogo className="w-24 h-auto md:w-28" color="white" />
          </motion.div>

          {/* Official Tag */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-amber-400/30 bg-amber-400/5 mb-8"
          >
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-xs md:text-sm font-semibold text-amber-400 uppercase tracking-[0.2em]">
              Resmi Juventus Akademisi
            </span>
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl mb-6"
          >
            Geleceğin Yıldızları{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">
                Juventus
              </span>
            </span>{' '}
            Ekolüyle Sahada
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-base md:text-xl text-white/60 max-w-2xl mb-12 leading-relaxed font-light"
          >
            İtalyan disiplini, Juventus metodolojisi ve profesyonel antrenör kadromuzla,{' '}
            çocuklarınızı sahada fark yaratmaya hazırlıyoruz.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={() => scrollTo('kayit')}
              className="group relative px-10 py-4 rounded-full font-bold text-sm uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-400 text-black hover:shadow-[0_0_40px_rgba(251,191,36,0.3)] transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Hemen Kayıt Ol
              </span>
            </button>
            <button
              onClick={() => scrollTo('programlar')}
              className="px-10 py-4 rounded-full font-bold text-sm uppercase tracking-wider border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300"
            >
              Programları Keşfet
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown className="w-5 h-5 text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
