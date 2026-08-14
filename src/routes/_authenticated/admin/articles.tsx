import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { readingMinutes, slugify, timeAgo } from "@/lib/format";
import { cn } from "@/lib/utils";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { logActivity } from "@/lib/activity-log";

export const Route = createFileRoute("/_authenticated/admin/articles")({
  component: AdminArticles,
});

type Draft = {
  id?: string;
  title: string;
  slug: string;
  dek: string;
  body: string;
  image_url: string;
  image_caption: string;
  category_id: string;
  author_name: string;
  tags: string;
  status: string;
  is_lead: boolean;
  is_featured: boolean;
  is_video: boolean;
  video_url: string;
  pull_quote: string;
};

const EMPTY: Draft = {
  title: "",
  slug: "",
  dek: "",
  body: "",
  image_url: "",
  image_caption: "",
  category_id: "",
  author_name: "DNL Desk",
  tags: "",
  status: "draft",
  is_lead: false,
  is_featured: false,
  is_video: false,
  video_url: "",
  pull_quote: "",
};

const field =
  "w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-crimson";

function AdminArticles() {
  const qc = useQueryClient();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [filter, setFilter] = useState("all");

  const { data: categories = [] } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: async () => {
      const { data } = await supabase.from("categories").select("*").order("sort_order");
      return data ?? [];
    },
  });

  const { data: articles = [] } = useQuery({
    queryKey: ["admin-articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(300);
      if (error) throw error;
      return data ?? [];
    },
  });

  const rows = useMemo(
    () => (filter === "all" ? articles : articles.filter((a) => a.status === filter)),
    [articles, filter],
  );

  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);

  const save = useMutation({
    mutationFn: async (d: Draft) => {
      const payload = {
        title: d.title.trim(),
        slug: d.slug.trim() || slugify(d.title),
        dek: d.dek || null,
        body: d.body,
        image_url: d.image_url || null,
        image_caption: d.image_caption || null,
        category_id: d.category_id || null,
        author_name: d.author_name || "DNL Desk",
        tags: d.tags.split(",").map((t) => t.trim()).filter(Boolean),
        status: d.status,
        read_minutes: readingMinutes(d.body || d.title),
        is_lead: d.is_lead,
        is_featured: d.is_featured,
        is_video: d.is_video,
        video_url: d.video_url || null,
        pull_quote: d.pull_quote || null,
        published_at: d.status === "published" ? new Date().toISOString() : null,
      };
      if (d.id) {
        const { error } = await supabase.from("articles").update(payload).eq("id", d.id);
        if (error) throw error;
        await logActivity({
          action: d.status === "published" ? "article.published" : "article.updated",
          entity_type: "article",
          entity_id: d.id,
          details: { title: d.title, status: d.status },
        });
      } else {
        const { data, error } = await supabase.from("articles").insert(payload).select("id").single();
        if (error) throw error;
        await logActivity({
          action: d.status === "published" ? "article.created_and_published" : "article.created",
          entity_type: "article",
          entity_id: data?.id,
          details: { title: d.title, status: d.status },
        });
      }
    },
    onSuccess: () => {
      toast.success("Story saved successfully");
      setDraft(null);
      void qc.invalidateQueries({ queryKey: ["admin-articles"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("articles").delete().eq("id", id);
      if (error) throw error;
      await logActivity({
        action: "article.deleted",
        entity_type: "article",
        entity_id: id,
        details: { title: deleteTarget?.title },
      });
    },
    onSuccess: () => {
      toast.success("Story deleted");
      setDeleteTarget(null);
      void qc.invalidateQueries({ queryKey: ["admin-articles"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div>
          <h1 className="font-serif text-3xl">Articles</h1>
          <p className="text-sm text-muted-foreground">Write, edit and publish stories.</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {["all", "published", "draft"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "meta rounded-full border px-3 py-1.5 capitalize",
                filter === f ? "border-crimson text-crimson" : "text-muted-foreground",
              )}
            >
              {f}
            </button>
          ))}
          <button
            onClick={() => setDraft({ ...EMPTY })}
            className="flex items-center gap-1.5 rounded-full bg-crimson px-4 py-2 text-[13px] font-semibold text-crimson-foreground"
          >
            <Plus className="h-3.5 w-3.5" /> New story
          </button>
        </div>
      </div>

      <div className="rounded-xl border bg-card">
        <ul className="divide-y">
          {rows.map((a) => (
            <li key={a.id} className="flex items-center gap-3 px-4 py-3">
              <button
                onClick={() =>
                  setDraft({
                    id: a.id,
                    title: a.title,
                    slug: a.slug,
                    dek: a.dek ?? "",
                    body: a.body ?? "",
                    image_url: a.image_url ?? "",
                    image_caption: a.image_caption ?? "",
                    category_id: a.category_id ?? "",
                    author_name: a.author_name,
                    tags: (a.tags ?? []).join(", "),
                    status: a.status,
                    is_lead: a.is_lead,
                    is_featured: a.is_featured,
                    is_video: a.is_video,
                    video_url: a.video_url ?? "",
                    pull_quote: a.pull_quote ?? "",
                  })
                }
                className="min-w-0 flex-1 truncate text-left text-sm hover:text-crimson"
              >
                {a.title}
              </button>
              <span className="meta hidden text-muted-foreground sm:inline">
                {timeAgo(a.published_at ?? a.created_at)}
              </span>
              <span
                className={cn(
                  "meta rounded-full border px-2 py-0.5",
                  a.status === "published" ? "border-crimson text-crimson" : "text-muted-foreground",
                )}
              >
                {a.status}
              </span>
              <button
                onClick={() => setDeleteTarget({ id: a.id, title: a.title })}
                className="text-muted-foreground hover:text-crimson"
                aria-label={`Delete ${a.title}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
          {rows.length === 0 && (
            <li className="px-5 py-10 text-center text-sm text-muted-foreground">
              Nothing here yet.
            </li>
          )}
        </ul>
      </div>

      {draft && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-background/80 p-4 backdrop-blur">
          <div className="mx-auto max-w-3xl rounded-2xl border bg-card p-6 shadow-rest">
            <div className="mb-4 flex items-center">
              <h2 className="font-serif text-2xl">{draft.id ? "Edit story" : "New story"}</h2>
              <button onClick={() => setDraft(null)} className="ml-auto" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid gap-3">
              <input
                className={field}
                placeholder="Headline"
                value={draft.title}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    title: e.target.value,
                    slug: draft.id ? draft.slug : slugify(e.target.value),
                  })
                }
              />
              <input
                className={field}
                placeholder="Slug"
                value={draft.slug}
                onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
              />
              <textarea
                className={field}
                rows={2}
                placeholder="Standfirst / dek"
                value={draft.dek}
                onChange={(e) => setDraft({ ...draft, dek: e.target.value })}
              />
              <textarea
                className={cn(field, "font-serif")}
                rows={12}
                placeholder="Body — one paragraph per line"
                value={draft.body}
                onChange={(e) => setDraft({ ...draft, body: e.target.value })}
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  className={field}
                  placeholder="Image URL"
                  value={draft.image_url}
                  onChange={(e) => setDraft({ ...draft, image_url: e.target.value })}
                />
                <input
                  className={field}
                  placeholder="Image caption"
                  value={draft.image_caption}
                  onChange={(e) => setDraft({ ...draft, image_caption: e.target.value })}
                />
                <select
                  className={field}
                  value={draft.category_id}
                  onChange={(e) => setDraft({ ...draft, category_id: e.target.value })}
                >
                  <option value="">Select section</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <input
                  className={field}
                  placeholder="Byline"
                  value={draft.author_name}
                  onChange={(e) => setDraft({ ...draft, author_name: e.target.value })}
                />
                <input
                  className={field}
                  placeholder="Tags, comma separated"
                  value={draft.tags}
                  onChange={(e) => setDraft({ ...draft, tags: e.target.value })}
                />
                <select
                  className={field}
                  value={draft.status}
                  onChange={(e) => setDraft({ ...draft, status: e.target.value })}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
                <input
                  className={field}
                  placeholder="Video URL (optional)"
                  value={draft.video_url}
                  onChange={(e) => setDraft({ ...draft, video_url: e.target.value })}
                />
                <input
                  className={field}
                  placeholder="Pull quote (optional)"
                  value={draft.pull_quote}
                  onChange={(e) => setDraft({ ...draft, pull_quote: e.target.value })}
                />
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                {(
                  [
                    ["is_lead", "Lead story"],
                    ["is_featured", "Featured"],
                    ["is_video", "Video story"],
                  ] as const
                ).map(([key, label]) => (
                  <label key={key} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={draft[key]}
                      onChange={(e) => setDraft({ ...draft, [key]: e.target.checked })}
                    />
                    {label}
                  </label>
                ))}
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setDraft(null)} className="rounded-lg border px-4 py-2 text-sm">
                  Cancel
                </button>
                <button
                  disabled={save.isPending || !draft.title.trim()}
                  onClick={() => save.mutate(draft)}
                  className="rounded-lg bg-crimson px-5 py-2 text-sm font-semibold text-crimson-foreground disabled:opacity-60"
                >
                  {save.isPending ? "Saving…" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Story"
        description={`Are you sure you want to delete "${deleteTarget?.title}"? This story will be permanently removed.`}
        confirmText="Delete Story"
        onConfirm={() => deleteTarget && remove.mutate(deleteTarget.id)}
        onCancel={() => setDeleteTarget(null)}
        busy={remove.isPending}
      />
    </div>
  );
}
