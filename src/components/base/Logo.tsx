import Image from "next/image";
import Link from "next/link";

// Точный экспорт лого-блока (иконка + "акрелис" + "ИТ-решения") из Figma,
// пропорции 1027:273 сохранены — растровый экспорт вместо ручной пересборки SVG-пути иконки.
// imgClassName/priority переопределяются там, где лого встречается не в шапке (напр. в футере
// оно крупнее и не above-the-fold, поэтому priority там не нужен).
export default function Logo({
  className = "",
  imgClassName = "h-[52px] w-auto sm:h-[68px]",
  priority = false,
}: {
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}) {
  return (
    <Link href="/" className={`flex items-center ${className}`} aria-label="ACRELIS — на главную">
      <Image
        src="/images/brand/logo.png"
        alt="ACRELIS"
        width={1027}
        height={273}
        className={imgClassName}
        priority={priority}
      />
    </Link>
  );
}
