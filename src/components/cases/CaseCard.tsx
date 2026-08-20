import Image from "next/image";
import Link from "next/link";
import ArrowUpRightIcon from "@/components/ui/ArrowUpRightIcon";
import type { CaseStudy } from "@/data/home/cases";

// Общая карточка кейса — Figma id=161:11218 (/about), 145:10343 (/cases/[slug]), 145:6945
// (/portfolio): везде один и тот же паттерн (картинка + бейдж "Сайт" + заголовок + описание
// + теги + стрелка). Кликается только если у кейса есть slug (полная страница /cases/[slug]
// — сейчас так только у «Россия — Исламский мир»); у остальных — не кликается, а не ведёт
// на несуществующий/пустой контент.
export default function CaseCard({ study }: { study: CaseStudy }) {
  const content = (
    <>
      <div className="relative flex h-[300px] w-full items-start justify-end overflow-hidden rounded-t-xl p-3">
        <Image src={study.image} alt="" fill className="object-cover" />
        <span className="relative z-10 rounded-full border border-[#1E2F35] bg-white px-3 py-2 font-body text-sm font-medium text-[#1D1D1B]">
          Сайт
        </span>
      </div>

      <div className="flex flex-col gap-3 px-5 pb-5">
        <h3 className="font-sans text-xl font-semibold text-[#1E2F35]">{study.title}</h3>
        <p className="line-clamp-2 font-body text-sm text-body-muted">{study.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {study.tags.map((tag) => (
              <span key={tag} className="whitespace-nowrap rounded-full bg-white px-2 py-2 font-body text-sm text-body-muted">
                {tag}
              </span>
            ))}
          </div>
          <ArrowUpRightIcon className="size-6 shrink-0 text-brand-red" />
        </div>
      </div>
    </>
  );

  const className = "flex flex-col gap-6 rounded-xl bg-[rgba(150,150,150,0.05)]";

  if (study.slug) {
    return (
      <Link href={`/cases/${study.slug}`} className={className}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}
