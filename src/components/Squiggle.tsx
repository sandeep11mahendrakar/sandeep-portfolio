export default function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 12"
      fill="none"
      className={`absolute -bottom-2 left-0 w-full ${className}`}
      preserveAspectRatio="none"
    >
      <path
        d="M3 8 Q 16 2, 30 7 T 60 6 T 90 7 T 117 5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
