type AcademyLogoProps = {
  className?: string;
  variant?: 'light' | 'dark';
  priority?: boolean;
};

export default function AcademyLogo({
  className = 'h-14 w-auto',
  variant = 'light',
  priority = false,
}: AcademyLogoProps) {
  return (
    <img
      src={`/images/brand/academy-logo-${variant}.png`}
      alt="Juventus Academy Ankara"
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}
