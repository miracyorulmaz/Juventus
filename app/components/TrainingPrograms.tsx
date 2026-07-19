'use client';

import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Award, Clock, Users } from 'lucide-react';

const programs = [
  {
    icon: Sparkles,
    title: 'U6 - U9',
    subtitle: 'Başlangıç Grubu',
    desc: 'Temel futbol becerileri, koordinasyon gelişimi ve oyun eğlencesiyle futbola ilk adım.',
    hours: 'Haftada 2 antrenman',
    ratio: '1:6 antrenör-oyuncu',
    highlight: false,
  },
  {
    icon: TrendingUp,
    title: 'U10 - U13',
    subtitle: 'Gelişim Grubu',
    desc: 'Teknik beceri geliştirme, taktik anlayışı ve takım çalışması odaklı eğitim.',
    hours: 'Haftada 3 antrenman',
    ratio: '1:8 antrenör-oyuncu',
    highlight: true,
  },
  {
    icon: Award,
    title: 'U14 - U17',
    subtitle: 'Performans Grubu',
    desc: 'İleri seviye taktik, fiziksel kondisyon ve rekabetçi maç ortamı.',
    hours: 'Haftada 4 antrenman',
    ratio: '1:10 antrenör-oyuncu',
    highlight: false,
  },
];

export default function TrainingPrograms() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="programlar" className="relative bg-black py-20 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] to-black pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-amber-400/80 text-xs md:text-sm uppercase tracking-[0.3em] mb-4 font-semibold">
            Antrenman Programları
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Yaş Gruplarına Özel{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-400">
              Eğitim
            </span>
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto">
            Juventus metodolojisi ile her yaş grubu için özel olarak tasarlanmış programlar
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {programs.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`group relative rounded-3xl p-8 md:p-10 border transition-all duration-500 flex flex-col ${
                p.highlight
                  ? 'bg-gradient-to-b from-amber-400/10 to-transparent border-amber-400/30 md:scale-105'
                  : 'bg-[#0A0A0A] border-white/5 hover:border-amber-400/20'
              }`}
            >
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-400 text-black text-xs font-bold uppercase tracking-wider">
                  En Popüler
                </div>
              )}

              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
                p.highlight ? 'bg-amber-400/15' : 'bg-white/5 group-hover:bg-amber-400/10'
              }`}>
                <p.icon className={`w-8 h-8 ${p.highlight ? 'text-amber-400' : 'text-white/60 group-hover:text-amber-400'} transition-colors`} />
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-1">{p.title}</h3>
              <p className="text-amber-400/80 text-sm font-semibold mb-4">{p.subtitle}</p>
              <p className="text-white/40 text-sm leading-relaxed mb-8 flex-1">{p.desc}</p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-white/40 text-sm">
                  <Clock className="w-4 h-4 text-amber-400/60" />
                  {p.hours}
                </div>
                <div className="flex items-center gap-3 text-white/40 text-sm">
                  <Users className="w-4 h-4 text-amber-400/60" />
                  {p.ratio}
                </div>
              </div>

              <button
                onClick={() => scrollTo('kayit')}
                className={`w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                  p.highlight
                    ? 'bg-amber-400 text-black hover:bg-amber-300'
                    : 'border border-white/20 text-white hover:border-amber-400/50 hover:text-amber-400'
                }`}
              >
                Kayıt Başvurusu
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
