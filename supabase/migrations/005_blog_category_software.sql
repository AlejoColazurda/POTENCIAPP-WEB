-- Suma la categoría "software" (Contratar software) y "stores", que faltaba en el check
-- aunque el panel ya la ofrecía: guardar un artículo en "Tiendas" fallaba.
alter table public.blog_posts drop constraint if exists blog_posts_category_check;
alter table public.blog_posts add constraint blog_posts_category_check check (
  category in ('software', 'security', 'stores', 'news', 'ai-agents', 'mobile-apps', 'web-engineering', 'automation', 'startups-scale')
);
