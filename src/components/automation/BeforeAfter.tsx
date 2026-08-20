import ArrowRightIcon from "@/components/ui/ArrowRightIcon";

// Figma id=544:4536 "Before & After".
const WITHOUT_ITEMS = [
  "Менеджер вручную переносит заявки",
  "Счета формируются 2 часа",
  "Клиент ждёт ответ сутки",
  "Ошибки в отчётах каждую неделю",
  "Обработка данных занимает 3 часа",
];

const WITH_ITEMS = [
  "Заявки попадают в CRM автоматически",
  "Счёт формируется за 10 секунд",
  "Клиент получает ответ мгновенно",
  "Отчёты генерируются без ошибок",
  "Поддержка клиентов доступна 24/7",
];

export default function BeforeAfter() {
  return (
    <section className="bg-white px-6 py-16 sm:px-[90px] sm:py-[120px]">
      <div className="mx-auto flex max-w-[1260px] flex-col gap-10 lg:flex-row lg:items-start lg:gap-[42px]">
        <div className="flex w-full flex-col gap-6 lg:max-w-[400px] lg:gap-[42px]">
          <div className="flex flex-col">
            <p className="font-sans text-5xl font-black leading-[0.95] tracking-[-2px] text-brand-red sm:text-[56px]">
              ДО и ПОСЛЕ
            </p>
            <p className="font-sans text-3xl font-black leading-[0.95] tracking-[-1px] text-[#1E2F35] sm:text-4xl">
              АВТОМАТИЗАЦИИ
            </p>
          </div>
          <p className="max-w-[380px] font-body text-lg text-[#1E2F35] sm:text-xl">
            Посмотрите, как меняется рабочий процесс после внедрения наших решений.
          </p>
        </div>

        <div className="relative flex w-full flex-col gap-8 sm:flex-row sm:items-stretch">
          <div
            className="flex flex-1 flex-col gap-6 rounded-3xl border-[3px] border-[rgba(150,150,150,0.05)] p-7"
            style={{
              background: "linear-gradient(-67.26deg, rgba(30,47,53,0.1) 20.37%, rgba(30,47,53,0.04) 91.51%)",
            }}
          >
            <div className="flex flex-col gap-2">
              <p className="font-sans text-2xl font-semibold text-[#1E2F35]">Без автоматизации</p>
              <div className="h-1 w-9 rounded-full bg-[#1E2F35]" />
            </div>
            <ul className="flex flex-col gap-3.5">
              {WITHOUT_ITEMS.map((item) => (
                <li key={item} className="flex items-center gap-3.5">
                  <span className="flex shrink-0 items-center justify-center rounded-full bg-[rgba(150,150,150,0.17)] p-[3px]">
                    {/* eslint-disable-next-line @next/next/no-img-element -- точная иконка из Figma */}
                    <img src="/images/automation/icons/x-circle.svg" alt="" className="size-4" />
                  </span>
                  <p className="font-body text-sm text-[#1E2F35]">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="absolute left-1/2 top-1/2 z-10 hidden size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#1E2F35] shadow-[0_6px_6px_rgba(248,34,69,0.3)] sm:flex">
            <ArrowRightIcon className="size-7 text-white" />
          </div>

          <div className="relative flex flex-1 flex-col gap-6 overflow-hidden rounded-3xl border-[3px] border-white/[0.38] bg-[#AF0609] p-7">
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden opacity-60">
              {/* eslint-disable-next-line @next/next/no-img-element -- декоративный вихрь из Figma */}
              <img
                src="/images/automation/decor/before-after-swirl-1.svg"
                alt=""
                className="absolute -left-[10%] top-[30%] w-[220%] max-w-none -rotate-[5deg]"
              />
              {/* eslint-disable-next-line @next/next/no-img-element -- декоративный вихрь из Figma */}
              <img
                src="/images/automation/decor/before-after-swirl-2.svg"
                alt=""
                className="absolute -left-[80%] -top-[95%] w-[160%] max-w-none -rotate-[5deg]"
              />
              {/* eslint-disable-next-line @next/next/no-img-element -- декоративный вихрь из Figma */}
              <img
                src="/images/automation/decor/before-after-vector-35.svg"
                alt=""
                className="absolute bottom-[-15%] left-[55%] w-[95%] max-w-none rotate-[7deg]"
              />
              {/* eslint-disable-next-line @next/next/no-img-element -- декоративный вихрь из Figma */}
              <img
                src="/images/automation/decor/before-after-vector-36.svg"
                alt=""
                className="absolute -left-[15%] -top-[55%] w-[210%] max-w-none rotate-[139deg]"
              />
            </div>
            <div className="relative flex flex-col gap-2">
              <p className="font-sans text-2xl font-semibold text-white">С автоматизацией</p>
              <div className="h-1 w-9 rounded-full bg-white" />
            </div>
            <ul className="relative flex flex-col gap-3.5">
              {WITH_ITEMS.map((item) => (
                <li key={item} className="flex items-center gap-3.5">
                  <span className="flex shrink-0 items-center justify-center rounded-full bg-white/30 p-[3px]">
                    {/* eslint-disable-next-line @next/next/no-img-element -- точная иконка из Figma */}
                    <img src="/images/shared/icons/check.svg" alt="" className="size-4" />
                  </span>
                  <p className="font-body text-sm text-white">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
