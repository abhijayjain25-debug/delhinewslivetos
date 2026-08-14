import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Bookmark, Share2, Printer, ChevronRight, Clock, Calendar } from "lucide-react";
import {
  getArticleBySlug,
  getHomeData,
  type Article,
  type Category,
  type SiteSettings,
  type TickerItem,
} from "@/lib/news.functions";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/footer";
import { ScrollTop } from "@/components/site/scroll-top";
import { StandardCard, CompactCard } from "@/components/site/article-card";
import { fullDate } from "@/lib/format";
import { toast } from "sonner";

export const Route = createFileRoute("/article/$slug")({
  loader: async ({ params }) => {
    const [detail, home] = await Promise.all([
      getArticleBySlug({ data: { slug: params.slug } }),
      getHomeData(),
    ]);
    if (!detail.article) throw notFound();
    return { ...detail, home };
  },
  head: ({ loaderData }) => {
    const a = (loaderData as { article: Article | null } | undefined)?.article;
    const title = a ? `${a.title} | Delhi News Live` : "Story | Delhi News Live";
    const description = a?.dek ?? "Read the latest reporting from Delhi News Live.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(a?.image_url?.startsWith("https://")
          ? [
              { property: "og:image", content: a.image_url },
              { name: "twitter:image", content: a.image_url },
            ]
          : []),
      ],
    };
  },
  component: ArticlePage,
  errorComponent: () => (
    <div className="grid min-h-screen place-items-center px-4 text-center">
      <p className="text-muted-foreground">This story could not be loaded.</p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center px-4 text-center">
      <div>
        <h1 className="font-serif text-4xl">Story not found</h1>
        <p className="mt-2 text-muted-foreground">It may have been unpublished or moved.</p>
        <Link to="/" className="mt-6 inline-block text-crimson underline">
          Back to the front page
        </Link>
      </div>
    </div>
  ),
});

