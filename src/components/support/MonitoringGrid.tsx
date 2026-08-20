"use client";

import { motion } from "framer-motion";
import {
  MONITORING_ALERT_TEXT,
  MONITORING_HEADING,
  MONITORING_ITEMS,
  MONITORING_OVERLINE,
  MONITORING_SUBTITLE,
} from "@/data/support/monitoring";

// Figma id=345:2988 "Section_Monitoring" (/support). Тёмная секция (#1d1d1b) с сеткой из
// 8 карточек мониторинга (2×4) и нижней "Bottom-Alert" плашкой с тройным пульсирующим
// кольцом (три вложенных круга общим красным градиентом, opacity 30/48/100%).
export default function MonitoringGrid() {
  return (
    <section className="bg-[#1D1D1B] px-6 py-16 sm:px-[90px] sm:py-[120px]">
      <div className="mx-auto flex w-full max-w-[1260px] flex-col gap-12 sm:gap-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="font-body text-sm font-semibold uppercase tracking-[1.5px] text-brand-red">
            {MONITORING_OVERLINE}
          </p>
          <h2 className="font-sans text-4xl font-medium tracking-[-1px] text-white sm:text-5xl">
            {MONITORING_HEADING}
          </h2>
          <p className="max-w-[600px] font-body text-lg text-body-muted sm:text-xl">{MONITORING_SUBTITLE}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {MONITORING_ITEMS.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: (index % 4) * 0.08 }}
              className="flex flex-col gap-4 rounded-3xl bg-[#252523] p-6"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-brand-red">
                {/* eslint-disable-next-line @next/next/no-img-element -- иконка из Figma экспорта */}
                <img src={item.icon} alt="" className="size-5" />
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="font-sans text-base font-semibold text-white">{item.title}</p>
                <p className="font-body text-sm text-body-muted">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-8 text-center sm:flex-row sm:justify-center sm:gap-6 sm:py-6">
          <span aria-hidden className="relative flex size-[38.363px] shrink-0 items-center justify-center">
            <span
              className="absolute inline-flex size-full rounded-full opacity-30"
              style={{ background: "linear-gradient(90deg, #F43367 0%, #FF050A 100%)" }}
            />
            <span
              className="absolute inline-flex size-[27.78px] rounded-full opacity-[0.48]"
              style={{ background: "linear-gradient(90deg, #F43367 0%, #FF050A 100%)" }}
            />
            <span
              className="relative inline-flex size-[16.87px] animate-pulse rounded-full"
              style={{ background: "linear-gradient(90deg, #F43367 0%, #FF050A 100%)" }}
            />
          </span>
          <p className="font-sans text-lg text-white sm:text-xl">{MONITORING_ALERT_TEXT}</p>
        </div>
      </div>
    </section>
  );
}
