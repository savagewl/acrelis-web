"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionTemplate, useScroll, useTransform, type MotionValue } from "framer-motion";
import ArrowRightIcon from "@/components/ui/ArrowRightIcon";

interface CaseMetric {
  value: string;
  label: string;
}

interface CaseStudy {
  category: string;
  title: string;
  description: string;
  metrics: CaseMetric[];
  stack: string;
  image: string;
  accent: string;
}

const CASES: CaseStudy[] = [
  {
    category: "Разработка информационного портала",
    title: "«Россия – Исламский мир»",
    description:
      "Официальный информационный портал Группы стратегического видения «Россия – Исламский мир»",
    metrics: [
      { value: "+220%", label: "рост продаж" },
      { value: "+85%", label: "вовлечённость" },
      { value: "+85%", label: "активность" },
    ],
    stack: "next js, django python, REST API",
    image: "/images/home/cases/russia.jpg",
    accent: "#15604B",
  },
  {
    category: "Разработка сайта для сети отелей",
    title: "«ERA Hotels Group»",
    description:
      "Единый сайт сети отелей в Крыму, Ялте и Нижнем Новгороде с онлайн-бронированием, выбором объектов и разделами для мероприятий",
    metrics: [
      { value: "+250%", label: "онлайн-брони" },
      { value: "+200%", label: "органический трафик" },
      { value: "−30%", label: "ручной брони" },
    ],
    stack: "React js, Gin.go, REST API",
    image: "/images/home/cases/era.jpg",
    accent: "#CFA776",
  },
  {
    category: "Разработка сайта апарт-комплекса",
    title: "«Ялта Апарт»",
    description:
      "Сайт-витрина апартаментов на Южном берегу Крыма с каталогом объектов, фотогалереями, планировками и быстрой заявкой на бронирование, таймерами акций и интеграцией Яндекс.Карт",
    metrics: [
      { value: "+60%", label: "заявок на бронь" },
      { value: "−35%", label: "звонков с вопросами" },
      { value: "+45%", label: "конверсии" },
    ],
    stack: "next js, Gin.go, REST API",
    image: "/images/home/cases/yalta.jpg",
    accent: "#81BB33",
  },
];

function DecorGlow() {
  // Приближение декоративного радиального пятна Figma ("Ellipse 2214": серый →
  // белый радиальный градиент, gaussian blur, opacity 0.6) — не критично для пикселя,
  // просто фон-подложка за карточками. Мягкость даём стопами самого градиента, а не
  // CSS filter:blur — blur на большом элементе внутри position:sticky, которая быстро
  // меняет режим позиционирования при скролле, у части браузеров даёт паразитный
  // артефакт перерисовки (застрявшая серая полоса на стыке с соседней секцией).
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -right-[15%] top-1/2 h-[1300px] w-[1370px] -translate-y-1/2 rounded-full"
      style={{
        background:
          "radial-gradient(circle, rgba(150,150,150,0.5) 0%, rgba(150,150,150,0.22) 40%, rgba(255,255,255,0) 72%)",
      }}
    />
  );
}

// Насколько смещена/уменьшена картинка следующего кейса в "фазе выглядывания" —
// подобрано под фиксированный десктопный размер карточки 642×409px (сама эта картинка —
// та же карточка следующего кейса, а не отдельный статичный декор): смещение в правый
// верхний угол + уменьшение примерно до размеров исходного peek-слоя в Figma (406×254
// относительно 642×409 ≈ 63% масштаба).
const PEEK_OFFSET_X = 138;
const PEEK_OFFSET_Y = -168;
const PEEK_SCALE = 0.63;

