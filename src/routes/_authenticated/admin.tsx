import { useEffect, useState } from "react";
import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { FileText, LayoutTemplate, LogOut, Settings, Tags, BarChart3, Image as ImageIcon, History } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Masthead } from "@/components/site/masthead";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminLayout,
});

const NAV = [
  { to: "/admin", label: "Overview", icon: BarChart3, exact: true },
  { to: "/admin/articles", label: "Articles", icon: FileText },
  { to: "/admin/media", label: "Media Library", icon: ImageIcon },
  { to: "/admin/frontpage", label: "Front Page", icon: LayoutTemplate },
  { to: "/admin/sections", label: "Sections & Ticker", icon: Tags },
  { to: "/admin/settings", label: "Site settings", icon: Settings },
  { to: "/admin/activity", label: "Activity & Access", icon: History },
] as { to: string; label: string; icon: typeof FileText; exact?: boolean }[];

export function useRole() {
  const [role, setRole] = useState<"owner" | "editor" | null>(null);
  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;
      const { data: rows } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id);
      const roles = (rows ?? []).map((r) => r.role);
      setRole(roles.includes("owner") ? "owner" : roles.includes("editor") ? "editor" : null);
    });
  }, []);
  return role;
}

function AdminLayout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const role = useRole();

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    void navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="glass sticky top-0 z-40 border-b">
        <div className="mx-auto flex h-16 max-w-[1500px] items-center gap-4 px-4">
          <Masthead compact />
          <span className="meta rounded-full border px-2.5 py-1 text-muted-foreground">
            Admin {role ? `· ${role}` : ""}
          </span>
          <Link to="/" className="ml-auto text-[13px] text-muted-foreground hover:text-crimson">
            View site
          </Link>
          <button
            onClick={signOut}
            className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] hover:border-crimson hover:text-crimson"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign out
          </button>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1500px] gap-6 px-4 py-6">
        <nav className="hidden w-56 shrink-0 space-y-1 md:block">
          {NAV.map((item) => {
            const active = item.exact ? path === item.to : path.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to as never}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-crimson text-crimson-foreground"
                    : "text-foreground/75 hover:bg-accent",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
