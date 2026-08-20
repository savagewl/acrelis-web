"use client";

import { motion } from "framer-motion";

// Figma id=544:4868 "Section: Results of Automation".
interface Metric {
  value: string;
  accent: boolean;
  label: string;
  description: string;
}

const METRICS: Metric[] = [
  {
    value: "−60%",
    accent: true,
    label: "Ручных операций",
    description: "Освобождаем сотрудников от рутины и переключаем на интеллектуальные задачи.",
  },
  {
    value: "×3",
    accent: false,
    label: "Скорость обработки",
    description: "Ускоряем согласование документов, выставление счетов и работу с заявками клиентов.",
  },
  {
    value: "от 1 нед.",
    accent: true,
    label: "Срок внедрения",
    description: "Быстрый старт первых интеграций и получение видимого эффекта уже через месяц.",
  },
  {
    value: "24/7",
    accent: false,
    label: "Непрерывная работа",
    description: "Цифровые помощники работают без выходных, праздников, обедов и человеческого фактора.",
  },
];

export default function Results() {
  return (
    <section className="bg-white px-6 py-16 sm:px-[90px] sm:py-[120px]">
      <div className="mx-auto flex max-w-[1260px] flex-col gap-14">
        <div className="flex flex-col gap-4">
          <p className="font-body text-sm font-semibold uppercase tracking-[1.5px] text-brand-red">
            Эффективность в цифрах
          </p>
          <h2 className="font-sans text-3xl font-medium tracking-[-1px] text-[#1E2F35] sm:text-5xl">
            Результаты автоматизации
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {METRICS.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
              className="flex flex-col gap-4"
            >
              <p
                className={`font-sans text-4xl font-bold tracking-[-2px] sm:text-[56px] ${
                  metric.accent ? "text-brand-red" : "text-[#1E2F35]"
                }`}
              >
                {metric.value}
              </p>
              <div className="flex flex-col gap-2">
                <p className="font-axiforma text-[18px] font-bold leading-[24px] tracking-[0] text-[#1E2F35]">
  {metric.label}
</p>
                <p className="font-body text-sm text-body-muted">{metric.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="max-w-[840px] font-sans text-lg text-[#1E2F35]">
          Каждый проект начинается с аудита — мы находим узкие места и автоматизируем то, что даст{" "}
          <span className="text-brand-red">максимальный эффект уже в первый месяц.</span>
        </p>
      </div>
    </section>
  );
}
