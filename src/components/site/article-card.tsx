import { Link } from "@tanstack/react-router";
import { Play, Clock } from "lucide-react";
import type { Article } from "@/lib/news.functions";
import { timeAgo } from "@/lib/format";
import { cn } from "@/lib/utils";

export function CategoryTag({ name, gold }: { name?: string | undefined; gold?: boolean | undefined }) {
  if (!name) return null;
  return (
    <span
      className={cn(
        "meta inline-block font-extrabold tracking-wider text-[10px] uppercase",
        gold ? "text-amber-600 dark:text-amber-400" : "text-crimson",
      )}
    >
      {name}
    </span>
  );
}

function Meta({ article }: { article: Article }) {
  return (
    <div className="meta text-muted-foreground/80 flex items-center gap-2 flex-wrap text-[10px] font-sans">
      <span className="font-bold text-foreground/80">{article.author_name}</span>
      <span>•</span>
      <span>{timeAgo(article.published_at)}</span>
      <span>•</span>
      <span className="flex items-center gap-1">
        <Clock className="h-3 w-3" />
        {article.read_minutes} min read
      </span>
    </div>
  );
}

/* Major Front Page Lead Story Card */
export function HeroCard({ article }: { article: Article }) {
  return (
    <article className="group animate-rise">
      <Link to="/article/$slug" params={{ slug: article.slug }} className="block">
        <div className="relative overflow-hidden rounded bg-muted border border-border">
          {article.image_url && (
            <img
              src={article.image_url}
              alt={article.title}
              loading="eager"
              className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          )}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
            <span className="rounded bg-crimson px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-sm">
              TOP STORY
            </span>
          </div>
        </div>

        <div className="pt-4 space-y-2">
          <div className="flex items-center gap-2">
            <CategoryTag name={article.categories?.name} />
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-[1.15] tracking-tight text-foreground transition-colors group-hover:text-crimson">
            {article.title}
          </h1>

          {article.dek && (
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground font-sans line-clamp-3">
              {article.dek}
            </p>
          )}

          <div className="pt-2 border-t border-border/50">
            <Meta article={article} />
          </div>
        </div>
      </Link>
    </article>
  );
}

/* Secondary Lead Story Card (2-column layout) */
export function SecondaryLeadCard({ article }: { article: Article }) {
  return (
    <article className="group animate-rise border-b border-border/80 pb-4 last:border-b-0">
      <Link to="/article/$slug" params={{ slug: article.slug }} className="flex flex-col sm:flex-row gap-3.5">
        {article.image_url && (
          <div className="sm:w-2/5 shrink-0 overflow-hidden rounded bg-muted border border-border">
            <img
              src={article.image_url}
              alt={article.title}
              loading="lazy"
              className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
        )}
        <div className="flex-1 min-w-0 space-y-1">
          <CategoryTag name={article.categories?.name} gold={article.is_featured} />
          <h2 className="font-serif text-lg font-bold leading-snug transition-colors group-hover:text-crimson line-clamp-2">
            {article.title}
          </h2>
          {article.dek && (
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {article.dek}
            </p>
          )}
          <p className="meta text-muted-foreground/70 pt-1">{timeAgo(article.published_at)}</p>
        </div>
      </Link>
    </article>
  );
}

