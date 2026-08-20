import type { Case } from "@/types/case";

// Figma id=161:10777 (/cases/[slug]) — заголовок "Результат", абзац с красной левой
// полосой и ряд из 4 метрик. resultHtml/tasksHtml (CaseInfoTasks) — наш собственный
// статичный текст (data/cases.ts), не пользовательский ввод; когда контент начнёт
// приходить с бэкенда/CMS, перед рендером нужно будет прогонять через санитайзер.
export default function CaseResult({ item }: { item: Case }) {
  return (
    <section className="bg-white px-6 pb-16 sm:px-[90px] sm:pb-[100px]">
      <div className="mx-auto flex w-full max-w-[1260px] flex-col gap-6">
        <h2 className="font-sans text-4xl font-medium text-[#1E2F35] sm:text-[56px]">Результат</h2>
        <div
          className="border-l-[1.5px] border-brand-red px-3 font-body text-lg leading-[1.5] text-[#1E2F35] sm:text-xl [&>p]:leading-[1.5]"
          dangerouslySetInnerHTML={{ __html: item.resultHtml }}
        />

        {item.metrics.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-8 py-6">
            {item.metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col items-center gap-2.5 text-center">
                <p className="font-sans text-5xl font-light text-[#213A42] sm:text-[80px]">{metric.value}</p>
                <p className="font-body text-base font-medium text-brand-red sm:text-xl">{metric.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
