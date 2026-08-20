import type { TocEntry } from "@/data/blog-posts";

// Figma id=446:1083 "Оглавление" (/blog/[slug]) — sticky-сайдбар с якорями на h2 статьи.
export default function ArticleToc({ items }: { items: TocEntry[] }) {
  return (
    <div className="sticky top-8 flex w-full flex-col gap-3 border-b border-[rgba(150,150,150,0.2)] pb-6">
      <p className="font-sans text-2xl font-semibold text-[#1E2F35]">Оглавление</p>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="relative pl-5 font-body text-base text-[#1E2F35] hover:text-brand-red"
        >
          <span aria-hidden className="absolute left-[6px] top-[8px] size-1 rounded-full bg-brand-red" />
          {item.label}
        </a>
      ))}
    </div>
  );
}
