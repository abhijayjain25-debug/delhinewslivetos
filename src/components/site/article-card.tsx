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
        "meta inline-block font-bold tracking-widest text-[10px] md:text-[11px] uppercase",
        gold ? "text-gold" : "text-crimson",
      )}
    >
      {name}
    </span>
  );
}

function Meta({ article }: { article: Article }) {
  return (
    <div className="meta text-muted-foreground/80 flex items-center gap-2 flex-wrap text-[11px]">
      <span className="font-semibold text-foreground/80">{article.author_name}</span>
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

export function HeroCard({ article }: { article: Article }) {
  return (
    <article className="group animate-rise">
      <Link to="/article/$slug" params={{ slug: article.slug }} className="block">
        <div className="relative overflow-hidden rounded-md bg-muted border border-border">
          {article.image_url && (
            <img
              src={article.image_url}
              alt={article.title}
              loading="eager"
              className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          )}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <span className="rounded-sm bg-crimson px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-sm">
              Lead Story
            </span>
          </div>
        </div>

        <div className="pt-4 md:pt-5 space-y-2.5">
          <div className="flex items-center gap-2">
            <CategoryTag name={article.categories?.name} />
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.12] tracking-tight text-foreground transition-colors group-hover:text-crimson">
            {article.title}
          </h1>

          {article.dek && (
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground/90 font-sans line-clamp-3">
              {article.dek}
            </p>
          )}

          <div className="pt-2">
            <Meta article={article} />
          </div>
        </div>
      </Link>
    </article>
  );
}

export function SecondaryLeadCard({ article }: { article: Article }) {
  return (
    <article className="group animate-rise border-b border-border/70 pb-5 last:border-b-0">
      <Link to="/article/$slug" params={{ slug: article.slug }} className="flex flex-col sm:flex-row gap-4">
        {article.image_url && (
          <div className="sm:w-2/5 shrink-0 overflow-hidden rounded-sm bg-muted border border-border">
            <img
              src={article.image_url}
              alt={article.title}
              loading="lazy"
              className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
        )}
        <div className="flex-1 min-w-0 space-y-1.5">
          <CategoryTag name={article.categories?.name} gold={article.is_featured} />
          <h2 className="font-serif text-xl font-bold leading-snug transition-colors group-hover:text-crimson line-clamp-2">
            {article.title}
          </h2>
          {article.dek && (
            <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {article.dek}
            </p>
          )}
          <p className="meta text-muted-foreground/70 pt-1">{timeAgo(article.published_at)}</p>
        </div>
      </Link>
    </article>
  );
}

export function StandardCard({ article, index = 0 }: { article: Article; index?: number }) {
  return (
    <article
      className="news-card group animate-rise overflow-hidden rounded-md border border-border bg-card shadow-rest flex flex-col h-full"
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
            <div className="aspect-[16/10] w-full bg-secondary/50 flex items-center justify-center text-xs text-muted-foreground">
              Delhi News Live
            </div>
          )}
          {article.is_video && (
            <span className="glass absolute inset-0 m-auto grid h-10 w-10 place-items-center rounded-full border shadow-md transition-transform group-hover:scale-110">
              <Play className="h-4 w-4 fill-current text-foreground" />
            </span>
          )}
        </div>

        <div className="flex flex-col flex-1 p-4 md:p-5">
          <CategoryTag name={article.categories?.name} gold={article.is_featured} />
          <h3 className="mt-2 font-serif text-lg md:text-xl font-bold leading-snug transition-colors group-hover:text-crimson line-clamp-2">
            {article.title}
          </h3>
          {article.dek && (
            <p className="mt-2 text-xs md:text-sm leading-relaxed text-muted-foreground line-clamp-2">
              {article.dek}
            </p>
          )}
          <div className="mt-auto pt-4 border-t border-border/50 mt-4">
            <Meta article={article} />
          </div>
        </div>
      </Link>
    </article>
  );
}

