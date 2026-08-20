"use client";

import { useState } from "react";

// Общий аккордеон FAQ — одна и та же механика/стиль на /automation (Figma id=337:872)
// и /it-solutions (Figma id=342:1922), контент (вопросы/ответы) передаётся пропами.
export interface FaqItem {
  question: string;
  answer: string | null;
}

export const FAQ_MISSING_ANSWER = "Ответ уточняется — контент ожидается от клиента.";

interface FaqProps {
  heading: string;
  subtitle: string;
  leftColumn: FaqItem[];
  rightColumn: FaqItem[];
  defaultOpenLeftIndex?: number | null;
}

function FaqAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="w-full rounded-3xl bg-[rgba(150,150,150,0.1)] p-6">
      <button type="button" onClick={onToggle} className="flex w-full items-center justify-between gap-4 text-left">
        <p className="font-sans text-xl font-semibold text-[#1E2F35]">{item.question}</p>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full">
          {/* eslint-disable-next-line @next/next/no-img-element -- точная иконка из Figma */}
          <img
            src={isOpen ? "/images/shared/icons/faq-minus.svg" : "/images/shared/icons/faq-plus.svg"}
            alt=""
            className="size-6"
          />
        </span>
      </button>
      {isOpen && (
        <div className="mt-4 pr-0 sm:pr-20">
          <p className={`font-body text-base leading-[26px] ${item.answer ? "text-body-muted" : "italic text-body-muted/70"}`}>
            {item.answer ?? FAQ_MISSING_ANSWER}
          </p>
        </div>
      )}
    </div>
  );
}

function FaqColumn({
  items,
  openIndex,
  setOpenIndex,
  columnId,
}: {
  items: FaqItem[];
  openIndex: number | null;
  setOpenIndex: (i: number | null) => void;
  columnId: string;
}) {
  return (
    <div className="flex flex-1 flex-col gap-[18px]">
      {items.map((item, i) => (
        <FaqAccordionItem
          key={`${columnId}-${item.question}`}
          item={item}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </div>
  );
}

export default function Faq({ heading, subtitle, leftColumn, rightColumn, defaultOpenLeftIndex = null }: FaqProps) {
  const [openLeft, setOpenLeft] = useState<number | null>(defaultOpenLeftIndex);
  const [openRight, setOpenRight] = useState<number | null>(null);

  return (
    <section className="bg-white px-6 py-16 sm:px-[90px] sm:py-[120px]">
      <div className="mx-auto flex max-w-[1260px] flex-col gap-16">
        <div className="flex flex-col gap-4">
          <h2 className="font-sans text-4xl font-medium tracking-[-1px] text-[#1E2F35] sm:text-[56px]">{heading}</h2>
          <p className="max-w-[768px] font-body text-lg text-body-muted sm:text-xl">{subtitle}</p>
        </div>

        <div className="flex flex-col gap-[18px] sm:flex-row">
          <FaqColumn items={leftColumn} openIndex={openLeft} setOpenIndex={setOpenLeft} columnId="left" />
          <FaqColumn items={rightColumn} openIndex={openRight} setOpenIndex={setOpenRight} columnId="right" />
        </div>
      </div>
    </section>
  );
}
