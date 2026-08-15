"use client";

import { useModal } from "@/components/providers/ModalProvider";

interface TechCardData {
  title: string;
  description: string;
  tags: string[];
}

const TECH_CARDS: TechCardData[] = [
  {
    title: "Backend",
    description: "Серверные технологии и базы данных",
    tags: ["Go", "Gin", "Битрикс24", "Python", "Django", "PostgreSQL", "SQLAlchemy", "Node.js", "C# .NET", "Java", "Spring"],
  },
  {
    title: "Frontend",
    description: "Клиентские интерфейсы и фреймворки",
    tags: ["Next.js", "HTML", "React", "SCSS/LESS", "Tailwind", "JavaScript", "TypeScript"],
  },
  {
    title: "Интеграции",
    description: "API‑интеграции и сервисы",
    tags: ["Aigram", "Bitrix24", "1C", "ЮKassa", "Google API", "REST API"],
  },
  {
    title: "DevOps",
    description: "Инфраструктура, CI/CD и инструменты",
    tags: ["Linux", "Nginx", "Git", "VPS/VDS", "Docker", "CI/CD"],
  },
];

function TechCard({ title, description, tags }: TechCardData) {
  return (
    <div className="flex w-full flex-col gap-3 rounded-2xl border border-[#e5e7eb] bg-white p-5">
      <p className="font-sans text-lg font-medium leading-6 text-[#111827]">{title}</p>
      <p className="font-sans text-sm leading-5 text-[#6b7280]">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[#e5e7eb] bg-[#f3f4f6] px-2.5 py-1.5 font-sans text-[13px] leading-[18px] text-[#374151]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  const { openLeaveRequest } = useModal();

  return (
    <section className="relative overflow-hidden bg-white px-6 py-16 sm:px-[90px] sm:py-[120px]">
      {/* eslint-disable-next-line @next/next/no-img-element -- декоративная плоская
          PNG-заготовка, вытянутая напрямую рендером узла из Figma (get_screenshot на
          590:5107), а не пересобрана через CSS clip/rotate/градиент — после трёх попыток
          воссоздать эффект вручную оказалось надёжнее взять готовый пиксельный результат. */}
      <img
        src="/images/decor/tech-stack-swirl-left.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -left-4 -top-4 hidden w-[320px] lg:block"
      />
      {/* eslint-disable-next-line @next/next/no-img-element -- см. комментарий выше, узел 590:5136 */}
      <img
        src="/images/decor/tech-stack-swirl-right.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -bottom-4 -right-4 hidden w-[340px] lg:block"
      />

      <div className="relative mx-auto flex max-w-[1260px] flex-col gap-12">
        <h2 className="font-sans text-[56px] font-medium leading-[57.12px] tracking-[-3.64px] text-[#233237]">
          Используемые технологии
        </h2>

        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <TechCard {...TECH_CARDS[0]} />
            <TechCard {...TECH_CARDS[1]} />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <TechCard {...TECH_CARDS[2]} />
            <TechCard {...TECH_CARDS[3]} />
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="flex max-w-[624px] flex-col gap-4">
            <h3 className="font-sans text-[23.4px] font-semibold leading-[36px] text-[#233237]">
              Подбираем стек под задачу,
              <br />
              бюджет и дальнейшее развитие
            </h3>
            <p className="font-body text-[17.4px] leading-[28px] text-body-muted">
              Если вы не нашли необходимый стек, мы готовы быстро подобрать команду или отдельных технических
              экспертов под вас
            </p>
          </div>

          <button
            type="button"
            onClick={openLeaveRequest}
            className="shrink-0 rounded-xl px-[60px] py-6 font-sans text-xl font-medium leading-[21px] text-white"
            style={{ background: "linear-gradient(90deg, #F43367 3.56%, #FF050A 100%)" }}
          >
            Обсудить задачу
          </button>
        </div>
      </div>
    </section>
  );
}
