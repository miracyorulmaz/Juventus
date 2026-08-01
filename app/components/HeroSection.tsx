'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown, Shield, Star } from 'lucide-react';
import AcademyLogo from './AcademyLogo';

export default function HeroSection({ title, description }: { title: string; description: string }) {
  const [before, after = ''] = title.split('Juventus');
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <section id="anasayfa" className="relative flex min-h-screen scroll-mt-20 items-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0"><Image src="/images/hero-bg.jpg" alt="Juventus Academy Batıkent antrenmanı" fill priority sizes="100vw" className="object-cover object-center opacity-50" /><div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" /><div className="absolute inset-0 bg-black/30" /></div>
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.5) 40px, rgba(255,255,255,0.5) 42px)', backgroundSize: '100% 80px' }} />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-28 sm:pt-32 md:pb-24 md:pt-36">
        <div className="flex flex-col items-center text-center">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="mb-6 rounded-2xl bg-white px-6 py-4 shadow-[0_8px_40px_rgba(0,0,0,0.4)] md:rounded-3xl md:px-8 md:py-5"><AcademyLogo variant="dark" priority className="h-16 w-auto sm:h-20 md:h-24" /></motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/5 px-5 py-2"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /><span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 md:text-sm">Resmi Juventus Akademisi</span><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /></motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="mb-6 max-w-4xl text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">{before}<span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 bg-clip-text text-transparent">Juventus</span>{after}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="mb-12 max-w-2xl text-base font-light leading-relaxed text-white/60 md:text-xl">{description}</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }} className="flex flex-col gap-4 sm:flex-row"><button onClick={() => scrollTo('kayit')} className="rounded-full bg-gradient-to-r from-amber-500 to-amber-400 px-10 py-4 text-sm font-bold uppercase tracking-wider text-black transition hover:scale-105 hover:shadow-[0_0_40px_rgba(251,191,36,0.3)]"><span className="flex items-center gap-2"><Shield className="h-4 w-4" /> Ücretsiz Deneme İçin Hemen Kayıt Ol</span></button><button onClick={() => scrollTo('programlar')} className="rounded-full border-2 border-white/30 px-10 py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:border-white/50 hover:bg-white/10">Programları Keşfet</button></motion.div>
        </div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"><motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}><ChevronDown className="h-5 w-5 text-white/30" /></motion.div></motion.div>
    </section>
  );
}
