// Inline mark keeps the brand visible even if a static logo asset fails.
export default function JuventusLogo({
  className = 'w-24 h-auto',
  color = 'currentColor',
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 500 500"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {/* Outer shield/circle */}
      <path d="M250 420C343.4 420 420 343.4 420 250C420 156.6 343.4 80 250 80C156.6 80 80 156.6 80 250C80 343.4 156.6 420 250 420Z" stroke={color} strokeWidth="12" />
      <path d="M250 450C360.4 450 450 360.4 450 250C450 139.6 360.4 50 250 50C139.6 50 50 139.6 50 250C50 360.4 139.6 450 250 450Z" stroke={color} strokeWidth="3" />
      {/* Left vertical stripe */}
      <rect x="130" y="100" width="22" height="280" rx="6" fill={color} />
      {/* Right vertical stripe */}
      <rect x="348" y="100" width="22" height="280" rx="6" fill={color} />
      {/* Stylized J letterform */}
      <path d="M195 140 L195 350 C195 400 240 410 280 400 L380 370" stroke={color} strokeWidth="30" strokeLinecap="round" strokeLinejoin="round" />
      {/* J top bar */}
      <path d="M175 160 C250 90 380 120 380 120" stroke={color} strokeWidth="30" strokeLinecap="round" />
    </svg>
  );
}
