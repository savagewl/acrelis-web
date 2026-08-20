import SiteHeader from "@/components/base/SiteHeader";
import type { Case } from "@/types/case";

// Figma id=145:9355 (/cases/[slug]) — тот же фон-приём, что у ServiceHero (фото + hard-light/
// overlay блендов), но с собственной композицией: теги, хлебная крошка с названием кейса,
// без кнопки, декоративная "chat"-иконка внизу справа.
export default function CaseHero({ item }: { item: Case }) {
  return (
    <section className="relative overflow-hidden bg-black">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-black" />
        {/* eslint-disable-next-line @next/next/no-img-element -- декоративный фоновый слой с блендом */}
        <img
          src="/images/cases/rossiya/hero-bg-1.png"
          alt=""
          className="absolute inset-0 size-full object-bottom object-cover opacity-40 mix-blend-hard-light"
        />
        <div className="absolute inset-0 bg-[rgba(150,150,150,0.75)] mix-blend-hard-light" />
        <div
          className="absolute inset-0 mix-blend-overlay"
          style={{ background: "linear-gradient(91.37deg, rgba(29,29,27,0.4) 8.14%, rgba(29,29,27,0) 88.61%)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, #191919 4.36%, rgba(17,24,26,0) 64.42%)" }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- декоративный фоновый слой, основное фото */}
        <img src={item.coverImage} alt="" className="absolute inset-0 size-full object-cover" />
      </div>

      <div className="relative z-10 flex h-[900px] flex-col">
        <SiteHeader variant="light" />

        <div className="flex flex-1 flex-col justify-center gap-6 px-6 py-12 sm:px-[90px]">
          <p className="font-body text-base text-[#1E2F35]">
            Главная / Портфолио / <span className="text-brand-red">{item.title.replace(/[«»]/g, "")}</span>
          </p>

          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-3">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="whitespace-nowrap rounded-2xl bg-[rgba(30,47,53,0.15)] px-4 py-2 font-body text-sm font-medium text-[#1E2F35]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="max-w-[1006px] font-sans text-4xl font-black tracking-[-1px] text-[#1E2F35] sm:text-[36px]">
              {item.title}
            </h1>
            <p className="max-w-[630px] font-body text-lg text-[#1E2F35] sm:text-xl">{item.shortDescription}</p>
          </div>
        </div>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element -- декоративная иконка из Figma */}
      <img
        src="/images/cases/rossiya/chat-icon.svg"
        alt=""
        className="absolute bottom-[52px] right-[90px] z-10 size-[66px] rounded-full border border-white/40 bg-white/10 p-3 backdrop-blur-sm"
      />
    </section>
  );
}
