export default function PageHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mb-8">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-amber-400">{eyebrow}</p>
      <h1 className="text-3xl font-black sm:text-4xl">{title}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/45">{description}</p>
    </div>
  );
}
