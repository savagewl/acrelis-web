"use client";

import { useMemo, useState } from "react";
import ModalShell from "@/components/modals/ModalShell";
import ArrowLeftIcon from "@/components/ui/ArrowLeftIcon";
import ArrowRightIcon from "@/components/ui/ArrowRightIcon";
import ProgressBar from "@/components/home/calculator/ProgressBar";
import ResultPanel from "@/components/home/calculator/ResultPanel";
import StepProjectType from "@/components/home/calculator/steps/StepProjectType";
import StepDesign from "@/components/home/calculator/steps/StepDesign";
import StepModules from "@/components/home/calculator/steps/StepModules";
import StepIntegrations from "@/components/home/calculator/steps/StepIntegrations";
import StepTimeline from "@/components/home/calculator/steps/StepTimeline";
import {
  calculateTotal,
  type CalculatorSelection,
  type DesignOptionId,
  type IntegrationId,
  type ModuleId,
  type ProjectTypeId,
  type TimelineId,
} from "@/lib/calculator/pricing";

const STEP_COUNT = 5;

const EMPTY_SELECTION: CalculatorSelection = {
  projectType: null,
  design: null,
  modules: [],
  integrations: [],
  timeline: null,
};

// ТЗ (Блок "Соберите свой проект"): 5 фиксированных шагов, прогресс-бар, карточка
// результата справа (десктоп), пересчёт на лету, финальная форма и "Спасибо" по
// завершении. Figma: Section 719:124 (визуально дана только раскладка Шага 1 —
// остальные шаги используют тот же компонент пилюль для консистентности).
export default function Calculator() {
  const [step, setStep] = useState(0);
  const [selection, setSelection] = useState<CalculatorSelection>(EMPTY_SELECTION);
  const [showError, setShowError] = useState(false);
  const [thankYouOpen, setThankYouOpen] = useState(false);

  const result = useMemo(() => calculateTotal(selection), [selection]);

  const isStepValid = (s: number, sel: CalculatorSelection) => {
    if (s === 0) return sel.projectType !== null;
    if (s === 1) return sel.design !== null;
    if (s === 4) return sel.timeline !== null;
    return true; // модули/интеграции — опциональны по ТЗ
  };

  const canSubmit = [0, 1, 4].every((s) => isStepValid(s, selection));

  const handleNext = () => {
    if (!isStepValid(step, selection)) {
      setShowError(true);
      return;
    }
    setShowError(false);
    setStep((s) => Math.min(s + 1, STEP_COUNT - 1));
  };

  const handleBack = () => {
    setShowError(false);
    setStep((s) => Math.max(s - 1, 0));
  };

  const toggleModule = (id: ModuleId) =>
    setSelection((prev) => ({
      ...prev,
      modules: prev.modules.includes(id)
        ? prev.modules.filter((m) => m !== id)
        : [...prev.modules, id],
    }));

  const toggleIntegration = (id: IntegrationId) =>
    setSelection((prev) => ({
      ...prev,
      integrations: prev.integrations.includes(id)
        ? prev.integrations.filter((i) => i !== id)
        : [...prev.integrations, id],
    }));

  const isLastStep = step === STEP_COUNT - 1;

  return (
    <section id="calculator" className="bg-white px-6 py-16 sm:px-[90px] sm:py-[120px]">
      <div className="mx-auto flex max-w-[1260px] flex-col gap-12 rounded-[22px]">
        <div className="flex flex-col gap-6">
          <h2 className="font-sans text-3xl font-medium text-[#1E2F35] sm:text-5xl">
            Соберите свой проект
            <br />
            <span className="italic text-brand-red">— рассчитаем цену </span>
            <span className="relative inline-block italic text-brand-red">
              выгодно
              <svg
                className="pointer-events-none absolute -bottom-2 left-0 w-full"
                viewBox="0 0 174.416 11.5064"
                fill="none"
                aria-hidden
                style={{ transform: "rotate(179.39deg)" }}
              >
                <path
                  d="M2 3.9068C0.89543 3.9068 0 4.80223 0 5.9068C0 7.01137 0.89543 7.9068 2 7.9068V5.9068V3.9068ZM2.1 5.9068V7.9068H2.47499L2.8245 7.77096L2.1 5.9068ZM71.3 4.40133L72.0263 2.53786L71.3 4.40133ZM86.7 4.55387L87.3939 6.42963L86.7 4.55387ZM102.1 2.034L102.015 4.03218L102.1 2.034ZM117.5 5.00144L116.852 6.89343L117.5 5.00144ZM132.9 7.93896L132.822 9.93746L132.9 7.93896ZM171.908 6.06895L172.516 7.97423L172.582 7.95314L172.647 7.92752L171.908 6.06895ZM172.316 5.9068V3.9068H171.933L171.577 4.04823L172.316 5.9068ZM172.416 7.9068C173.52 7.9068 174.416 7.01137 174.416 5.9068C174.416 4.80223 173.52 3.9068 172.416 3.9068V5.9068V7.9068ZM2 5.9068V7.9068H2.1V5.9068V3.9068H2V5.9068ZM2.1 5.9068L2.8245 7.77096C12.8381 3.87917 19.6175 4.14546 23.8935 7.37979L25.1 5.78469L26.3065 4.1896C20.3158 -0.34171 11.7619 0.00599146 1.3755 4.04264L2.1 5.9068ZM25.1 5.78469L23.8935 7.37979C29.4944 11.6163 35.3806 12.6806 41.2864 10.155L40.5 8.31607L39.7136 6.47717C35.3528 8.34204 30.9722 7.71873 26.3065 4.1896L25.1 5.78469ZM40.5 8.31607L41.2864 10.155C46.3198 8.0025 51.3434 6.33833 56.358 5.15861L55.9 3.21175L55.442 1.2649C50.1899 2.50049 44.9469 4.23919 39.7136 6.47717L40.5 8.31607ZM55.9 3.21175L56.358 5.15861C61.0789 4.04797 65.7997 4.40415 70.5737 6.2648L71.3 4.40133L72.0263 2.53786C66.5336 0.397111 60.9877 -0.0397639 55.442 1.2649L55.9 3.21175ZM71.3 4.40133L70.5737 6.2648C76.1597 8.44191 81.7983 8.49966 87.3939 6.42963L86.7 4.55387L86.0061 2.6781C81.335 4.40609 76.707 4.36215 72.0263 2.53786L71.3 4.40133ZM86.7 4.55387L87.3939 6.42963C92.2947 4.61665 97.1637 3.82513 102.015 4.03218L102.1 2.034L102.185 0.0358171C96.7697 -0.195326 91.372 0.693064 86.0061 2.6781L86.7 4.55387ZM102.1 2.034L102.015 4.03218C106.946 4.24264 111.89 5.19297 116.852 6.89343L117.5 5.00144L118.148 3.10946C112.844 1.29151 107.521 0.263548 102.185 0.0358171L102.1 2.034ZM117.5 5.00144L116.852 6.89343C122.159 8.71216 127.484 9.73036 132.822 9.93746L132.9 7.93896L132.978 5.94047C128.049 5.74928 123.108 4.80913 118.148 3.10946L117.5 5.00144ZM132.9 7.93896L132.822 9.93746C137.982 10.1376 143.141 10.2371 148.3 10.2361L148.3 8.23606L148.3 6.23606C143.192 6.23713 138.085 6.1386 132.978 5.94047L132.9 7.93896ZM148.3 8.23606L148.3 10.2361C153.521 10.235 158.74 9.89486 163.958 9.21606L163.7 7.23277L163.442 5.24948C158.393 5.90624 153.346 6.235 148.3 6.23606L148.3 8.23606ZM163.7 7.23277L163.958 9.21606C166.527 8.88187 168.503 8.61677 169.883 8.42117C170.571 8.32354 171.12 8.24197 171.523 8.17696C171.843 8.12535 172.255 8.05762 172.516 7.97423L171.908 6.06895L171.3 4.16367C171.392 4.13433 171.335 4.15563 170.886 4.22803C170.52 4.28703 170.001 4.36445 169.321 4.46079C167.965 4.65313 166.006 4.91589 163.442 5.24948L163.7 7.23277ZM171.908 6.06895L172.647 7.92752L173.055 7.76537L172.316 5.9068L171.577 4.04823L171.169 4.21038L171.908 6.06895ZM172.316 5.9068V7.9068H172.416V5.9068V3.9068H172.316V5.9068Z"
                  fill="#1E2F35"
                />
              </svg>
            </span>
          </h2>
          <p className="font-body text-lg text-body-muted sm:text-2xl">
            <span className="mr-1 font-sans text-2xl text-body-muted sm:text-3xl">*</span>
            Выбирайте параметры проекта.
            <br />
            Сумма пересчитывается автоматически при любом изменении.
          </p>
        </div>

        <div className="flex flex-col items-start gap-14 lg:flex-row lg:justify-center">
          <div className="flex w-full max-w-[691px] flex-col items-start gap-14">
            <div className="flex w-full flex-col gap-7">
              <ProgressBar currentStep={step} />

              <div className="min-h-[172px]">
                {step === 0 && (
                  <StepProjectType
                    value={selection.projectType}
                    showError={showError}
                    onChange={(id: ProjectTypeId) =>
                      setSelection((prev) => ({ ...prev, projectType: id }))
                    }
                  />
                )}
                {step === 1 && (
                  <StepDesign
                    value={selection.design}
                    showError={showError}
                    onChange={(id: DesignOptionId) =>
                      setSelection((prev) => ({ ...prev, design: id }))
                    }
                  />
                )}
                {step === 2 && <StepModules value={selection.modules} onToggle={toggleModule} />}
                {step === 3 && (
                  <StepIntegrations value={selection.integrations} onToggle={toggleIntegration} />
                )}
                {step === 4 && (
                  <StepTimeline
                    value={selection.timeline}
                    showError={showError}
                    onChange={(id: TimelineId) =>
                      setSelection((prev) => ({ ...prev, timeline: id }))
                    }
                  />
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 0}
                aria-label="Вернуться назад"
                className="flex h-[57px] w-[57px] items-center justify-center rounded-2xl border border-input-border disabled:invisible"
              >
                <ArrowLeftIcon className="h-5 w-5 text-[#1E2F35]" />
              </button>
              {!isLastStep && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2.5 rounded-2xl border border-brand-red/40 bg-brand-red/5 px-5 py-3.5 font-sans text-lg font-medium text-brand-red"
                >
                  К новому этапу
                  <ArrowRightIcon className="h-[18px] w-[18px]" />
                </button>
              )}
            </div>
          </div>

          <ResultPanel
            developmentCost={result.developmentCost}
            total={result.total}
            canSubmit={canSubmit}
            selection={selection}
            onSubmitted={() => setThankYouOpen(true)}
          />
        </div>
      </div>

      <ModalShell
        isOpen={thankYouOpen}
        onClose={() => setThankYouOpen(false)}
        maxWidthClassName="max-w-[460px]"
      >
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <h3 className="font-sans text-2xl font-bold uppercase text-[#1E2F35]">Спасибо!</h3>
          <p className="font-sans text-xl font-bold text-brand-red">Заявка на расчёт отправлена</p>
          <p className="font-body text-base text-body-muted">
            Уже готовим для вас предложение. Скоро напишем или позвоним вам.
          </p>
          <button
            type="button"
            onClick={() => setThankYouOpen(false)}
            className="mt-2 w-full rounded-xl bg-brand-red py-4 font-sans text-lg font-medium text-white transition-opacity hover:opacity-90"
          >
            Продолжить
          </button>
        </div>
      </ModalShell>
    </section>
  );
}
