import { BlogCard } from "@/components/blog/BlogCard";
import { getBlogPosts } from "@/data/blog-posts";

const GRID_SIZE = 9;

// Figma id=145:8614 (сетка) + 145:8944 (кнопка). В макете все 9 карточек — один и тот же
// плейсхолдер-пост; сейчас у нас реально тоже только один пост, поэтому сетка заполняется
// им же (циклически меняются только картинка-вариант). Кнопку "Показать ещё" скрываем —
// показывать больше нечего, появится вместе с блог-бэкендом.
export default function BlogGrid({ search }: { search: string }) {
  const posts = getBlogPosts();
  const query = search.trim().toLowerCase();
  const matches = query ? posts.filter((p) => p.title.toLowerCase().includes(query)) : posts;

  if (matches.length === 0) {
    return (
      <div className="px-6 py-24 text-center sm:px-[90px]">
        <p className="font-body text-lg text-body-muted">Ничего не найдено</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-12 px-6 pb-12 sm:px-[90px]">
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: GRID_SIZE }, (_, i) => (
          <BlogCard key={i} post={matches[i % matches.length]} variantIndex={i} />
        ))}
      </div>
    </div>
  );
}
