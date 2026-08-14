import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: AdminOverview,
});

function AdminOverview() {
  const { data } = useQuery({
    queryKey: ["admin-overview"],
    queryFn: async () => {
      const { data: articles } = await supabase
        .from("articles")
        .select("id,title,slug,status,views,published_at")
        .order("created_at", { ascending: false })
        .limit(200);
      return articles ?? [];
    },
  });

  const rows = data ?? [];
  const published = rows.filter((a) => a.status === "published").length;
  const drafts = rows.filter((a) => a.status === "draft").length;
  const views = rows.reduce((n, a) => n + (a.views ?? 0), 0);

  const stats = [
    { label: "Published", value: published },
    { label: "Drafts", value: drafts },
    { label: "Total views", value: views.toLocaleString("en-IN") },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl">Admin overview</h1>
        <p className="text-sm text-muted-foreground">Everything running on the front page today.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border bg-card p-5">
            <p className="meta text-muted-foreground">{s.label}</p>
            <p className="mt-1 font-serif text-3xl">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border bg-card">
        <div className="flex items-center justify-between border-b px-5 py-3">
          <h2 className="font-serif text-xl">Recent stories</h2>
          <Link to="/admin/articles" className="text-[13px] text-crimson hover:underline">
            Manage articles
          </Link>
        </div>
        <ul className="divide-y">
          {rows.slice(0, 10).map((a) => (
            <li key={a.id} className="flex items-center gap-3 px-5 py-3">
              <span className="min-w-0 flex-1 truncate text-sm">{a.title}</span>
              <span className="meta text-muted-foreground">{a.status}</span>
            </li>
          ))}
          {rows.length === 0 && (
            <li className="px-5 py-8 text-center text-sm text-muted-foreground">No stories yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
