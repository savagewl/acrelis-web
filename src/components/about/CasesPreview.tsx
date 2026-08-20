import Link from "next/link";
import ArrowLeftIcon from "@/components/ui/ArrowLeftIcon";
import ArrowRightIcon from "@/components/ui/ArrowRightIcon";
import CaseCard from "@/components/cases/CaseCard";
import { CASES } from "@/data/home/cases";

// Figma id=161:11218 "Section - residence" (/about). В макете все 3 карточки — один и
// тот же плейсхолдер-кейс, продублированный с одинаковыми тегами; по решению пользователя
// показываем реальные 3 кейса с главной (те же картинки/теги, что и в CaseShowcase) в этой
// более лёгкой сетке-виджете. Стрелки/полоска "01/03" — те же элементы, что в Figma;
// нефункциональны, т.к. все 3 реальных кейса уже показаны одновременно, пролистывать
// больше нечего.
export default function CasesPreview() {
  return (
    <section className="bg-white px-6 py-12 sm:px-[90px]">
      <div className="mx-auto flex w-full max-w-[1260px] flex-col gap-8">
        <div className="flex items-center justify-between">
          <h2 className="font-sans text-4xl font-medium tracking-[-2px] text-[#1E2F35] sm:text-[56px]">Кейсы</h2>
          <Link
            href="/portfolio"
            className="shrink-0 rounded-2xl border-2 border-[rgba(150,150,150,0.2)] bg-[#1E2F35] px-5 py-3.5 font-sans text-base font-medium text-white sm:text-lg"
          >
            Все проекты
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {CASES.map((study) => (
            <CaseCard key={study.title} study={study} />
          ))}
        </div>

        <div className="mx-auto flex w-full max-w-[1240px] items-center gap-8">
          <div className="flex items-center gap-2.5">
            <span aria-hidden className="flex size-10 items-center justify-center text-[#1E2F35]/40">
              <ArrowLeftIcon className="size-[22px]" />
            </span>
            <span aria-hidden className="flex size-10 items-center justify-center text-[#1E2F35]/40">
              <ArrowRightIcon className="size-[22px]" />
            </span>
          </div>
          <div className="relative h-0.5 flex-1 bg-[rgba(150,150,150,0.3)]">
            <div className="absolute inset-y-0 left-0 w-1/3 bg-brand-red" />
          </div>
          <p className="whitespace-nowrap font-sans text-xl text-[#1E2F35]">01/03</p>
        </div>
      </div>
    </section>
  );
}
