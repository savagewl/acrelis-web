// Figma id=162:71 (/about). Справа — литеральный плейсхолдер из самого макета (серый
// прямоугольник с надписью "Фото коллектива"), не заглушка с моей стороны — реального
// фото коллектива в дизайне нет.
export default function AboutIntro() {
  return (
    <section className="bg-white px-6 py-16 sm:px-[90px] sm:py-[120px]">
      <div className="mx-auto flex w-full max-w-[1260px] flex-col items-center gap-10 lg:flex-row lg:gap-20">
        <div className="flex flex-1 flex-col gap-8">
          <h2 className="font-sans text-4xl font-medium text-[#1E2F35] sm:text-[56px]">О нас</h2>
          <div className="flex flex-col gap-6 font-body text-lg leading-[1.6] text-[#1E2F35] sm:text-xl">
            <p>
              Компания АКРЕЛИС была основана в 2023 году группой энтузиастов, верящих в силу
              автоматизации. За 5 лет мы выросли из небольшого стартапа в надежного технологического
              партнера для крупнейших предприятий России.
            </p>
            <p>
              Наш подход основан на глубоком погружении в бизнес-процессы заказчика. Мы не просто
              пишем код — мы создаем инструменты, которые делают работу проще, прозрачнее и
              эффективнее.
            </p>
          </div>
        </div>

        <div className="flex h-[300px] w-full shrink-0 items-center justify-center rounded-3xl bg-black/20 sm:h-[400px] lg:w-[540px]">
          <p className="font-sans text-lg font-semibold text-black sm:text-2xl">Фото коллектива</p>
        </div>
      </div>
    </section>
  );
}
