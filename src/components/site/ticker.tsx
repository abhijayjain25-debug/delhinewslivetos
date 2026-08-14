import type { TickerItem } from "@/lib/news.functions";

export function BreakingTicker({ items }: { items: TickerItem[] }) {
  if (!items.length) return null;
  const loop = [...items, ...items, ...items];

  return (
    <div className="border-b border-crimson/20 bg-crimson/[0.04] dark:bg-crimson/10 text-sm py-2 overflow-hidden select-none">
      <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-4">
        <div className="flex items-center gap-1.5 shrink-0 rounded bg-crimson px-2.5 py-0.5 text-crimson-foreground shadow-sm">
          <span className="h-2 w-2 rounded-full bg-white animate-live" />
          <span className="meta text-[10px] font-extrabold tracking-wider uppercase text-white">Breaking News</span>
        </div>
        <div className="group relative flex-1 overflow-hidden">
          <div className="flex w-max gap-10 animate-marquee group-hover:[animation-play-state:paused]">
            {loop.map((item, i) => (
              <a
                key={`${item.id}-${i}`}
                href={item.href ?? "#"}
                className="inline-flex items-center whitespace-nowrap text-xs md:text-sm font-semibold text-foreground/90 transition-colors hover:text-crimson"
              >
                <span className="mr-2 text-crimson font-black">LATEST ///</span>
                {item.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

