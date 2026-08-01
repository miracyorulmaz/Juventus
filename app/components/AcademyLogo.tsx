'use client';

import Image from 'next/image';
import { useState } from 'react';
import JuventusLogo from './JuventusLogo';

type AcademyLogoProps = {
  className?: string;
  variant?: 'light' | 'dark';
  priority?: boolean;
};

export default function AcademyLogo({ className = 'h-14 w-auto', variant = 'light', priority = false }: AcademyLogoProps) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span className={`inline-flex items-center gap-3 ${className}`} role="img" aria-label="Juventus Academy Ankara">
        <JuventusLogo className="h-full w-auto shrink-0" color={variant === 'light' ? 'white' : 'black'} />
        <span className={`whitespace-nowrap text-left text-[0.28em] font-black uppercase leading-tight tracking-[0.08em] ${variant === 'light' ? 'text-white' : 'text-black'}`}>
          Juventus Academy<br /><span className="text-amber-500">Ankara</span>
        </span>
      </span>
    );
  }
  return (
    <Image
      src={`/images/brand/academy-logo-${variant}.png`}
      alt="Juventus Academy Ankara"
      width={1200}
      height={805}
      className={`object-contain ${className}`}
      priority={priority}
      onError={() => setFailed(true)}
    />
  );
}
