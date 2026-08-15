import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getBlogPostBySlug, getBlogPosts } from "@/data/blog-posts";

export async function generateStaticParams() {
  return getBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Статья не найдена" };

  return buildPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <div>
      {/*
        TODO по ТЗ (страница статьи):
        - Контент статьи
        - Внизу — блок подписки на рассылку: обязательный Email с валидацией формата,
          подсветка при ошибке, сообщение об успехе
        - Кнопка "Смотреть блог" → /blog
      */}
    </div>
  );
}
