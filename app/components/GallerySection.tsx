'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { GalleryDisplaySize, GalleryImage } from '@/types/database';

const sizeClasses: Record<GalleryDisplaySize, string> = {
  normal: '',
  wide: 'col-span-2',
  tall: 'row-span-2',
  large: 'col-span-2 row-span-2',
};

export default function GallerySection({ images }: { images: GalleryImage[] }) {
  return (
    <section id="galeri" className="relative scroll-mt-20 bg-black py-20 md:py-32"><div className="absolute inset-0 bg-gradient-to-b from-black via-[#050505] to-black" /><div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14 text-center"><p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-amber-400/80 md:text-sm">Akademiden Kareler</p><h2 className="mb-4 text-3xl font-extrabold text-white md:text-5xl">Sahadaki <span className="bg-gradient-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">Enerjimiz</span></h2><p className="mx-auto max-w-2xl text-base text-white/50 md:text-lg">Juventus Academy Batıkent&apos;te çocuklarımızın antrenman ve maç anları</p></motion.div>
      <div className="grid auto-rows-[180px] grid-flow-row-dense grid-cols-2 gap-3 sm:auto-rows-[230px] md:grid-cols-3 md:auto-rows-[250px] md:gap-4 lg:auto-rows-[290px]">{images.map((photo, index) => <motion.figure key={photo.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: Math.min(index * 0.05, 0.3) }} className={`group relative isolate overflow-hidden rounded-2xl bg-[#0A0A0A] md:rounded-3xl ${sizeClasses[photo.display_size]}`}><Image src={photo.image_url} alt={photo.alt_text} fill sizes="(max-width:768px) 50vw, 33vw" style={{ objectPosition: photo.object_position }} className="object-cover transition-transform duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-transparent opacity-75 transition group-hover:opacity-100" /><figcaption className="absolute inset-x-0 bottom-0 p-4 transition group-hover:-translate-y-1 md:p-6"><span className="text-sm font-semibold text-white md:text-base">{photo.title}</span>{photo.description ? <p className="mt-1 line-clamp-2 text-xs text-white/55">{photo.description}</p> : null}</figcaption></motion.figure>)}</div>
    </div></section>
  );
}
