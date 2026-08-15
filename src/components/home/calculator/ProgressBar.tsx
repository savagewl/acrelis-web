// Активный/пройденный шаг — капсула-контейнер с градиентным (активный) или сплошным
// красным (пройденный) фоном; ожидающий шаг рисуется отдельно, без капсулы.
//
// Сверено с эталонным скриншотом Figma (2 пройденных/активных шага): соседние "заполненные"
// капсулы сливаются в ОДНУ сплошную форму без зазора и без излома скругления на стыке —
// т.к. isFilled(i) всегда образует непрерывный префикс [0..currentStep], зазор/скругление
// убираются только на стыке между двумя заполненными шагами; переход к первому pending-шагу
// сохраняет обычный gap-8px, как между pending-шагами.
import CheckIcon from "@/components/ui/CheckIcon";

const STEPS_COUNT = 5;
const DOT_SIZE = 17; // 16.992px
const DOT_BORDER = 3; // 2.969px
const BAR_HEIGHT = 3.6; // 3.558px
const GAP = 8;
const FILLED_BG = (isDone: boolean) =>
  isDone ? "#FF050A" : "linear-gradient(90deg, #FF050A 0%, rgba(255,5,10,0.3) 100%)";

export default function ProgressBar({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex w-full items-center">
      {Array.from({ length: STEPS_COUNT }).map((_, i) => {
        const isDone = i < currentStep;
        const isActive = i === currentStep;
        const isFilled = isDone || isActive;
        const isLast = i === STEPS_COUNT - 1;

        // isFilled всегда образует непрерывный префикс [0..currentStep] — сосед i-1 залит
        // тогда и только тогда, когда i <= currentStep, т.е. i-1 тоже в этом префиксе.
        const fusedWithPrev = isFilled && i > 0;
        const fusedWithNext = isFilled && !isLast && i < currentStep;
        const marginRight = isLast ? 0 : fusedWithNext ? 0 : GAP;

        const dot = (
          <span
            className="flex shrink-0 items-center justify-center rounded-full transition-colors duration-[400ms] ease-in-out"
            style={{
              width: DOT_SIZE,
              height: DOT_SIZE,
              borderWidth: DOT_BORDER,
              borderStyle: "solid",
              borderColor: isFilled ? "#FFFFFF" : "rgba(150,150,150,0.5)",
              backgroundColor: isFilled ? "transparent" : "#FFFFFF",
            }}
          >
            {isDone && <CheckIcon className="h-[10px] w-[10px] text-white" />}
          </span>
        );

        if (isLast) {
          const radius = fusedWithPrev ? "0 999px 999px 0" : "999px";
          return (
            <div
              key={i}
              className="flex shrink-0 items-center justify-center transition-colors duration-[400ms] ease-in-out"
              style={{
                width: DOT_SIZE,
                height: DOT_SIZE,
                background: isFilled ? FILLED_BG(isDone) : "transparent",
                borderRadius: isFilled ? radius : "999px",
              }}
            >
              {isFilled ? (
                dot
              ) : (
                <span
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: DOT_SIZE,
                    height: DOT_SIZE,
                    borderWidth: DOT_BORDER,
                    borderStyle: "solid",
                    borderColor: "rgba(150,150,150,0.5)",
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <span className="rounded-full bg-[rgba(150,150,150,0.5)]" style={{ width: 8, height: 8 }} />
                </span>
              )}
            </div>
          );
        }

        const radius = fusedWithPrev && fusedWithNext ? 0 : fusedWithPrev ? "0 21px 21px 0" : fusedWithNext ? "21px 0 0 21px" : 21;

        return (
          <div
            key={i}
            className="flex flex-1 items-center transition-colors duration-[400ms] ease-in-out"
            style={
              isFilled
                ? { gap: 8, padding: "4px 8px", borderRadius: radius, background: FILLED_BG(isDone), marginRight }
                : { gap: 4, marginRight }
            }
          >
            {dot}
            <span
              className="flex-1 rounded-full transition-colors duration-[400ms] ease-in-out"
              style={{ height: BAR_HEIGHT, background: isFilled ? "#FFFFFF" : "rgba(150,150,150,0.5)" }}
            />
          </div>
        );
      })}
    </div>
  );
}
