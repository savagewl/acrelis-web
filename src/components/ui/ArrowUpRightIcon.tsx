// Точная стрелка из Figma (Container 180:931 в меню) — диагональная линия + уголок,
// currentColor, чтобы наследовать цвет текста (в т.ч. красный у "Свяжитесь с нами").
export default function ArrowUpRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}
