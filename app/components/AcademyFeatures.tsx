'use client';

import { motion } from 'framer-motion';
import { Building2, BookOpen, Globe, Brain, Flag } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Juventus Metodolojisi',
    desc: 'Dünya çapında kanıtlanmış Juventus akademi sistemi ile eğitim müfredatı.',
  },
  {
    icon: Building2,
    title: 'Modern Tesisler',
    desc: 'Batıkent\'te Juventus standartlarında, teknoloji destekli profesyonel antrenman alanları.',
  },
  {
    icon: Globe,
    title: 'Uluslararası Fırsatlar',
    desc: 'Yurt dışı turnuvaları, İtalya kampı ve uluslararası kariyer vizyonu.',
  },
  {
    icon: Brain,
    title: 'Bilimsel Yaklaşım',
    desc: 'Spor bilimi temelli, pedagojik eğitim metodolojisi ile bütünsel oyuncu gelişimi.',
  },
  {
    icon: Flag,
    title: 'İtalyan Disiplini',
    desc: 'Sahada ve saha dışında karakter gelişimini destekleyen disiplin anlayışı.',
  },
];

export default function AcademyFeatures() {
  return (
    <section className="relative bg-black py-20 md:py-32">
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
            Akademi Avantajları
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Juventus Farkını{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-400">
              Yaşayın
            </span>
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto">
            Çocuğunuz için en iyi futbol eğitimini seçin
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 hover:border-amber-400/20 transition-all duration-500"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-amber-400/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-5 group-hover:bg-amber-400/10 transition-colors">
                  <f.icon className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
