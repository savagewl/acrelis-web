"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface Stat {
  /** Числовая часть для анимации нарастания. */
  target: number;
  prefix?: string;
  suffix: string;
  label: string;
}

const STATS: Stat[] = [
  { target: 100, suffix: "+", label: "проектов" },
  { target: 50, suffix: "+", label: "клиентов" },
  { target: 3, suffix: " года", label: "опыта" },
  { target: 98, suffix: "%", label: "довольных клиентов" },
];

const DURATION_MS = 1400;

function useCountUp(target: number, start: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf: number;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / DURATION_MS, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target]);

  return value;
}

function StatItem({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const value = useCountUp(stat.target, inView);

  return (
    <div ref={ref} className="flex flex-col justify-center gap-2.5">
      <p className="font-sans text-5xl font-light leading-none tracking-normal text-brand-red sm:text-[80.41px]">
        {stat.prefix}
        {value}
        {stat.suffix}
      </p>
      <p className="font-body text-base font-medium text-body-muted sm:text-xl">{stat.label}</p>
    </div>
  );
}

// Figma id=161:11487 (/about). По ТЗ (About page.tsx) — цифры нарастают при попадании в
// зону видимости, не статичны.
export default function StatsBar() {
  return (
    <section className="bg-white px-6 py-6 sm:px-[90px]">
      <div className="mx-auto flex w-full max-w-[1260px] flex-wrap items-start justify-between gap-x-8 gap-y-10">
        {STATS.map((stat) => (
          <StatItem key={stat.label} stat={stat} />
        ))}
      </div>
    </section>
  );
}
