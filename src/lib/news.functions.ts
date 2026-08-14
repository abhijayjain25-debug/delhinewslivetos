import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type SiteSettings = Database["public"]["Tables"]["site_settings"]["Row"];
export type TickerItem = Database["public"]["Tables"]["ticker_items"]["Row"];
export type ArticleRow = Database["public"]["Tables"]["articles"]["Row"];
export type Article = ArticleRow & {
  categories: Pick<Category, "id" | "name" | "slug"> | null;
};

function publicClient() {
  return createClient<Database>(
    process.env["SUPABASE_URL"]!,
    process.env["SUPABASE_PUBLISHABLE_KEY"]!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

const ARTICLE_SELECT =
  "id,slug,title,dek,body,image_url,image_caption,category_id,author_name,tags,published_at,read_minutes,is_lead,is_featured,is_video,video_url,pull_quote,views,status,created_at,updated_at,created_by,categories(id,name,slug)";

export const getHomeData = createServerFn({ method: "GET" }).handler(async () => {
  const sb = publicClient();
  const [articles, categories, ticker, settings] = await Promise.all([
    sb
      .from("articles")
      .select(ARTICLE_SELECT)
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(60),
    sb.from("categories").select("*").eq("is_visible", true).order("sort_order"),
    sb.from("ticker_items").select("*").eq("is_active", true).order("sort_order"),
    sb.from("site_settings").select("*").eq("id", 1).maybeSingle(),
  ]);

  return {
    articles: (articles.data ?? []) as unknown as Article[],
    categories: (categories.data ?? []) as Category[],
    ticker: (ticker.data ?? []) as TickerItem[],
    settings: (settings.data ?? null) as SiteSettings | null,
  };
});

export const getArticleBySlug = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) => z.object({ slug: z.string() }).parse(d))
  .handler(async ({ data }) => {
    const sb = publicClient();
    const { data: article } = await sb
      .from("articles")
      .select(ARTICLE_SELECT)
      .eq("slug", data.slug)
      .eq("status", "published")
      .maybeSingle();

    if (!article) return { article: null, related: [] as Article[] };

    const { data: related } = await sb
      .from("articles")
      .select(ARTICLE_SELECT)
      .eq("status", "published")
      .eq("category_id", (article as unknown as Article).category_id ?? "")
      .neq("id", (article as unknown as Article).id)
      .order("published_at", { ascending: false })
      .limit(6);

    return {
      article: article as unknown as Article,
      related: (related ?? []) as unknown as Article[],
    };
  });

export const getCategoryPage = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) => z.object({ slug: z.string() }).parse(d))
  .handler(async ({ data }) => {
    const sb = publicClient();
    const { data: category } = await sb
      .from("categories")
      .select("*")
      .eq("slug", data.slug)
      .maybeSingle();

    if (!category) return { category: null, articles: [] as Article[] };

    const { data: articles } = await sb
      .from("articles")
      .select(ARTICLE_SELECT)
      .eq("status", "published")
      .eq("category_id", category.id)
      .order("published_at", { ascending: false })
      .limit(40);

    return {
      category: category as Category,
      articles: (articles ?? []) as unknown as Article[],
    };
  });
