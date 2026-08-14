import { Link } from "@tanstack/react-router";
import type { Category } from "@/lib/news.functions";
import { Masthead } from "./masthead";

export function SiteFooter({ categories }: { categories: Category[] }) {
  return (
    <footer className="mt-20 border-t-2 border-foreground/90 bg-secondary/40 text-foreground font-sans">
      <div className="mx-auto max-w-[1400px] px-4 py-14">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand Info (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <Masthead />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Delhi News Live is an independent digital publication covering hyperlocal Delhi-NCR affairs, national policy, global dispatches, business, tech and culture.
            </p>
            <p className="meta text-crimson font-extrabold tracking-widest text-[10px]">
              DELHI NCR EDITION • DIGITAL NEWSROOM
            </p>
          </div>

          {/* News Sections (3 cols) */}
          <div className="md:col-span-3">
            <p className="meta mb-3.5 text-crimson font-extrabold">News Sections</p>
            <ul className="grid grid-cols-2 gap-2 text-xs font-semibold">
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
            <p className="meta mb-3.5 text-crimson font-extrabold">Newsroom</p>
            <ul className="space-y-2 text-xs font-semibold text-foreground/80">
              <li className="hover:text-crimson cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-crimson cursor-pointer transition-colors">Editorial Code</li>
              <li className="hover:text-crimson cursor-pointer transition-colors">Corrections</li>
              <li className="hover:text-crimson cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-crimson cursor-pointer transition-colors">Contact Desk</li>
            </ul>
          </div>

          {/* Legal & Admin (3 cols) */}
          <div className="md:col-span-3">
            <p className="meta mb-3.5 text-crimson font-extrabold">Access & Policies</p>
            <ul className="space-y-2 text-xs font-semibold text-foreground/80 mb-4">
              <li className="hover:text-crimson cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-crimson cursor-pointer transition-colors">Terms of Service</li>
              <li className="hover:text-crimson cursor-pointer transition-colors">Cookie Settings</li>
            </ul>
            <Link
              to="/admin"
              className="inline-block rounded-md border border-border bg-card px-3.5 py-1.5 text-xs font-bold text-foreground hover:border-crimson hover:text-crimson shadow-xs transition-colors"
            >
              Staff Newsroom Sign In →
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between font-sans">
          <p>© {new Date().getFullYear()} Delhi News Live. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="font-semibold text-foreground">English Edition</span>
            <span>•</span>
            <span className="hover:text-crimson cursor-pointer">हिन्दी (Hindi)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
