import type { TickerItem } from "@/lib/news.functions";

export function BreakingTicker({ items }: { items: TickerItem[] }) {
  if (!items.length) return null;
  const loop = [...items, ...items];

  return (
    <div className="border-b border-border bg-crimson/5 text-sm py-1.5 overflow-hidden">
      <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-4">
        <div className="flex items-center gap-1.5 shrink-0 rounded-sm bg-crimson px-2.5 py-0.5 text-crimson-foreground shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-live" />
          <span className="meta text-[10px] font-extrabold tracking-widest uppercase">Breaking News</span>
        </div>
        <div className="group relative flex-1 overflow-hidden">
          <div className="flex w-max gap-12 animate-marquee group-hover:[animation-play-state:paused]">
            {loop.map((item, i) => (
              <a
                key={`${item.id}-${i}`}
                href={item.href ?? "#"}
                className="whitespace-nowrap text-xs md:text-sm font-semibold text-foreground/95 transition-colors hover:text-crimson"
              >
                <span className="mr-2 text-crimson font-bold">///</span>
                {item.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
