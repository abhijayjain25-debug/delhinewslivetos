import { Link } from "@tanstack/react-router";
import type { Category } from "@/lib/news.functions";
import { Masthead } from "./masthead";

export function SiteFooter({ categories }: { categories: Category[] }) {
  return (
    <footer className="mt-16 border-t-4 border-foreground/90 bg-secondary/50 text-foreground font-sans">
      <div className="mx-auto max-w-[1400px] px-4 py-12">
        <div className="grid gap-8 md:grid-cols-12">
          {/* Brand Info (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <Masthead />
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              Delhi News Live is an independent digital publication covering hyperlocal Delhi-NCR affairs, national policy, global dispatches, business, tech, culture, and opinion.
            </p>
            <p className="meta text-crimson font-black tracking-wider text-[10px]">
              DELHI NCR EDITION • DIGITAL NEWSROOM
            </p>
          </div>

          {/* News Sections (3 cols) */}
          <div className="md:col-span-3">
            <p className="meta mb-3 text-crimson font-black uppercase">News Sections</p>
            <ul className="grid grid-cols-2 gap-2 text-xs font-bold uppercase">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link
                    to="/category/$slug"
                    params={{ slug: c.slug }}
                    className="text-foreground/80 hover:text-crimson transition-colors"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsroom (2 cols) */}
          <div className="md:col-span-2">
            <p className="meta mb-3 text-crimson font-black uppercase">Newsroom</p>
            <ul className="space-y-1.5 text-xs font-bold uppercase text-foreground/80">
              <li className="hover:text-crimson cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-crimson cursor-pointer transition-colors">Editorial Code</li>
              <li className="hover:text-crimson cursor-pointer transition-colors">Corrections</li>
              <li className="hover:text-crimson cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-crimson cursor-pointer transition-colors">Contact Desk</li>
            </ul>
          </div>

          {/* Legal & Admin (3 cols) */}
          <div className="md:col-span-3">
            <p className="meta mb-3 text-crimson font-black uppercase">Access & Policies</p>
            <ul className="space-y-1.5 text-xs font-bold uppercase text-foreground/80 mb-3">
              <li className="hover:text-crimson cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-crimson cursor-pointer transition-colors">Terms of Service</li>
              <li className="hover:text-crimson cursor-pointer transition-colors">Cookie Settings</li>
            </ul>
            <Link
              to="/admin"
              className="inline-block rounded border border-border bg-card px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-foreground hover:border-crimson hover:text-crimson shadow-xs transition-colors"
            >
              Staff Newsroom Sign In →
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between font-sans">
          <p>© {new Date().getFullYear()} Delhi News Live. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="font-bold text-foreground uppercase text-[11px]">English Edition</span>
            <span>•</span>
            <span className="hover:text-crimson cursor-pointer font-bold text-[11px]">हिन्दी (Hindi)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

