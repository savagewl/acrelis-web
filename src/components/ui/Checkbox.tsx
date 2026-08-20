import { forwardRef, type InputHTMLAttributes } from "react";
import CheckIcon from "@/components/ui/CheckIcon";

// Кастомный чекбокс из дизайн-системы Figma (напр. Group 2087325822, /about
// "Обсудить сотрудничество"): невыбранный — белый квадрат rx=6 с тонкой серой обводкой,
// выбранный — красная заливка (rx=6) с белой галочкой. Настоящий <input type="checkbox">
// визуально спрятан под кастомной отрисовкой (appearance-none), а не заменён на div —
// чтобы register()/клавиатура/скринридеры продолжали работать как обычно.
const Checkbox = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className = "", ...props }, ref) => {
    return (
      <span className="relative inline-flex size-[22px] shrink-0">
        <input
          ref={ref}
          type="checkbox"
          className={`peer size-[22px] shrink-0 cursor-pointer appearance-none rounded-[6px] border-2 border-[rgba(150,150,150,0.3)] bg-white outline-none checked:border-brand-red checked:bg-brand-red ${className}`}
          {...props}
        />
        <CheckIcon className="pointer-events-none absolute inset-0 m-auto size-3 text-white opacity-0 peer-checked:opacity-100" />
      </span>
    );
  },
);
Checkbox.displayName = "Checkbox";

export default Checkbox;
