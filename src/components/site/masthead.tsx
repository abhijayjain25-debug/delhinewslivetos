import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Masthead({
  className,
  compact = false,
  logoUrl,
}: {
  className?: string;
  compact?: boolean;
  logoUrl?: string | null | undefined;
}) {
  const finalLogoUrl = logoUrl || "/delhi-news-live-logo.png";

  return (
    <Link
      to="/"
      className={cn("flex items-center shrink-0 transition-opacity hover:opacity-95", className)}
      aria-label="Delhi News Live home"
    >
      <img
        src={finalLogoUrl}
        alt="Delhi News Live"
        className={cn(
          "w-auto object-contain transition-all duration-300",
          compact ? "h-6 md:h-7" : "h-8 md:h-[42px]",
        )}
      />
    </Link>
  );
}
