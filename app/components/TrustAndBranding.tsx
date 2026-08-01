'use client';

import { motion } from 'framer-motion';
import { Trophy, Users, Plane, Award } from 'lucide-react';

export default function TrustAndBranding() {
  const stats = [
    { icon: Trophy, value: '15+', label: 'UEFA Lisanslı Antrenör' },
    { icon: Users, value: '500+', label: 'Lisanslı Sporcu' },
    { icon: Award, value: '3-15', label: 'Yaş Grubu' },
    { icon: Plane, value: 'İtalya', label: "İtalya'da ve Yurt İçinde Kamp Fırsatı" },
  ];

  return (
    <section className="relative bg-black py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-amber-400/80 text-xs md:text-sm uppercase tracking-[0.3em] mb-4 font-semibold">
            Neden Biz?
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Juventus Academy{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-400">
              Batıkent
            </span>
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto">
            Resmi Juventus ortaklığı ile Ankara Batıkent&apos;te, dünya standartlarında futbol eğitimi
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-[#0A0A0A] border border-white/5 rounded-3xl p-6 md:p-8 text-center hover:border-amber-400/20 transition-all duration-500"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-amber-400/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative">
                <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-4 rounded-2xl bg-amber-400/5 flex items-center justify-center group-hover:bg-amber-400/10 transition-colors">
                  <s.icon className="w-6 h-6 md:w-7 md:h-7 text-amber-400" />
                </div>
                <div className="text-2xl md:text-3xl font-extrabold text-white mb-1">{s.value}</div>
                <div className="text-xs md:text-sm text-white/40 leading-tight">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
