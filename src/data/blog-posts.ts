import type { BlogPost } from "@/types/blog-post";

// Временные моковые данные вместо CMS/API — см. комментарий в data/cases.ts.
const BLOG_POSTS: BlogPost[] = [];

export function getBlogPosts(): BlogPost[] {
  return BLOG_POSTS;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
