import type { Case } from "@/types/case";

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span aria-hidden className="size-[7px] shrink-0 rounded-full bg-brand-red" />
        <p className="font-body text-xs font-semibold uppercase tracking-[0.5px] text-body-muted">{label}</p>
      </div>
      <p className="font-sans text-lg text-[#1E2F35]">{value}</p>
    </div>
  );
}

// Figma id=145:10568 (/cases/[slug]) — левая колонка (Клиент/Период/Стек/Команда + ссылка
// на проект) + правая колонка ("Задачи").
export default function CaseInfoTasks({ item }: { item: Case }) {
  return (
    <section className="bg-white px-6 py-16 sm:px-[90px] sm:py-[100px]">
      <div className="mx-auto flex w-full max-w-[1260px] flex-col gap-10 lg:flex-row lg:gap-12">
        <div className="flex w-full flex-col gap-6 lg:w-[400px] lg:shrink-0">
          <InfoRow label="Клиент" value={item.client} />
          <InfoRow label="Период" value={item.developmentPeriod} />
          <InfoRow label="Стек" value={item.techStack.join(", ")} />
          <InfoRow label="Команда" value={item.team} />
          {item.projectUrl && (
            <a
              href={item.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-fit items-center gap-2 font-sans text-lg text-brand-red underline underline-offset-2"
            >
              {item.projectUrl.replace(/^https?:\/\//, "")}
            </a>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-6">
          <h2 className="font-sans text-4xl font-medium text-[#1E2F35] sm:text-[56px]">Задачи</h2>
          <div
            className="flex flex-col gap-4 font-body text-lg leading-[1.5] text-[#1E2F35] sm:text-xl [&>p]:leading-[1.5]"
            dangerouslySetInnerHTML={{ __html: item.tasksHtml }}
          />
        </div>
      </div>
    </section>
  );
}
