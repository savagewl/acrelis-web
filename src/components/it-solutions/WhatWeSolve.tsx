import {
  TRANSFORMATION_ROWS,
  WHAT_WE_SOLVE_HEADING_LINE_1,
  WHAT_WE_SOLVE_HEADING_LINE_2,
} from "@/data/it-solutions/what-we-solve";

// Figma id=342:2039 "What-We-Solve". Зебра-полоски строк — не через явный fill каждой
// строки, а как в самом Figma: у контейнера общий светло-серый фон (rgba(150,150,150,0.1)),
// а чётные строки поверх него красятся в непрозрачный белый, нечётные остаются
// прозрачными и показывают серый фон насквозь.
export default function WhatWeSolve() {
  return (
    <section className="flex flex-col gap-12 bg-white py-16 sm:gap-16 sm:py-[120px]">
      <div className="px-6 sm:px-[90px]">
        <h2 className="font-sans text-4xl font-medium leading-[1.05] tracking-[-1px] text-[#1E2F35] sm:text-[56px]">
          {WHAT_WE_SOLVE_HEADING_LINE_1}
          <br />
          {WHAT_WE_SOLVE_HEADING_LINE_2}
        </h2>
      </div>

      <div className="px-6 sm:px-[90px]">
        <div className="flex flex-col overflow-hidden rounded-[32px] bg-[rgba(150,150,150,0.1)]">
          {TRANSFORMATION_ROWS.map((row, i) => (
            <div key={row.number} className={i % 2 === 1 ? "bg-white" : undefined}>
              <div className="flex flex-col pt-6 sm:min-h-[166px] sm:flex-row sm:items-stretch sm:pt-0">
                {/* Цифра уходит за левый край блока — в самом Figma это clip-контейнер
                    197×166 с текстом 159.5px, сдвинутым на left:-43px (левый штрих среза́н
                    краем блока) и стоящим у ВЕРХА контейнера (top:5px в исходнике, не
                    bottom!) — небольшой отступ сверху уже есть в самом макете, просто у
                    жирного Axiforma-Black на таком размере визуально мало внутреннего
                    "воздуха" над цифрой, и с bottom:0 (как было до этого) этот отступ
                    вообще пропадал. Паддинг строки (p-12) в самом Figma лежит ТОЛЬКО на
                    текстовом контенте, а не на цифре. */}
                <div className="relative h-[120px] w-[140px] shrink-0 overflow-hidden sm:h-auto sm:w-[197px]">
                  <p aria-hidden className="absolute -left-[31px] top-8 font-sans text-[113px] font-black leading-none text-[rgba(150,150,150,0.5)] opacity-30 sm:-left-[43px] sm:top-10 sm:text-[160px]">
                    {row.number}
                  </p>
                </div>
                <div className="flex flex-1 flex-col gap-4 p-6 pt-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-12">
                  <p className="font-sans text-lg text-[#1E2F35] sm:w-[373px] sm:text-[22px]">{row.problem}</p>
                  {/* eslint-disable-next-line @next/next/no-img-element -- точная иконка из Figma */}
                  <img
                    src="/images/it-solutions/icons/chevron-right.svg"
                    alt=""
                    className="hidden h-4 w-[88px] shrink-0 sm:block"
                  />
                  <div className="flex items-center gap-4">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-xl bg-brand-red">
                      {/* eslint-disable-next-line @next/next/no-img-element -- точная иконка из Figma */}
                      <img src="/images/it-solutions/icons/check.svg" alt="" className="size-3" />
                    </span>
                    <p className="font-sans text-lg font-semibold text-[#1E2F35] sm:w-[384px] sm:text-[22px]">
                      {row.solution}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