function CaseCardContent({
  study,
  shouldAnimate,
  textOpacity,
  imageX,
  imageY,
  imageScale,
  imageFilter,
  imageTint,
}: {
  study: CaseStudy;
  shouldAnimate: boolean;
  textOpacity: MotionValue<number>;
  imageX: MotionValue<number>;
  imageY: MotionValue<number>;
  imageScale: MotionValue<number>;
  imageFilter: MotionValue<string>;
  imageTint: MotionValue<number>;
}) {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-[1260px] flex-col gap-10 lg:flex-row lg:items-center lg:justify-end lg:gap-[82px]">
      <motion.div
        style={shouldAnimate ? { opacity: textOpacity } : undefined}
        className="flex w-full max-w-[536px] flex-col gap-12"
      >
        <div className="flex flex-col gap-6">
          {/* uppercase применяется к общему родителю: заголовок тоже капсом, не только категория */}
          <div className="flex flex-col gap-2 uppercase">
            <p className="font-sans text-sm tracking-wide text-[#1D1D1B]">{study.category}</p>
            <h2 className="font-sans text-[30px] font-bold text-[#1D1D1B]">{study.title}</h2>
          </div>
          <p className="max-w-[537px] font-body text-xl text-[#1D1D1B]">{study.description}</p>
        </div>

        <div className="flex flex-wrap gap-8">
          {study.metrics.map((m) => (
            <div key={m.label} className="flex flex-col gap-0.5">
              <span className="font-sans text-2xl text-[#1E2F35]">{m.value}</span>
              <span className="font-sans text-base text-body-muted">{m.label}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 border-l border-[#1D1D1B] pl-2">
          <div className="flex flex-col gap-1">
            <p className="font-body text-sm uppercase text-[#1D1D1B]">стек технологий:</p>
            <p className="font-sans text-xs uppercase text-[#1D1D1B]">{study.stack}</p>
          </div>
        </div>

        <Link
          href="/portfolio"
          className="relative z-10 inline-flex w-fit items-center gap-2.5 rounded-2xl border border-black/10 bg-[#1E2F35]/5 px-5 py-3.5 font-sans text-lg font-medium text-[#1D1D1B]"
        >
          Подробнее
          <ArrowRightIcon className="h-[18px] w-[18px]" />
        </Link>
      </motion.div>

      {/* Картинка следующей карточки видна размыто и смещённо из-под текущей ("фаза
          выглядывания") и доезжает до полного размера ровно к моменту ухода текущей —
          все трансформы завязаны на scrollYProgress, без отдельного direction-стейта. */}
      <motion.div
        style={{
          borderColor: study.accent,
          ...(shouldAnimate ? { x: imageX, y: imageY, scale: imageScale, filter: imageFilter } : {}),
        }}
        className="relative h-[280px] w-full shrink-0 overflow-hidden rounded-[24px] border-4 sm:h-[340px] lg:h-[409px] lg:w-[642px] lg:rounded-[34px]"
      >
        <Image src={study.image} alt={study.title} fill className="object-cover" sizes="(min-width: 1024px) 642px, 100vw" />
        {shouldAnimate && (
          <motion.div aria-hidden className="absolute inset-0 bg-[#484848]" style={{ opacity: imageTint }} />
        )}
      </motion.div>
    </div>
  );
}

function PinnedCase({
  study,
  index,
  count,
  scrollYProgress,
  shouldAnimate,
}: {
  study: CaseStudy;
  index: number;
  count: number;
  scrollYProgress: MotionValue<number>;
  shouldAnimate: boolean;
}) {
  const step = 1 / count;
  const enter = index * step;
  const exit = (index + 1) * step;
  // Превью следующего кейса в Figma видно НА ПРОТЯЖЕНИИ ВСЕГО показа текущей карточки
  // (статичный декоративный слой в исходнике), а не только в последний момент перед
  // сменой — поэтому фаза "выглядывания" стартует с самого начала предыдущего сегмента
  // (index-1)*step, а не за 60% шага до текущей границы.
  const peekStart = Math.max(0, (index - 1) * step);
  // Узкое окно кроссфейда ТЕКСТА, симметричное вокруг границы между карточками —
  // такое же окно использует соседняя карточка на своём противоположном краю
  // (exitFadeStart/End этой карточки === entrance-окно следующей, потому что оба
  // считаются от одной и той же границы `exit`/`enter`). Раньше текст следующей
  // карточки начинал проявляться на всём широком "peek"-окне картинки, пока текст
  // текущей ещё стоял на полной непрозрачности — оба текста были видны и перекрывались
  // друг с другом. Картинке этот широкий диапазон оставлен намеренно (её и должно быть
  // видно заранее, размыто, как выглядывающий превью) — только текст синхронизирован
  // с уходом предыдущей карточки.
  const textHalf = step * 0.15;
  const exitFadeStart = Math.max(0, exit - textHalf);
  const exitFadeEnd = Math.min(1, exit + textHalf);

  const isFirst = index === 0;
  const isLast = index === count - 1;

  // ВАЖНО: все диапазоны ниже намеренно растянуты на ВЕСЬ [0, 1] с плато по краям,
  // а не заданы только "содержательным" узким отрезком с расчётом на неявный клампинг
  // useTransform за его пределами. Так надёжнее: current framer-motion (13.x) в браузерах
  // с поддержкой нативного ScrollTimeline автоматически ускоряет useTransform, производный
  // от scrollYProgress, через WAAPI (см. use-transform.mjs: values.accelerate) — и на
  // прогоне выяснилось, что для диапазона, не достающего до 0 или 1 (например, только
  // [0.28, 0.38] под кроссфейд текста), этот ускоренный путь давал неверную (зависшую
  // на промежуточном значении) интерполяцию ЗА пределами заданного отрезка — хотя
  // JS-вычисленное значение и инлайновый style корректно показывали 0. Явные точки 0 и 1
  // с повторяющимся граничным значением убирают саму необходимость в экстраполяции/клампинге.
  let yInput: number[];
  let yOutput: string[];
  let opacityOutput: number[];
  if (isFirst && isLast) {
    yInput = [0, 1];
    yOutput = ["0%", "0%"];
    opacityOutput = [1, 1];
  } else if (isFirst) {
    yInput = [0, exitFadeStart, exitFadeEnd, 1];
    yOutput = ["0%", "0%", "40%", "40%"];
    opacityOutput = [1, 1, 0, 0];
  } else if (isLast) {
    // Обёртка карточки включается (opacity 0→1) сразу в peekStart, а не плавно тянется
    // через весь peekStart→enter — иначе при peekStart===0 (как у самой первой "фазы
    // выглядывания" сразу за стартовой карточкой) она читалась бы как невидимая ровно
    // в начале скролла. "Слабость" вида призрака дают собственные (маленькие,
    // размытые, притемнённые) трансформы картинки ниже, а не общая прозрачность.
    // peekStart может буквально равняться 0 (когда предыдущая карточка — самая первая
    // в последовательности) — тогда отдельная ведущая точка "0" стала бы ДУБЛЕМ x=0
    // с ДРУГИМ значением (0 vs 1), что даёт неопределённую интерполяцию ровно в этой
    // точке. Поэтому ведущая точка добавляется только если peekStart>0.
    yInput = peekStart > 0 ? [0, peekStart, 1] : [peekStart, 1];
    yOutput = peekStart > 0 ? ["0%", "0%", "0%"] : ["0%", "0%"];
    opacityOutput = peekStart > 0 ? [0, 1, 1] : [1, 1];
  } else {
    yInput = peekStart > 0 ? [0, peekStart, exitFadeStart, exitFadeEnd, 1] : [peekStart, exitFadeStart, exitFadeEnd, 1];
    yOutput = peekStart > 0 ? ["0%", "0%", "0%", "40%", "40%"] : ["0%", "0%", "40%", "40%"];
    opacityOutput = peekStart > 0 ? [0, 1, 1, 0, 0] : [1, 1, 0, 0];
  }

  // Входит снизу лёгким сдвигом и проявляется; держится на весь свой сегмент скролла;
  // затем плавно "уходит вниз" (translateY) и гаснет — именно то поведение при
  // перелистывании, которое попросил пользователь. Это общая непрозрачность всей
  // карточки (влияет и на текст, и на картинку) — отвечает за появление/исчезновение
  // и утягивает картинку вниз при уходе; отдельный textOpacity ниже сужает именно
  // видимость ТЕКСТА до момента реального кроссфейда.
  const y = useTransform(scrollYProgress, yInput, yOutput);
  const opacity = useTransform(scrollYProgress, yInput, opacityOutput);

  // Текст показывается только в узком окне вокруг фактического момента передачи
  // "эстафеты" (та же граница, что и exitFadeStart/End соседней карточки) — независимо
  // от того, что картинка (через общий opacity выше) уже могла начать проявляться
  // намного раньше в рамках своей широкой фазы "выглядывания".
  const textOpacity = useTransform(
    scrollYProgress,
    isFirst ? [0, 1] : [0, enter - textHalf, enter + textHalf, 1],
    isFirst ? [1, 1] : [0, 0, 1, 1],
  );

  // Непрозрачная белая подложка ПОД текстом (не под всей карточкой — см. комментарий
  // ниже) фиксированного размера lg:inset-0, а не по высоте контента: высота описания
  // разная у разных кейсов (разное число строк), поэтому подложка размером "под текст"
  // не всегда доставала бы до кнопки "Подробнее" нижней карточки. У неё СВОЯ кривая,
  // отдельная от textOpacity: не тянется через всю широкую фазу "выглядывания" картинки
  // (иначе это и есть та самая белая дымка поверх текущей активной карточки), а
  // появляется рывком чуть раньше самого текста — к моменту, когда текст реально
  // начинает кроссфейдиться, подложка уже полностью непрозрачна и готова его маскировать.
  const bgOpacity = useTransform(
    scrollYProgress,
    isFirst ? [0, 1] : [0, enter - textHalf, enter, 1],
    isFirst ? [1, 1] : [0, 0, 1, 1],
  );

  // Геометрия картинки: ВИДИМОСТЬ призрака (через общую opacity выше) растянута на весь
  // предыдущий сегмент [peekStart, enter] — карточка видна как маленький размытый превью
  // с самого начала показа предыдущего кейса, как в Figma. Но САМ РОСТ (переход
  // маленький→полный размер) — это ОТДЕЛЬНАЯ, гораздо более узкая фаза [enter-textHalf,
  // enter] прямо перед границей: если растягивать сам рост на весь широкий peekStart→enter,
  // то к середине этого окна карточка уже наполовину увеличена и висит большим смещённым
  // прямоугольником вместо маленького уголка-превью. До начала узкого окна роста картинка
  // ПОСТОЯННО держится в peek-геометрии (маленькая/смещённая/размытая), не анимируясь.
  // У первой карточки этой фазы нет вообще (см. isFirst выше) — используется тождественный
  // [0,1]→[FRONT,FRONT] диапазон, хук всё равно должен вызываться каждый рендер одинаковое
  // число раз.
  const hasPeek = !isFirst;
  const growStart = hasPeek ? Math.max(peekStart, enter - textHalf) : 0;
  // peekStart (или growStart) может совпасть с 0 (когда предыдущая карточка — первая в
  // последовательности) — тогда отдельная ведущая точка "0" стала бы дублем x=0, что даёт
  // неустойчивую интерполяцию ровно в этой точке, поэтому дубль просто не добавляется.
  const needsLeadingZero = hasPeek && peekStart > 0;
  const geomInput = needsLeadingZero
    ? [0, peekStart, growStart, enter, 1]
    : hasPeek
      ? [peekStart, growStart, enter, 1]
      : [0, 1];
  const peekOut = (peek: number, front: number) =>
    needsLeadingZero ? [peek, peek, peek, front, front] : hasPeek ? [peek, peek, front, front] : [front, front];
  const imageX = useTransform(scrollYProgress, geomInput, peekOut(PEEK_OFFSET_X, 0));
  const imageY = useTransform(scrollYProgress, geomInput, peekOut(PEEK_OFFSET_Y, 0));
  const imageScale = useTransform(scrollYProgress, geomInput, peekOut(PEEK_SCALE, 1));
  const imageBlurPx = useTransform(scrollYProgress, geomInput, peekOut(2, 0));
  const imageTint = useTransform(scrollYProgress, geomInput, peekOut(0.45, 0));
  const imageFilter = useMotionTemplate`blur(${imageBlurPx}px)`;

  // На сервере и на самом первом клиентском рендере shouldAnimate всегда false (см.
  // комментарий у CaseShowcase) — inline style в этот момент одинаков на сервере и
  // клиенте (просто отсутствует), поэтому гидратация ничего не ломает. Анимация
  // включается отдельным обновлением состояния уже после маунта — это обычный React
  // ре-рендер, а не гидратация, так что React с ним ничего не сверяет.
  return (
    <motion.div
      style={shouldAnimate ? { y, opacity, zIndex: index } : undefined}
      // bg-white только на мобильном обычном потоке (там карточки идут одна за другой,
      // фон каждой безобиден); на десктопе карточки лежат друг на друге абсолютным
      // позиционированием — если у КАЖДОЙ свой непрозрачный белый фон, то карточка,
      // ещё только проявляющаяся (opacity 0→1, у неё выше z-index, т.к. она следующая
      // по счёту), просвечивает поверх текущей полупрозрачной белой "дымкой", визуально
      // "выцветая" всё, что под ней — даже когда её СОБСТВЕННЫЙ текст/картинка отрендерены
      // с полностью корректной непрозрачностью. Фон на десктопе даёт общий sticky-контейнер.
      className="relative flex items-center overflow-hidden bg-white px-6 py-16 sm:px-[90px] sm:py-24 lg:absolute lg:inset-0 lg:bg-transparent lg:py-0"
    >
      {shouldAnimate && (
        // Подложка фиксированного размера (весь слот карточки, а не высота контента) —
        // см. комментарий у bgOpacity выше. Ставится под контентом по DOM-порядку, сам
        // контент (z-10) рисуется поверх неё.
        <motion.div aria-hidden className="absolute inset-0 hidden bg-white lg:block" style={{ opacity: bgOpacity }} />
      )}
      <CaseCardContent
        study={study}
        shouldAnimate={shouldAnimate}
        textOpacity={textOpacity}
        imageX={imageX}
        imageY={imageY}
        imageScale={imageScale}
        imageFilter={imageFilter}
        imageTint={imageTint}
      />
    </motion.div>
  );
}

// Scrollytelling: на десктопе (lg+, без prefers-reduced-motion) секция "прикрепляется"
// (sticky) на время скролла внутри увеличенного контейнера (300vh под 3 кейса) —
// карточки/текст меняются непрерывно по прогрессу скролла, а не по клику. На мобильных
// pin/scroll-jacking обычно только вредит UX (заедания, конфликт с обычным тач-скроллом),
// поэтому там — обычные последовательные секции без анимации. При prefers-reduced-motion —
// тот же статичный список, что и на мобильных.
//
// ВАЖНО: DOM-структура ниже одна и та же всегда — pinned-вёрстка на десктопе включается
// только Tailwind-брейкпоинтами (`lg:`), а НЕ условным рендером разных деревьев. Раньше
// на сервере (window нет → isDesktop=false) рендерился один набор элементов, а на первом
// клиентском рендере (window есть → isDesktop сразу true) — другой, что React ловил как
// hydration mismatch ("Recoverable Error") и пересобирал поддерево с нуля. Единая
// структура плюс всегда-примонтированный containerRef заодно чинит и другую проблему:
// useScroll должен увидеть реальный DOM-узел уже на своём mount-эффекте — если <div
// ref={containerRef}> появляется только позже (после setState), framer-motion его не
// переподхватывает (его встроенный ретрай — это один microtask, а не произвольно поздний
// ре-рендер), и scrollYProgress навсегда застревает на 0.
export default function CaseShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Сама анимация (pinned-поведение) включается только после маунта — на сервере и на
  // самом первом клиентском рендере shouldAnimate всегда false, это безопасно (см.
  // комментарий в PinnedCase). CSS-раскладка (lg:absolute/lg:sticky) при этом уже
  // соответствует реальной ширине вьюпорта с первого же пейнта — на неё JS не влияет.
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const desktopMq = window.matchMedia("(min-width: 1024px)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setShouldAnimate(desktopMq.matches && !motionMq.matches);
    update();
    desktopMq.addEventListener("change", update);
    motionMq.addEventListener("change", update);
    return () => {
      desktopMq.removeEventListener("change", update);
      motionMq.removeEventListener("change", update);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  return (
    <div ref={containerRef} className="relative lg:h-[300vh]">
      <div className="relative w-full overflow-hidden bg-white lg:sticky lg:top-0 lg:h-screen">
        <DecorGlow />
        {CASES.map((study, i) => (
          <PinnedCase
            key={study.title}
            study={study}
            index={i}
            count={CASES.length}
            scrollYProgress={scrollYProgress}
            shouldAnimate={shouldAnimate}
          />
        ))}
      </div>
    </div>
  );
}
