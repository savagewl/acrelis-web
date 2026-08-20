export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  format: string; // категория/формат для фильтра на /blog (напр. "Новость", "Статья")
  topic: string; // тема для фильтра на /blog (напр. "Автоматизация") — она же бейдж на карточке
  publishedAt: string; // ISO date
  contentHtml: string; // семантический HTML, стили — .blog-article в globals.css
  authorName: string;
  authorRole: string;
  authorAvatar: string;
}
