import Image from "next/image";
import type { Case } from "@/types/case";

// Figma id=145:10589 (/cases/[slug]) — тёмная секция с галереей скриншотов, широкое фото +
// узкое рядом (пропорция ~1029:399 в макете).
export default function CaseGallery({ item }: { item: Case }) {
  if (item.gallery.length === 0) return null;

  return (
    <section className="bg-[#1E2F35] px-6 py-3 sm:px-[90px]">
      <div className="mx-auto flex w-full max-w-[1260px] flex-col gap-3 sm:flex-row">
        {item.gallery.map((src, i) => (
          <div
            key={src}
            className={`relative h-[300px] w-full overflow-hidden rounded-xl sm:h-[624px] ${
              i === 0 ? "sm:flex-[1029]" : "sm:flex-[399]"
            }`}
          >
            <Image src={src} alt="" fill className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
