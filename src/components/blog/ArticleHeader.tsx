import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/base/SiteHeader";
import ArrowLeftIcon from "@/components/ui/ArrowLeftIcon";
import type { BlogPost } from "@/types/blog-post";

// Figma id=446:47 (шапка) + 446:947 (мета статьи) + 574:4595 (ссылка "Назад") — /blog/[slug].
export default function ArticleHeader({ post }: { post: BlogPost }) {
  const dateLabel = new Date(post.publishedAt).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col">
      <SiteHeader variant="light" />

      <div className="mx-auto flex w-full max-w-[1260px] flex-col gap-4 px-6 pt-8 sm:px-[90px]">
        <Link href="/blog" className="flex w-fit items-center gap-2 font-sans text-base text-[#1E2F35]">
          <ArrowLeftIcon className="size-[22px]" />
          Назад
        </Link>

        <div className="flex flex-col gap-4 pt-4">
          <div className="flex flex-wrap items-center gap-4 font-body text-sm text-[#1E2F35]">
            <span>АКРЕЛИС</span>
            <span className="flex items-center gap-4">
              <span aria-hidden className="size-[3px] rounded-full bg-brand-red" />
              {post.topic}
            </span>
            <span className="flex items-center gap-4 text-body-muted">
              <span aria-hidden className="size-[3px] rounded-full bg-brand-red" />
              {dateLabel}
            </span>
          </div>

          <h1 className="font-sans text-3xl font-semibold text-[#1E2F35] sm:text-[40px] sm:leading-[1.1]">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 pt-6">
            <div className="relative size-14 shrink-0 overflow-hidden rounded-full bg-[#00fe7b]">
              <Image src={post.authorAvatar} alt="" fill className="object-cover" />
            </div>
            <div className="flex flex-col">
              <p className="font-sans text-lg text-[#1E2F35]">{post.authorName}</p>
              <p className="font-body text-base text-body-muted">{post.authorRole}</p>
            </div>
          </div>
        </div>

        <hr className="mt-6 border-t border-[rgba(150,150,150,0.2)]" />
      </div>
    </div>
  );
}
