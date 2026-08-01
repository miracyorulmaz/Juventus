'use client';

import { motion } from 'framer-motion';
import { Award, Clock, Sparkles, TrendingUp, Trophy, Users } from 'lucide-react';
import type { TrainingProgram } from '@/types/database';

const icons = [Sparkles, TrendingUp, Award, Trophy];

export default function TrainingPrograms({ programs }: { programs: TrainingProgram[] }) {
  const scrollToRegistration = () => document.getElementById('kayit')?.scrollIntoView({ behavior: 'smooth' });
  return (
    <section id="programlar" className="relative scroll-mt-20 bg-black py-20 md:py-32"><div className="absolute inset-0 bg-gradient-to-b from-[#050505] to-black" /><div className="relative z-10 mx-auto max-w-6xl px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center"><p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-amber-400/80 md:text-sm">Antrenman Programları</p><h2 className="mb-4 text-3xl font-extrabold text-white md:text-5xl">Yaş Gruplarına Özel <span className="bg-gradient-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">Eğitim</span></h2><p className="mx-auto max-w-2xl text-base text-white/50 md:text-lg">Juventus metodolojisi ile her yaş grubu için özel olarak tasarlanmış programlar</p></motion.div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">{programs.map((program, index) => { const Icon = icons[index % icons.length]; const highlight = index === 1; return <motion.article key={program.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className={`group relative flex flex-col rounded-3xl border p-6 transition md:p-8 ${highlight ? 'border-amber-400/30 bg-gradient-to-b from-amber-400/10 to-transparent' : 'border-white/5 bg-[#0A0A0A] hover:border-amber-400/20'}`}>{highlight ? <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 px-4 py-1 text-xs font-bold uppercase tracking-wider text-black">En Popüler</div> : null}<div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5"><Icon className="h-8 w-8 text-amber-400" /></div><h3 className="mb-1 text-2xl font-extrabold text-white md:text-3xl">{program.age_range}</h3><p className="mb-4 text-sm font-semibold text-amber-400/80">{program.title}</p><p className="mb-8 flex-1 text-sm leading-relaxed text-white/40">{program.description}</p><div className="mb-8 space-y-3 text-sm text-white/40"><p className="flex items-center gap-3"><Clock className="h-4 w-4 text-amber-400/60" />{program.schedule}</p><p className="flex items-center gap-3"><Users className="h-4 w-4 text-amber-400/60" />{program.capacity_text}</p></div><button onClick={scrollToRegistration} className={`w-full rounded-xl py-3 text-sm font-bold uppercase tracking-wider transition ${highlight ? 'bg-amber-400 text-black hover:bg-amber-300' : 'border border-white/20 text-white hover:border-amber-400/50 hover:text-amber-400'}`}>Kayıt Başvurusu</button></motion.article>; })}</div>
    </div></section>
  );
}
