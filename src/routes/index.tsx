import { useMemo, useState, type ReactElement } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Wind, Thermometer, ArrowRight, Flame, Layers } from "lucide-react";
import {
  getHomeData,
  type Article,
  type Category,
  type TickerItem,
  type SiteSettings,
} from "@/lib/news.functions";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/footer";
import { ScrollTop } from "@/components/site/scroll-top";
import {
  CompactCard,
  HeroCard,
  SecondaryLeadCard,
  StandardCard,
  TrendingRow,
  OpinionCard,
  VideoCard,
} from "@/components/site/article-card";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  loader: () => getHomeData(),
  head: () => ({
    meta: [
      { title: "Delhi News Live — Delhi-NCR, India & World news" },
      {
        name: "description",
        content:
          "Delhi News Live brings hyperlocal Delhi-NCR reporting alongside India and world news, business, sport, tech and opinion — updated through the day.",
      },
      { property: "og:title", content: "Delhi News Live — Delhi-NCR, India & World news" },
      {
        property: "og:description",
        content:
          "Hyperlocal Delhi-NCR reporting alongside India and world news, business, sport, tech and opinion.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
  errorComponent: () => (
    <div className="grid min-h-screen place-items-center px-4 text-center">
      <p className="text-muted-foreground">The front page could not load. Please refresh.</p>
    </div>
  ),
});

function SectionHeading({ title, to, slug }: { title: string; to?: string; slug?: string }) {
  return (
    <div className="mb-5 flex items-center justify-between border-b-2 border-foreground/90 pb-2">
      <div className="flex items-center gap-2">
        <span className="h-4 w-1.5 bg-crimson" />
        <h2 className="font-serif text-2xl md:text-3xl font-extrabold tracking-tight text-foreground uppercase">{title}</h2>
      </div>
      {(to || slug) && (
        <Link
          to={slug ? "/category/$slug" : (to as never)}
          params={slug ? { slug } : undefined}
          className="meta flex items-center gap-1 text-crimson hover:underline font-bold"
        >
          {to || "View All"} <ArrowRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  );
}

function Home() {
  const { articles, categories, ticker, settings } = Route.useLoaderData() as {
    articles: Article[];
    categories: Category[];
    ticker: TickerItem[];
    settings: SiteSettings | null;
  };
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const lead = articles.find((a) => a.is_lead) ?? articles[0];
  const secondaries = articles.filter((a) => a.id !== lead?.id).slice(0, 2);
  const fastStream = articles.filter((a) => a.id !== lead?.id && !secondaries.includes(a)).slice(0, 4);
  const rest = articles.filter((a) => a.id !== lead?.id && !secondaries.includes(a) && !fastStream.includes(a));

  const filtered = useMemo(
    () =>
      activeFilter === "all"
        ? rest.slice(0, 9)
        : rest.filter((a) => a.categories?.slug === activeFilter).slice(0, 9),
    [activeFilter, rest],
  );

  const delhi = articles.filter((a) => a.categories?.slug === "delhi-ncr").slice(0, 4);
  const trending = [...articles].sort((a, b) => b.views - a.views).slice(0, 5);
  const videos = articles.filter((a) => a.is_video).slice(0, 8);
  const opinion = articles.filter((a) => a.categories?.slug === "opinion").slice(0, 3);
  const hidden = settings?.hidden_modules ?? [];
  const order: string[] = settings?.module_order ?? [
    "hero",
    "categories",
    "top",
    "delhi",
    "trending",
    "video",
    "opinion",
    "sections",
    "newsletter",
  ];

  const previewSections = categories.filter((c) =>
    ["business", "sports", "entertainment", "tech", "politics", "crime"].includes(c.slug),
  );

  const modules: Record<string, ReactElement | null> = {
    hero:
      settings?.hero_takeover_enabled && settings.hero_takeover_url ? (
        <section className="mx-auto max-w-[1400px] px-4 pt-6">
          <div className="relative overflow-hidden rounded border border-border shadow-lift">
            <img
              src={settings.hero_takeover_url}
              alt={settings.hero_takeover_title ?? "Special coverage"}
              className="h-[420px] md:h-[480px] w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-6 md:p-10 text-white">
              <span className="meta text-amber-400 mb-2 block font-black">Special Coverage</span>
              <h1 className="max-w-4xl font-serif text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">
                {settings.hero_takeover_title}
              </h1>
              {settings.hero_takeover_dek && (
                <p className="mt-3 max-w-2xl text-sm md:text-base text-white/85 line-clamp-2">
                  {settings.hero_takeover_dek}
                </p>
              )}
            </div>
          </div>
        </section>
      ) : lead ? (
        <section className="mx-auto max-w-[1400px] px-4 pt-5 md:pt-7">
          <div className="grid gap-6 lg:grid-cols-12 items-start news-rule pb-8">
            {/* Lead Story (7 Cols) */}
            <div className="lg:col-span-7 lg:border-r border-border/80 lg:pr-6 pb-6 lg:pb-0">
              <HeroCard article={lead} />
            </div>

            {/* Secondary Leads & Newsroom Stream (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between border-b-2 border-crimson pb-1.5">
                <span className="meta font-black text-crimson tracking-wider">Top Newsroom Stories</span>
                <span className="meta text-muted-foreground text-[10px]">Updated Live</span>
              </div>

              {/* 2 Secondary Lead Stories */}
              <div className="space-y-3">
                {secondaries.map((sec) => (
                  <SecondaryLeadCard key={sec.id} article={sec} />
                ))}
              </div>

              {/* Fast Scanning Compact Stream */}
              {fastStream.length > 0 && (
                <div className="pt-2 border-t border-border/80">
                  <span className="meta text-muted-foreground block mb-2 font-bold text-[10px]">Quick Read Headlines</span>
                  <div className="divide-y divide-border/60">
                    {fastStream.map((a) => (
                      <CompactCard key={a.id} article={a} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      ) : null,

    categories: (
      <section className="mx-auto max-w-[1400px] px-4 pt-6">
        <div className="flex items-center gap-2 border-b border-border pb-2.5 overflow-x-auto [scrollbar-width:none]">
          <span className="meta text-muted-foreground shrink-0 font-extrabold mr-2 flex items-center gap-1">
            <Layers className="h-3.5 w-3.5 text-crimson" />
            Filter Feed:
          </span>
          <FilterPill
            label="All Stories"
            active={activeFilter === "all"}
            onClick={() => setActiveFilter("all")}
          />
          {categories.map((c) => (
            <FilterPill
              key={c.id}
              label={c.name}
              active={activeFilter === c.slug}
              onClick={() => setActiveFilter(c.slug)}
            />
          ))}
        </div>
      </section>
    ),

    top: (
      <section className="mx-auto max-w-[1400px] px-4 pt-8">
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Main 9-Grid (8 Cols) */}
          <div className="lg:col-span-8">
            <SectionHeading title="Top Headlines" />
            {filtered.length === 0 ? (
              <p className="py-12 text-center text-sm text-muted-foreground">
                No stories in this section yet.
              </p>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((a, i) => (
                  <StandardCard key={a.id} article={a} index={i} />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar (4 Cols) */}
          <aside className="lg:col-span-4 lg:border-l lg:border-border lg:pl-6 space-y-6">
            {/* Trending / Most Read Box */}
            <div className="rounded border border-border bg-card p-4 shadow-rest">
              <div className="flex items-center justify-between border-b-2 border-crimson pb-2 mb-2">
                <div className="flex items-center gap-2">
                  <Flame className="h-4 w-4 text-crimson" />
                  <h3 className="font-serif text-lg font-bold uppercase">Most Read in Delhi</h3>
                </div>
                <span className="meta text-crimson text-[10px]">Trending</span>
              </div>
              <div className="divide-y divide-border/60">
                {trending.map((a, i) => (
                  <TrendingRow key={a.id} article={a} rank={i + 1} />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    ),

    delhi: (
      <section className="mt-12 border-y border-border bg-secondary/40 py-10 md:py-12">
        <div className="mx-auto max-w-[1400px] px-4">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="meta text-crimson font-extrabold tracking-widest">Hyperlocal Pulse</span>
              <h2 className="mt-1 font-serif text-2xl md:text-3xl font-extrabold uppercase">Delhi / NCR Spotlight</h2>
            </div>

            {/* Weather / AQI Banner Widget */}
            <div className="flex items-center gap-4 rounded border border-border bg-card px-4 py-2.5 shadow-rest text-xs font-sans">
              <div className="flex items-center gap-2">
                <div className="grid h-7 w-7 place-items-center rounded bg-crimson/10 text-crimson">
                  <Wind className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="meta text-muted-foreground text-[9px]">Air Quality (AQI)</p>
                  <p className="font-bold text-foreground text-xs">
                    {settings?.aqi ?? 168} · <span className="text-amber-600 dark:text-amber-400">{settings?.aqi_label ?? "Moderate"}</span>
                  </p>
                </div>
              </div>
              <div className="h-7 w-px bg-border" />
              <div className="flex items-center gap-2">
                <div className="grid h-7 w-7 place-items-center rounded bg-crimson/10 text-crimson">
                  <Thermometer className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="meta text-muted-foreground text-[9px]">Temperature</p>
                  <p className="font-bold text-foreground text-xs">
                    {settings?.temperature_c ?? 31}°C · {settings?.weather_label ?? "Haze"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {delhi.map((a, i) => (
              <StandardCard key={a.id} article={a} index={i} />
            ))}
          </div>
        </div>
      </section>
    ),

    trending: null, // Merged into top stories sidebar for clean newspaper layout

    video: videos.length ? (
      <section className="mx-auto max-w-[1400px] px-4 pt-12">
        <SectionHeading title="Video & Visual Dispatches" />
        <div className="flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none]">
          {videos.map((a) => (
            <VideoCard key={a.id} article={a} />
          ))}
        </div>
      </section>
    ) : null,

    opinion: opinion.length ? (
      <section className="mx-auto max-w-[1400px] px-4 pt-12">
        <SectionHeading title="Opinion & Editorials" slug="opinion" />
        <div className="grid gap-5 md:grid-cols-3">
          {opinion.map((a) => (
            <OpinionCard key={a.id} article={a} />
          ))}
        </div>
      </section>
    ) : null,

    sections: (
      <div className="mx-auto max-w-[1400px] px-4">
        {previewSections.map((c) => {
          const items = articles.filter((a) => a.categories?.slug === c.slug).slice(0, 4);
          if (!items.length) return null;
          return (
            <section key={c.id} className="pt-12">
              <SectionHeading title={c.name} slug={c.slug} />
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {items.map((a, i) => (
                  <StandardCard key={a.id} article={a} index={i} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    ),

    newsletter: (
      <section className="mx-auto mt-14 max-w-[1400px] px-4 mb-12">
        <div className="rounded border border-border bg-card p-6 md:p-10 text-center shadow-lift max-w-3xl mx-auto border-t-4 border-t-crimson">
          <span className="meta text-crimson font-extrabold tracking-wider">The Delhi News Brief</span>
          <h2 className="mt-2 font-serif text-2xl md:text-3xl font-extrabold uppercase">Delhi, decoded every morning</h2>
          <p className="mx-auto mt-2 max-w-lg text-xs md:text-sm text-muted-foreground leading-relaxed">
            Essential dispatches delivered straight from the Delhi News Live newsroom. Curated coverage of policy, city affairs, and regional updates.
          </p>
          <form
            className="mx-auto mt-5 flex max-w-md flex-col sm:flex-row gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="flex-1 rounded border border-border bg-background px-3.5 py-2 text-sm outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all"
            />
            <button className="rounded bg-crimson px-5 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all hover:opacity-95 shadow-sm">
              Subscribe Free
            </button>
          </form>
        </div>
      </section>
    ),
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader
        categories={categories}
        ticker={ticker}
        articles={articles}
        logoUrl={settings?.logo_url}
      />
      <main>
        {order
          .filter((key) => !hidden.includes(key))
          .map((key) => (
            <div key={key}>{modules[key] ?? null}</div>
          ))}
      </main>
      <SiteFooter categories={categories} />
      <ScrollTop />
    </div>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 rounded px-3 py-1 text-xs font-bold tracking-tight uppercase transition-all duration-150",
        active
          ? "bg-crimson text-crimson-foreground shadow-sm"
          : "text-foreground/80 hover:bg-muted hover:text-foreground border border-border/80",
      )}
    >
      {label}
    </button>
  );
}

export type { Article };

