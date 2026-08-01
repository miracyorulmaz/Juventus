'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import type { Coach } from '@/types/database';

export default function CoachingStaff({ coaches }: { coaches: Coach[] }) {
  return (
    <section id="antrenorler" className="relative scroll-mt-20 overflow-hidden bg-black py-20 md:py-32"><div className="absolute inset-0 bg-gradient-to-b from-black via-[#050505] to-black" /><div className="relative z-10 mx-auto max-w-6xl px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14 text-center"><p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-amber-400/80 md:text-sm">Teknik Kadro</p><h2 className="mb-4 text-3xl font-extrabold text-white md:text-5xl">Profesyonel <span className="bg-gradient-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">Antrenörler</span></h2><p className="mx-auto max-w-2xl text-base text-white/50 md:text-lg">Juventus metodolojisini sahaya taşıyan deneyimli ekibimiz</p></motion.div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{coaches.map((coach, index) => <motion.article key={coach.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.12 }} className="group overflow-hidden rounded-3xl border border-white/5 bg-[#0A0A0A] transition hover:border-amber-400/25"><div className="relative aspect-[4/5] overflow-hidden"><Image src={coach.photo_url} alt={`${coach.name} - ${coach.role}`} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" /><div className="absolute bottom-0 p-6"><div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-black/60 px-3 py-1 text-xs font-bold text-amber-300 backdrop-blur"><ShieldCheck className="h-3.5 w-3.5" /> Juventus Academy</div><h3 className="text-2xl font-black">{coach.name}</h3><p className="text-sm font-semibold text-amber-400/75">{coach.role}</p></div></div>{coach.biography ? <p className="p-6 text-sm leading-relaxed text-white/40">{coach.biography}</p> : null}</motion.article>)}</div>
    </div></section>
  );
}
