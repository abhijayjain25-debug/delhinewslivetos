import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, Search, X, Shield, Calendar, CloudSun } from "lucide-react";
import { Masthead } from "./masthead";
import { ThemeToggle } from "./theme";
import { BreakingTicker } from "./ticker";
import type { Article, Category, TickerItem } from "@/lib/news.functions";
import { cn } from "@/lib/utils";

export function SiteHeader({
  categories,
  ticker,
  articles = [],
  logoUrl,
}: {
  categories: Category[];
  ticker: TickerItem[];
  articles?: Article[] | undefined;
  logoUrl?: string | null | undefined;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const primary = categories.slice(0, 9);
  const more = categories.slice(9);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return articles
      .filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          (a.dek ?? "").toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q)),
      )
      .slice(0, 6);
  }, [query, articles]);

  const formattedDate = useMemo(() => {
    return new Date().toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, []);

  return (
    <>
      {/* Top Utility Bar */}
      <div className="border-b border-border/70 bg-secondary/50 text-xs font-sans text-muted-foreground">
        <div className="mx-auto flex h-9 max-w-[1400px] items-center justify-between px-4">
          <div className="flex items-center gap-3.5">
            <span className="flex items-center gap-1.5 font-semibold text-foreground/90 text-[11px]">
              <Calendar className="h-3.5 w-3.5 text-crimson" />
              {formattedDate}
            </span>
            <span className="hidden sm:inline-block text-border/80">•</span>
            <span className="hidden sm:flex items-center gap-1 font-bold uppercase tracking-wider text-muted-foreground text-[10px]">
              <CloudSun className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
              Delhi NCR Edition
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-1.5 font-semibold text-foreground/80 hover:text-crimson transition-colors"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Search News</span>
            </button>
            <span className="text-border/80">•</span>
            <ThemeToggle />
            <span className="text-border/80">•</span>
            <Link
              to="/admin"
              className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground hover:text-crimson transition-colors"
            >
              <Shield className="h-3 w-3 text-crimson" />
              Newsroom Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header Masthead */}
      <header className="relative bg-background border-b border-border">
        <div className="mx-auto max-w-[1400px] px-4 py-4 md:py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded border border-border text-muted-foreground hover:bg-accent hover:text-foreground lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Open menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Masthead logoUrl={logoUrl} compact={false} />
          </div>

          {/* Quick Newsroom Indicators */}
          <div className="hidden md:flex items-center gap-6 text-right">
            <div className="border-r border-border/80 pr-6">
              <p className="meta text-crimson">Live Weather</p>
              <p className="font-serif text-sm font-bold text-foreground">31°C · Haze</p>
            </div>
            <div>
              <p className="meta text-crimson">Delhi AQI</p>
              <p className="font-serif text-sm font-bold text-amber-600 dark:text-amber-400">168 · Moderate</p>
            </div>
          </div>
        </div>

        {/* Primary Sticky Category Navigation */}
        <div
          className={cn(
            "sticky top-0 z-40 border-t-2 border-b border-foreground/90 bg-background/98 backdrop-blur transition-all duration-200",
            scrolled ? "shadow-md py-1" : "py-1.5",
          )}
        >
          <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 overflow-x-auto [scrollbar-width:none]">
            <nav className="flex items-center gap-1 shrink-0">
              <Link
                to="/"
                activeOptions={{ exact: true }}
                className={cn(
                  "px-3 py-1.5 text-xs md:text-sm font-bold tracking-tight transition-colors uppercase",
                  location.pathname === "/"
                    ? "bg-crimson text-crimson-foreground"
                    : "text-foreground/90 hover:bg-muted hover:text-crimson",
                )}
              >
                Front Page
              </Link>
              {primary.map((c) => {
                const isActive = location.pathname === `/category/${c.slug}`;
                return (
                  <Link
                    key={c.id}
                    to="/category/$slug"
                    params={{ slug: c.slug }}
                    className={cn(
                      "px-3 py-1.5 text-xs md:text-sm font-bold tracking-tight transition-colors whitespace-nowrap uppercase",
                      isActive
                        ? "bg-crimson text-crimson-foreground"
                        : "text-foreground/80 hover:bg-muted hover:text-crimson",
                    )}
                  >
                    {c.name}
                  </Link>
                );
              })}
              {more.length > 0 && (
                <div className="group relative">
                  <button className="px-3 py-1.5 text-xs md:text-sm font-bold uppercase tracking-tight text-foreground/80 hover:text-crimson">
                    More Sections ▾
                  </button>
                  <div className="invisible absolute left-0 top-full w-52 translate-y-1 border-2 border-border bg-popover p-1.5 shadow-float transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 z-50">
                    {more.map((c) => (
                      <Link
                        key={c.id}
                        to="/category/$slug"
                        params={{ slug: c.slug }}
                        className="block px-3 py-2 text-xs font-bold uppercase tracking-wider text-foreground/80 hover:bg-muted hover:text-crimson"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </nav>

            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="ml-3 shrink-0 rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Search articles"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Breaking News Ticker Bar */}
        <BreakingTicker items={ticker} />

        {/* Mobile Navigation Drawer */}
        {menuOpen && (
          <div className="animate-rise border-b bg-background px-4 py-4 lg:hidden">
            <div className="grid grid-cols-2 gap-1.5">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
              >
                Home
              </Link>
              {categories.map((c) => (
                <Link
                  key={c.id}
                  to="/category/$slug"
                  params={{ slug: c.slug }}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Search Modal */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 px-4 pt-20 backdrop-blur-sm"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="mx-auto max-w-2xl animate-rise rounded-xl border border-border bg-card p-5 shadow-float"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b pb-3">
              <Search className="h-5 w-5 text-crimson" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Delhi News Live stories, topics, places..."
                className="w-full bg-transparent text-lg outline-none placeholder:text-muted-foreground font-serif"
              />
              <button onClick={() => setSearchOpen(false)} aria-label="Close search">
                <X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              </button>
            </div>
            <div className="pt-4">
              {query.trim() === "" ? (
                <>
                  <p className="meta mb-2.5 text-muted-foreground">Popular Topics</p>
                  <div className="flex flex-wrap gap-2">
                    {["Delhi Metro Phase 4", "Yamuna Water Level", "Delhi Air Quality", "RBI Policy", "Noida AI Plant", "Cricket"].map(
                      (t) => (
                        <button
                          key={t}
                          onClick={() => setQuery(t)}
                          className="rounded-md border bg-secondary/50 px-3 py-1 text-xs font-semibold text-foreground/80 hover:border-crimson hover:text-crimson"
                        >
                          {t}
                        </button>
                      ),
                    )}
                  </div>
                </>
              ) : results.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  No stories found matching “{query}”.
                </p>
              ) : (
                <ul className="divide-y divide-border/60">
                  {results.map((a) => (
                    <li key={a.id}>
                      <Link
                        to="/article/$slug"
                        params={{ slug: a.slug }}
                        onClick={() => setSearchOpen(false)}
                        className="block py-3 hover:text-crimson group"
                      >
                        <p className="meta text-crimson">{a.categories?.name}</p>
                        <p className="font-serif text-base font-semibold leading-snug group-hover:text-crimson">{a.title}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