function ArticlePage() {
  const { article, related, home } = Route.useLoaderData() as {
    article: Article;
    related: Article[];
    home: {
      articles: Article[];
      categories: Category[];
      ticker: TickerItem[];
      settings: SiteSettings | null;
    };
  };
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.body.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const paragraphs = article.body.split(/\n\s*\n/).filter(Boolean);

  function handleShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      void navigator.share({ title: article.title, url: window.location.href });
    } else {
      void navigator.clipboard.writeText(window.location.href);
      toast.success("Story link copied to clipboard!");
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader
        categories={home.categories}
        ticker={home.ticker}
        articles={home.articles}
        logoUrl={home.settings?.logo_url}
      />

      {/* Reading Progress Indicator */}
      <div
        className="fixed left-0 top-0 z-[70] h-1 bg-crimson transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />

      <main className="mx-auto max-w-[1400px] px-4 pt-6 md:pt-10 pb-16">
        {/* Breadcrumb Navigation */}
        <nav className="mb-5 flex items-center gap-1.5 text-xs text-muted-foreground font-sans">
          <Link to="/" className="hover:text-crimson font-semibold transition-colors">
            Front Page
          </Link>
          <ChevronRight className="h-3 w-3" />
          {article.categories && (
            <>
              <Link
                to="/category/$slug"
                params={{ slug: article.categories.slug }}
                className="hover:text-crimson font-semibold transition-colors uppercase"
              >
                {article.categories.name}
              </Link>
              <ChevronRight className="h-3 w-3" />
            </>
          )}
          <span className="truncate text-foreground font-bold max-w-[200px] sm:max-w-md">
            {article.title}
          </span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-12 items-start">
          {/* Main Article Content (8 Cols) */}
          <article className="lg:col-span-8 max-w-[820px]">
            {article.categories && (
              <span className="meta text-crimson font-extrabold tracking-wider uppercase">
                {article.categories.name} Dispatch
              </span>
            )}

            <h1 className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.12] tracking-tight text-foreground">
              {article.title}
            </h1>

            {article.dek && (
              <p className="mt-4 text-base md:text-lg leading-relaxed text-muted-foreground font-sans border-l-4 border-crimson pl-4 py-1 italic">
                {article.dek}
              </p>
            )}

            {/* Byline & Sharing Metadata Bar */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-y border-border py-3 text-xs text-muted-foreground font-sans">
              <div className="flex items-center gap-3">
                <div className="grid h-8 w-8 place-items-center rounded bg-crimson text-white font-bold text-xs uppercase shadow-sm">
                  {article.author_name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-foreground text-xs">{article.author_name}</p>
                  <p className="text-[11px] flex items-center gap-2 mt-0.5">
                    <span className="flex items-center gap-1 font-medium">
                      <Calendar className="h-3 w-3 text-crimson" />
                      {fullDate(article.published_at)}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      {article.read_minutes} min read
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex items-center gap-1.5 rounded border border-border px-3 py-1.5 text-xs font-bold hover:border-crimson hover:text-crimson transition-colors"
                  title="Share story"
                >
                  <Share2 className="h-3.5 w-3.5 text-crimson" />
                  <span>Share</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 rounded border border-border px-3 py-1.5 text-xs font-bold hover:border-crimson hover:text-crimson transition-colors"
                  title="Print story"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Print</span>
                </button>
                <button
                  type="button"
                  onClick={() => toast.success("Story bookmarked!")}
                  className="grid h-8 w-8 place-items-center rounded border border-border hover:border-crimson hover:text-crimson transition-colors"
                  title="Bookmark"
                >
                  <Bookmark className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Featured Image */}
            {article.image_url && (
              <figure className="mt-6">
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full rounded object-cover border border-border shadow-lift"
                />
                {article.image_caption && (
                  <figcaption className="mt-2 text-xs text-muted-foreground italic text-center font-sans">
                    {article.image_caption}
                  </figcaption>
                )}
              </figure>
            )}

            {/* Article Body */}
            <div className="mt-7 space-y-6 text-base md:text-lg leading-relaxed text-foreground/95 font-sans">
              {paragraphs.map((para, i) => (
                <div key={i}>
                  <p className={i === 0 ? "drop-cap" : ""}>{para}</p>

                  {article.pull_quote && i === 1 && (
                    <blockquote className="my-6 border-l-4 border-crimson bg-secondary/40 p-5 rounded-r font-serif text-xl md:text-2xl italic font-extrabold leading-snug text-foreground">
                      “{article.pull_quote}”
                    </blockquote>
                  )}

                  {related[0] && i === 2 && (
                    <aside className="my-6 rounded border border-border bg-card p-4 shadow-rest">
                      <span className="meta text-crimson font-extrabold block mb-1">Related Newsroom Dispatch</span>
                      <CompactCard article={related[0]} />
                    </aside>
                  )}
                </div>
              ))}
            </div>

            {/* Article Tags */}
            {article.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap items-center gap-2 pt-5 border-t border-border">
                <span className="meta text-muted-foreground mr-1">Filed Under:</span>
                {article.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded border border-border bg-secondary/60 px-2.5 py-1 text-xs font-bold text-foreground/80 hover:border-crimson hover:text-crimson transition-colors"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </article>

          {/* Right Sidebar (4 Cols) */}
          <aside className="lg:col-span-4 lg:border-l lg:border-border lg:pl-6 space-y-6">
            <div className="rounded border border-border bg-card p-4 shadow-rest">
              <div className="border-b-2 border-crimson pb-2 mb-3">
                <h3 className="font-serif text-lg font-bold uppercase">More in {article.categories?.name ?? "News"}</h3>
              </div>
              <div className="divide-y divide-border/60">
                {related.slice(0, 5).map((rel) => (
                  <CompactCard key={rel.id} article={rel} />
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* More Related Stories Section */}
        {related.length > 0 && (
          <section className="mt-14 pt-8 border-t-2 border-foreground/90">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-serif text-2xl md:text-3xl font-extrabold uppercase">Further Reading</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.slice(0, 4).map((a, i) => (
                <StandardCard key={a.id} article={a} index={i} />
              ))}
            </div>
          </section>
        )}
      </main>

      <SiteFooter categories={home.categories} />
      <ScrollTop />
    </div>
  );
}
