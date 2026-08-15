export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  format: string; // категория/формат для фильтра на /blog
  topic: string; // тема для фильтра на /blog
  publishedAt: string; // ISO date
  contentHtml: string;
}
