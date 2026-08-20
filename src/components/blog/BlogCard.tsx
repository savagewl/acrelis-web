import Image from "next/image";
import Link from "next/link";
import ArrowUpRightIcon from "@/components/ui/ArrowUpRightIcon";
import type { BlogPost } from "@/types/blog-post";

interface CropLayer {
  src: string;
  className: string;
}

interface CardVariant {
  cropLayers: CropLayer[];
  fullOverlaySrc?: string;
  tintOverlay?: string;
  tintBlend?: "normal" | "lighten";
}

// 3 варианта картинки карточки (Figma: одна и та же база + разный слой/тон поверх) —
// используются везде, где карточки блога повторяются (главная, /blog, "Похожие статьи"),
// циклически по variantIndex, чтобы визуально не повторялись подряд.
const VARIANTS: CardVariant[] = [
  {
    cropLayers: [
      {
        src: "/images/blog/layer-glass.png",
        className: "absolute -left-[65.12%] -top-[6.4%] h-[160.51%] w-[209.14%] max-w-none object-cover",
      },
    ],
    tintOverlay: "rgba(255,242,235,0.4)",
  },
  {
    cropLayers: [
      {
        src: "/images/blog/layer-ribbon-crop.png",
        className: "absolute -left-[177.25%] -top-[5.04%] h-[218.3%] w-[284.43%] max-w-none object-cover",
      },
    ],
    fullOverlaySrc: "/images/blog/layer-ribbon-full.png",
    tintOverlay: "rgba(205,62,85,0.38)",
    tintBlend: "lighten",
  },
  { cropLayers: [] },
];

export function BlogCardImage({ variantIndex, badge }: { variantIndex: number; badge: string }) {
  const variant = VARIANTS[variantIndex % VARIANTS.length];
  return (
    <div className="relative h-[300px] w-full shrink-0 overflow-hidden rounded-t-xl">
      <Image src="/images/blog/base.jpg" alt="" fill className="object-cover" />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, #F43367 0%, #FF050A 100%)", mixBlendMode: "color" }}
      />
      {variant.cropLayers.map((layer) => (
        <div key={layer.src} className="absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element -- крой в процентах от родителя (не квадрат), next/image тут не подходит */}
          <img src={layer.src} alt="" className={layer.className} />
        </div>
      ))}
      {variant.fullOverlaySrc && <Image src={variant.fullOverlaySrc} alt="" fill className="object-cover" />}
      {variant.tintOverlay && (
        <div className="absolute inset-0" style={{ background: variant.tintOverlay, mixBlendMode: variant.tintBlend ?? "normal" }} />
      )}
      <span className="absolute right-3 top-3 rounded-full border border-[#1E2F35] bg-white px-3 py-2 font-body text-sm font-medium tracking-[0.03em] text-[#1D1D1B]">
        {badge}
      </span>
    </div>
  );
}

export function BlogCard({ post, variantIndex }: { post: BlogPost; variantIndex: number }) {
  const dateLabel = new Date(post.publishedAt).toLocaleDateString("ru-RU", { day: "numeric", month: "long" });

  return (
    <Link href={`/blog/${post.slug}`} className="flex flex-1 flex-col gap-6 rounded-xl bg-input-bg">
      <BlogCardImage variantIndex={variantIndex} badge={post.topic} />
      <div className="flex flex-col gap-3 p-5">
        <p className="font-sans text-xl font-semibold leading-6 text-[#1E2F35]">{post.title}</p>
        <div className="flex items-center justify-between">
          <span className="font-body text-sm font-medium text-body-muted">
            {post.format} · {dateLabel}
          </span>
          <ArrowUpRightIcon className="h-9 w-9 shrink-0 text-brand-red" />
        </div>
      </div>
    </Link>
  );
}
