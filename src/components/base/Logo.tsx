import Image from "next/image";
import Link from "next/link";

// Точный экспорт лого-блока (иконка + "акрелис" + "ИТ-решения") из Figma,
// пропорции 1027:273 сохранены — растровый экспорт вместо ручной пересборки SVG-пути иконки.
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center ${className}`} aria-label="ACRELIS — на главную">
      <Image
        src="/images/brand/logo.png"
        alt="ACRELIS"
        width={1027}
        height={273}
        className="h-[52px] w-auto sm:h-[68px]"
        priority
      />
    </Link>
  );
}