/* Compact Headline Row Card (High Information Density) */
export function CompactCard({ article }: { article: Article }) {
  return (
    <article className="group py-2.5 border-b border-border/60 last:border-b-0">
      <Link
        to="/article/$slug"
        params={{ slug: article.slug }}
        className="flex gap-3 items-start justify-between"
      >
        <div className="flex-1 min-w-0">
          <CategoryTag name={article.categories?.name} />
          <h3 className="mt-0.5 font-serif text-sm md:text-base font-bold leading-snug transition-colors group-hover:text-crimson line-clamp-2">
            {article.title}
          </h3>
          <p className="meta mt-1 text-muted-foreground/70 text-[10px]">{timeAgo(article.published_at)}</p>
        </div>
        {article.image_url && (
          <div className="h-14 w-18 md:h-16 md:w-20 shrink-0 overflow-hidden rounded bg-muted border border-border">
            <img
              src={article.image_url}
              alt={article.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
      </Link>
    </article>
  );
}

/* Numbered Trending / Most Read Row */
export function TrendingRow({ article, rank }: { article: Article; rank: number }) {
  return (
    <article className="group py-3 border-b border-border/60 last:border-b-0">
      <Link
        to="/article/$slug"
        params={{ slug: article.slug }}
        className="flex gap-3.5 items-start"
      >
        <span className="font-serif text-xl font-black text-crimson shrink-0 w-6 text-center leading-none mt-0.5">
          {String(rank).padStart(2, "0")}
        </span>
        <div className="flex-1 min-w-0">
          <CategoryTag name={article.categories?.name} />
          <h3 className="mt-0.5 font-serif text-sm md:text-base font-bold leading-snug transition-colors group-hover:text-crimson line-clamp-2">
            {article.title}
          </h3>
          <p className="meta mt-1 text-muted-foreground/70 text-[10px]">{timeAgo(article.published_at)}</p>
        </div>
      </Link>
    </article>
  );
}

/* Opinion & Column Card */
export function OpinionCard({ article }: { article: Article }) {
  return (
    <article className="group p-4 border-l-4 border-crimson bg-card rounded-r border-y border-r border-border news-card">
      <Link to="/article/$slug" params={{ slug: article.slug }} className="block">
        <span className="meta text-amber-600 dark:text-amber-400 font-extrabold">Opinion & Analysis</span>
        <h3 className="mt-1.5 font-serif text-lg font-bold italic leading-snug transition-colors group-hover:text-crimson">
          “{article.title}”
        </h3>
        {article.dek && (
          <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {article.dek}
          </p>
        )}
        <div className="mt-3 pt-2.5 border-t border-border/60 flex items-center justify-between">
          <span className="font-bold text-xs text-foreground/90 font-sans">— {article.author_name}</span>
          <span className="meta text-muted-foreground/70 text-[10px]">{timeAgo(article.published_at)}</span>
        </div>
      </Link>
    </article>
  );
}

/* Video & Visual Dispatch Card */
export function VideoCard({ article }: { article: Article }) {
  return (
    <Link
      to="/article/$slug"
      params={{ slug: article.slug }}
      className="group block w-[260px] md:w-[300px] shrink-0"
    >
      <div className="relative overflow-hidden rounded bg-muted border border-border">
        {article.image_url && (
          <img
            src={article.image_url}
            alt={article.title}
            loading="lazy"
            className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
        <span className="glass absolute inset-0 m-auto grid h-10 w-10 place-items-center rounded-full border border-white/40 shadow-md transition-transform group-hover:scale-110">
          <Play className="h-4 w-4 fill-current text-foreground" />
        </span>
      </div>
      <h3 className="mt-2 font-serif text-sm md:text-base font-bold leading-snug transition-colors group-hover:text-crimson line-clamp-2">
        {article.title}
      </h3>
      <p className="meta mt-1 text-muted-foreground/70 text-[10px]">{timeAgo(article.published_at)}</p>
    </Link>
  );
}

/* Standard Multi-Column Newspaper Card */
export function StandardCard({ article, index = 0 }: { article: Article; index?: number }) {
  return (
    <article
      className="news-card group animate-rise overflow-hidden rounded border border-border bg-card flex flex-col h-full"
      style={{ animationDelay: `${Math.min(index, 8) * 35}ms` }}
    >
      <Link to="/article/$slug" params={{ slug: article.slug }} className="flex flex-col h-full">
        <div className="relative overflow-hidden bg-muted border-b border-border">
          {article.image_url ? (
            <img
              src={article.image_url}
              alt={article.title}
              loading="lazy"
              className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="aspect-[16/10] w-full bg-muted/60 flex items-center justify-center text-xs text-muted-foreground font-serif font-bold">
              Delhi News Live
            </div>
          )}
          {article.is_video && (
            <span className="glass absolute inset-0 m-auto grid h-9 w-9 place-items-center rounded-full border shadow transition-transform group-hover:scale-110">
              <Play className="h-3.5 w-3.5 fill-current text-foreground" />
            </span>
          )}
        </div>

        <div className="flex flex-col flex-1 p-3.5 md:p-4">
          <CategoryTag name={article.categories?.name} gold={article.is_featured} />
          <h3 className="mt-1.5 font-serif text-base md:text-lg font-bold leading-snug transition-colors group-hover:text-crimson line-clamp-2">
            {article.title}
          </h3>
          {article.dek && (
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">
              {article.dek}
            </p>
          )}
          <div className="mt-auto pt-3 border-t border-border/50 mt-3">
            <Meta article={article} />
          </div>
        </div>
      </Link>
    </article>
  );
}

export function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded border border-border bg-card">
      <div className="aspect-[16/10] w-full animate-shimmer bg-muted/70" />
      <div className="space-y-2.5 p-4">
        <div className="h-3 w-16 animate-shimmer rounded bg-muted/80" />
        <div className="h-4 w-full animate-shimmer rounded bg-muted/80" />
        <div className="h-4 w-3/4 animate-shimmer rounded bg-muted/80" />
        <div className="h-3 w-1/2 animate-shimmer rounded bg-muted/60 mt-3" />
      </div>
    </div>
  );
}

