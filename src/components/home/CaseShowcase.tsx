"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { easeInOut, motion, useMotionTemplate, useScroll, useTransform, type MotionValue } from "framer-motion";
import ArrowRightIcon from "@/components/ui/ArrowRightIcon";
import { CASES, type CaseStudy } from "@/data/home/cases";

export function DecorGlow() {
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
  borderWidth,
  borderColor,
  bgOpacity,
}: {
  study: CaseStudy;
  shouldAnimate: boolean;
  textOpacity: MotionValue<number>;
  imageX: MotionValue<number>;
  imageY: MotionValue<number>;
  imageScale: MotionValue<number>;
  imageFilter: MotionValue<string>;
  borderWidth: MotionValue<number>;
  borderColor: MotionValue<string>;
  bgOpacity: MotionValue<number>;
}) {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-[1260px] flex-col gap-10 lg:flex-row lg:items-center lg:justify-end lg:gap-[82px]">
      {shouldAnimate && (
        // Подложка фиксированного размера ПОД ТЕКСТОВОЙ КОЛОНКОЙ (не под всей карточкой —
        // см. комментарий у bgOpacity в PinnedCase). Раньше была inset-0 от ВСЕГО слота
        // карточки (во весь экран) — пока активная карточка лежала выше пика по z-index,
        // эта подложка гасила белым вообще всё вокруг, включая место, где должен торчать
        // край пик-превью следующей карточки.
        <motion.div
          aria-hidden
          className="absolute inset-y-0 left-0 hidden w-full max-w-[536px] bg-white lg:block"
          style={{ opacity: bgOpacity }}
        />
      )}
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
        style={
          shouldAnimate
            ? { borderWidth, borderColor, x: imageX, y: imageY, scale: imageScale, filter: imageFilter }
            : { borderWidth: 4, borderColor: study.accent }
        }
        className="relative h-[280px] w-full shrink-0 overflow-hidden rounded-[24px] sm:h-[340px] lg:h-[409px] lg:w-[642px] lg:rounded-[34px]"
      >
        <Image src={study.image} alt={study.title} fill className="object-cover" sizes="(min-width: 1024px) 642px, 100vw" />
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
  // Раньше множитель был 0.15 — окно кроссфейда получалось совсем узким (~5% скролла
  // на сегмент), из-за чего смена карточек читалась как резкий рывок, а не перелистывание.
  const textHalf = step * 0.3;
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
  // ВАЖНО: без опции ease — этот проект использует нативное аппаратное ускорение
  // useTransform через WAAPI/ScrollTimeline (см. комментарий выше про accelerate), а оно
  // умеет принимать только CSS-совместимый easing, а не произвольную JS-функцию наподобие
  // framer-motion'овского easeInOut. С JS-функцией в ease WAAPI-путь для opacity молча
  // "залипал" на первом значении диапазона (проверено через getComputedStyle) — сама
  // анимация переставала идти, а не просто теряла плавность. Плавность здесь даёт только
  // расширенное окно (textHalf), не easing-кривая.
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

  // Непрозрачная белая подложка ПОД текстом — фиксированной ВЫСОТЫ на весь слот карточки
  // (inset-y-0), а не по высоте контента: высота описания разная у разных кейсов (разное
  // число строк), поэтому подложка размером "под текст" не всегда доставала бы до кнопки
  // "Подробнее" нижней карточки. По ШИРИНЕ подложка ограничена текстовой колонкой
  // (max-w-[536px], см. CaseCardContent) — раньше была inset-0 на всю карточку целиком,
  // включая область под картинкой, из-за чего гасила собой пик-превью следующей карточки,
  // которое торчит за пределами картинки текущей. У подложки СВОЯ кривая, отдельная от
  // textOpacity: не тянется через всю широкую фазу "выглядывания" картинки (иначе это и
  // есть та самая белая дымка поверх текущей активной карточки), а появляется рывком чуть
  // раньше самого текста — к моменту, когда текст реально начинает кроссфейдиться, подложка
  // уже полностью непрозрачна и готова его маскировать, а затем гаснет обратно в 0 (не
  // остаётся непрозрачной насовсем!): после того как карточка "устаканилась", маскировать
  // уже нечего — сзади только декоративный градиент DecorGlow, а не соседняя карточка.
  // Раньше подложка после появления НАВСЕГДА оставалась 1 до конца всего скролла секции —
  // это было незаметно только пока подложка была во весь слот (inset-0) и совпадала с
  // белым фоном секции; после того как её сузили до колонки текста, эта постоянная
  // непрозрачность давала чёткий белый прямоугольник поверх градиента на всё время, пока
  // карточка активна. У первой карточки маскировать нечего вообще (перед ней в
  // последовательности ничего нет, её текст ни с чем не кроссфейдится) — подложка всегда 0.
  const bgOpacity = useTransform(
    scrollYProgress,
    isFirst ? [0, 1] : [0, enter - textHalf, enter, enter + textHalf, 1],
    isFirst ? [0, 0] : [0, 0, 1, 0, 0],
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
  const peekOut = <T,>(peek: T, front: T): T[] =>
    needsLeadingZero ? [peek, peek, peek, front, front] : hasPeek ? [peek, peek, front, front] : [front, front];
  const imageX = useTransform(scrollYProgress, geomInput, peekOut(PEEK_OFFSET_X, 0));
  const imageY = useTransform(scrollYProgress, geomInput, peekOut(PEEK_OFFSET_Y, 0));
  const imageScale = useTransform(scrollYProgress, geomInput, peekOut(PEEK_SCALE, 1));
  const imageBlurPx = useTransform(scrollYProgress, geomInput, peekOut(5, 0));
  const imageFilter = useMotionTemplate`blur(${imageBlurPx}px)`;
  // В Figma у "выглядывающей" карточки нет толстой цветной рамки — только тонкая
  // полупрозрачная белая (2.672px, rgba(255,255,255,0.38)); толстая рамка цвета study.accent
  // (4px) появляется только когда карточка дорастает до полного размера. Раньше рамка была
  // статичной (всегда 4px accent), из-за чего пик выглядел как чёткая цветная карточка,
  // наезжающая на текущую, а не как мягкое размытое превью. Тёмная полупрозрачная заливка
  // поверх картинки (imageTint) убрана целиком — в Figma peek-слой не темнят, только blur +
  // тонкая белая рамка; тонировка 45% поверх и так уже неяркого блюра давала грязно-серый
  // вид ("серая херня"), а не мягкое светлое превью.
  // ease здесь (в отличие от y/opacity/textOpacity/bgOpacity/imageX/Y/scale/blur выше) не
  // ломает WAAPI-ускорение: border-width/border-color не входят в набор аппаратно
  // ускоряемых CSS-свойств (opacity/clipPath/filter/transform/backgroundColor) — .accelerate
  // для них хоть и проставляется, но реально никогда не используется, всегда JS-путь.
  const borderWidth = useTransform(scrollYProgress, geomInput, peekOut(2.672, 4), { ease: easeInOut });
  const borderColor = useTransform(scrollYProgress, geomInput, peekOut("rgba(255,255,255,0.38)", study.accent), {
    ease: easeInOut,
  });

  // На сервере и на самом первом клиентском рендере shouldAnimate всегда false (см.
  // комментарий у CaseShowcase) — inline style в этот момент одинаков на сервере и
  // клиенте (просто отсутствует), поэтому гидратация ничего не ломает. Анимация
  // включается отдельным обновлением состояния уже после маунта — это обычный React
  // ре-рендер, а не гидратация, так что React с ним ничего не сверяет.
  return (
    <motion.div
      style={shouldAnimate ? { y, opacity, zIndex: count - index } : undefined}
      // zIndex УБЫВАЕТ с индексом (текущая карточка всегда стоит НАД следующей), а не
      // наоборот. По точным координатам из Figma пик-слой следующей карточки геометрически
      // заходит примерно на 38% высоты под текущую активную (не просто чуть высовывается
      // сбоку) — в макете это незаметно ровно потому, что активная карточка лежит НАД пиком
      // и перекрывает эту заходящую часть собой. Раньше здесь было zIndex: index (следующая
      // карточка поверх текущей) — из-за этого пик-превью вылезал НАД активной карточкой и
      // закрывал её шапку/лого вместо того, чтобы выглядывать у неё из-под низа.
      //
      // bg-white только на мобильном обычном потоке (там карточки идут одна за другой,
      // фон каждой безобиден); на десктопе карточки лежат друг на друге абсолютным
      // позиционированием, фон на десктопе даёт общий sticky-контейнер — у каждой карточки
      // своя lg:bg-transparent + отдельная narrow-window белая подложка (bgOpacity ниже),
      // которая проявляется только к моменту собственного кроссфейда текста, а не на всю
      // широкую фазу "выглядывания" (иначе она давала бы полупрозрачную белую "дымку" поверх
      // соседних карточек).
      className="relative flex items-center overflow-hidden bg-white px-6 py-16 sm:px-[90px] sm:py-24 lg:absolute lg:inset-0 lg:bg-transparent lg:py-0"
    >
      <CaseCardContent
        study={study}
        shouldAnimate={shouldAnimate}
        textOpacity={textOpacity}
        imageX={imageX}
        imageY={imageY}
        imageScale={imageScale}
        imageFilter={imageFilter}
        borderWidth={borderWidth}
        borderColor={borderColor}
        bgOpacity={bgOpacity}
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
