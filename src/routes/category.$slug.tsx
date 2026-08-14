import { useMemo, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  getCategoryPage,
  getHomeData,
  type Article,
  type Category,
  type SiteSettings,
  type TickerItem,
} from "@/lib/news.functions";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/footer";
import { ScrollTop } from "@/components/site/scroll-top";
import { StandardCard, HeroCard } from "@/components/site/article-card";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/category/$slug")({
  loader: async ({ params }) => {
    const [page, home] = await Promise.all([
      getCategoryPage({ data: { slug: params.slug } }),
      getHomeData(),
    ]);
    if (!page.category) throw notFound();
    return { ...page, home };
  },
  head: ({ loaderData }) => {
    const c = (loaderData as { category: Category | null } | undefined)?.category;
    const title = c ? `${c.name} news | Delhi News Live` : "Section | Delhi News Live";
    const description =
      c?.description ?? "The latest reporting and analysis from the Delhi News Live newsroom.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CategoryPage,
  errorComponent: () => (
    <div className="grid min-h-screen place-items-center px-4 text-center">
      <p className="text-muted-foreground">This section could not be loaded.</p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center px-4 text-center">
      <div>
        <h1 className="font-serif text-4xl">Section not found</h1>
        <Link to="/" className="mt-6 inline-block text-crimson underline">
          Back to the front page
        </Link>
      </div>
    </div>
  ),
});

function CategoryPage() {
  const { category, articles, home } = Route.useLoaderData() as {
    category: Category;
    articles: Article[];
    home: {
      articles: Article[];
      categories: Category[];
      ticker: TickerItem[];
      settings: SiteSettings | null;
    };
  };
  const [sort, setSort] = useState<"latest" | "read">("latest");
  const [limit, setLimit] = useState(12);

  const sorted = useMemo(() => {
    const list = [...articles];
    if (sort === "read") list.sort((a, b) => b.views - a.views);
    return list;
  }, [articles, sort]);

  const leadStory = sorted[0];
  const remainingStories = sorted.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader
        categories={home.categories}
        ticker={home.ticker}
        articles={home.articles}
        logoUrl={home.settings?.logo_url}
      />

      <main className="mx-auto max-w-[1400px] px-4 pt-6 md:pt-10 pb-16">
        <header className="border-b-2 border-foreground/90 pb-5">
          <span className="meta text-crimson font-extrabold tracking-wider uppercase">Editorial Section</span>
          <h1 className="mt-1 font-serif text-3xl md:text-5xl font-extrabold uppercase">{category.name}</h1>
          {category.description && (
            <p className="mt-2 max-w-3xl text-sm md:text-base text-muted-foreground leading-relaxed font-sans">
              {category.description}
            </p>
          )}
        </header>

        <div className="mt-5 flex items-center justify-between border-b border-border pb-3">
          <div className="inline-flex gap-1 rounded border border-border bg-card p-1">
            {(["latest", "read"] as const).map((k) => (
              <button
                key={k}
                onClick={() => setSort(k)}
                className={cn(
                  "rounded px-3 py-1 text-xs font-bold uppercase transition-colors",
                  sort === k
                    ? "bg-crimson text-crimson-foreground"
                    : "text-foreground/80 hover:text-foreground",
                )}
              >
                {k === "latest" ? "Latest Dispatches" : "Most Read"}
              </button>
            ))}
          </div>

          <p className="meta text-muted-foreground font-bold">
            {sorted.length} {sorted.length === 1 ? "Story" : "Stories"}
          </p>
        </div>

        {sorted.length === 0 ? (
          <p className="py-20 text-center text-sm text-muted-foreground font-serif italic">
            No published stories in this section yet.
          </p>
        ) : (
          <div className="space-y-8 mt-6">
            {/* Section Lead Article */}
            {leadStory && (
              <div className="border-b border-border pb-8">
                <HeroCard article={leadStory} />
              </div>
            )}

            {/* Remaining Articles Grid */}
            {remainingStories.length > 0 && (
              <>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {remainingStories.slice(0, limit - 1).map((a, i) => (
                    <StandardCard key={a.id} article={a} index={i} />
                  ))}
                </div>

                {limit - 1 < remainingStories.length && (
                  <div className="mt-8 text-center">
                    <button
                      onClick={() => setLimit((l) => l + 12)}
                      className="rounded border border-border bg-card px-5 py-2 text-xs font-bold uppercase tracking-wider hover:border-crimson hover:text-crimson shadow-sm transition-colors"
                    >
                      Load More Stories
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </main>

      <SiteFooter categories={home.categories} />
      <ScrollTop />
    </div>
  );
}
