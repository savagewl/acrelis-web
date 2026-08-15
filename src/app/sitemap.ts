import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/metadata";

// Статические разделы сайта. Когда появятся кейсы/статьи блога с реальным
// источником данных (API/CMS), сюда добавляется их подгрузка и маппинг в records —
// сам sitemap.xml собирается автоматически, руками его больше не трогаем
// (в отличие от старого сайта, где public/sitemap.xml поддерживался вручную).
const STATIC_PATHS: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "daily" },
  { path: "/automation", priority: 0.9, changeFrequency: "weekly" },
  { path: "/it-solutions", priority: 0.9, changeFrequency: "weekly" },
  { path: "/support", priority: 0.9, changeFrequency: "weekly" },
  { path: "/portfolio", priority: 0.8, changeFrequency: "weekly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/contacts", priority: 0.6, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return STATIC_PATHS.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
