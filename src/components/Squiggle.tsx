export default function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1000 100"
      preserveAspectRatio="none"
      fill="none"
      className={`w-full h-4 md:h-6 ${className}`}
    >
      <polyline
        points="10,60 45,25 80,80 125,20 165,75 210,30 245,85 290,25 330,70 375,30 410,85 455,20 490,75 535,35 570,80 615,25 650,75 695,20 730,85 775,30 810,75 855,25 890,80 935,20 970,70"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
