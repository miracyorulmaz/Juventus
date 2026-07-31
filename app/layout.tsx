import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Juventus Academy Batıkent | Resmi Juventus Okulu',
  description:
    "Juventus FC resmi ortaklığıyla, Batıkent'te dünya standartlarında altyapı ve futbol eğitimi. 3-15 yaş arası çocuklar için profesyonel futbol akademisi.",
  icons: { icon: '/images/juventus-logo.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body className="bg-[#000000] text-white antialiased">{children}</body>
    </html>
  );
}
