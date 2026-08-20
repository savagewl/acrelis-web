import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getBlogPostBySlug, getBlogPosts, getPostToc } from "@/data/blog-posts";
import ArticleHeader from "@/components/blog/ArticleHeader";
import ArticleToc from "@/components/blog/ArticleToc";
import NewsletterForm from "@/components/blog/NewsletterForm";
import RelatedArticles from "@/components/blog/RelatedArticles";
import ContactCTA from "@/components/home/ContactCTA";

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

// Figma id=446:46 — вся страница целиком, порядок сверен по Y-координатам: хедер
// (глобальный) → "Назад"+мета+заголовок+автор → контент статьи + sticky-оглавление →
// подписка на рассылку → "Похожие статьи" → "Расскажите о Вашем проекте" (тот же
// ContactCTA) → Footer (глобальный).
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const toc = getPostToc();

  return (
    <div>
      <ArticleHeader post={post} />

      <div className="mx-auto flex w-full max-w-[1260px] flex-col gap-12 px-6 pb-16 pt-8 sm:px-[90px] lg:flex-row lg:items-start lg:gap-[100px] lg:pb-[120px]">
        {/* contentHtml сейчас — наш собственный статичный текст (data/blog-posts.ts), не
            пользовательский ввод. Когда контент начнёт приходить с бэкенда/CMS, перед
            рендером сюда его нужно будет прогонять через санитайзер (напр. DOMPurify). */}
        <div
          className="blog-article max-w-full lg:max-w-[890px] lg:flex-1"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
        <div className="w-full lg:w-[270px] lg:shrink-0">
          <ArticleToc items={toc} />
        </div>
      </div>

      <NewsletterForm />
      <RelatedArticles />
      <ContactCTA />
    </div>
  );
}