export function CompactCard({ article }: { article: Article }) {
  return (
    <article className="group py-3.5 border-b border-border/60 last:border-b-0">
      <Link
        to="/article/$slug"
        params={{ slug: article.slug }}
        className="flex gap-3.5 items-start justify-between"
      >
        <div className="flex-1 min-w-0">
          <CategoryTag name={article.categories?.name} />
          <h3 className="mt-1 font-serif text-base font-bold leading-snug transition-colors group-hover:text-crimson line-clamp-2">
            {article.title}
          </h3>
          <p className="meta mt-1.5 text-muted-foreground/70">{timeAgo(article.published_at)}</p>
        </div>
        {article.image_url && (
          <div className="h-16 w-20 md:h-18 md:w-24 shrink-0 overflow-hidden rounded-sm bg-muted border border-border">
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

export function TrendingRow({ article, rank }: { article: Article; rank: number }) {
  return (
    <article className="group py-3.5 border-b border-border/60 last:border-b-0">
      <Link
        to="/article/$slug"
        params={{ slug: article.slug }}
        className="flex gap-4 items-start"
      >
        <span className="font-serif text-2xl font-black text-crimson shrink-0 w-7 text-center">
          {String(rank).padStart(2, "0")}
        </span>
        <div className="flex-1 min-w-0">
          <CategoryTag name={article.categories?.name} />
          <h3 className="mt-0.5 font-serif text-base font-bold leading-snug transition-colors group-hover:text-crimson line-clamp-2">
            {article.title}
          </h3>
          <p className="meta mt-1 text-muted-foreground/70">{timeAgo(article.published_at)}</p>
        </div>
      </Link>
    </article>
  );
}

export function OpinionCard({ article }: { article: Article }) {
  return (
    <article className="group p-5 border-l-4 border-crimson bg-card rounded-r-md border-y border-r border-border shadow-rest hover:border-crimson/80 transition-colors">
      <Link to="/article/$slug" params={{ slug: article.slug }} className="block">
        <span className="meta text-gold font-bold">Opinion & Analysis</span>
        <h3 className="mt-2 font-serif text-xl font-bold italic leading-snug transition-colors group-hover:text-crimson">
          “{article.title}”
        </h3>
        {article.dek && (
          <p className="mt-2.5 text-xs md:text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {article.dek}
          </p>
        )}
        <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
          <span className="font-semibold text-xs text-foreground/90 font-sans">— {article.author_name}</span>
          <span className="meta text-muted-foreground/70">{timeAgo(article.published_at)}</span>
        </div>
      </Link>
    </article>
  );
}

export function VideoCard({ article }: { article: Article }) {
  return (
    <Link
      to="/article/$slug"
      params={{ slug: article.slug }}
      className="group block w-[280px] md:w-[320px] shrink-0"
    >
      <div className="relative overflow-hidden rounded-md bg-muted border border-border">
        {article.image_url && (
          <img
            src={article.image_url}
            alt={article.title}
            loading="lazy"
            className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
        <span className="glass absolute inset-0 m-auto grid h-12 w-12 place-items-center rounded-full border shadow-md transition-transform group-hover:scale-110">
          <Play className="h-5 w-5 fill-current text-foreground" />
        </span>
      </div>
      <h3 className="mt-2.5 font-serif text-base md:text-lg font-bold leading-snug transition-colors group-hover:text-crimson line-clamp-2">
        {article.title}
      </h3>
      <p className="meta mt-1 text-muted-foreground/70">{timeAgo(article.published_at)}</p>
    </Link>
  );
}

export function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-md border border-border bg-card shadow-rest">
      <div className="aspect-[16/10] w-full animate-shimmer bg-muted/70" />
      <div className="space-y-3 p-4">
        <div className="h-3 w-20 animate-shimmer rounded bg-muted/80" />
        <div className="h-5 w-full animate-shimmer rounded bg-muted/80" />
        <div className="h-5 w-3/4 animate-shimmer rounded bg-muted/80" />
        <div className="h-3 w-1/2 animate-shimmer rounded bg-muted/60 mt-4" />
      </div>
    </div>
  );
}
