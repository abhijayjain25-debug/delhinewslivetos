import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { slugify } from "@/lib/format";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { logActivity } from "@/lib/activity-log";

export const Route = createFileRoute("/_authenticated/admin/sections")({
  component: SectionsAndTicker,
});

const field =
  "w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-crimson";

function SectionsAndTicker() {
  const qc = useQueryClient();
  const [catName, setCatName] = useState("");
  const [tickerText, setTickerText] = useState("");
  const [tickerHref, setTickerHref] = useState("");
  const [deleteCatTarget, setDeleteCatTarget] = useState<{ id: string; name: string } | null>(null);
  const [deleteTickerTarget, setDeleteTickerTarget] = useState<{ id: string; text: string } | null>(null);

  const { data: categories = [] } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: async () => {
      const { data } = await supabase.from("categories").select("*").order("sort_order");
      return data ?? [];
    },
  });

  const { data: ticker = [] } = useQuery({
    queryKey: ["admin-ticker"],
    queryFn: async () => {
      const { data } = await supabase.from("ticker_items").select("*").order("sort_order");
      return data ?? [];
    },
  });

  async function run(
    fn: () => Promise<{ error: { message: string } | null }>,
    keys: string[],
    msg: string,
    actionName?: string,
    entityType?: string,
    entityId?: string,
  ) {
    const { error } = await fn();
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(msg);
    if (actionName && entityType) {
      await logActivity({ action: actionName, entity_type: entityType, entity_id: entityId });
    }
    keys.forEach((k) => void qc.invalidateQueries({ queryKey: [k] }));
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl">Sections & ticker</h1>
        <p className="text-sm text-muted-foreground">
          Manage the navigation sections and the breaking-news ticker.
        </p>
      </div>

      <div className="rounded-xl border bg-card">
        <div className="border-b px-5 py-3">
          <h2 className="font-serif text-xl">Sections</h2>
        </div>
        <ul className="divide-y">
          {categories.map((c) => (
            <li key={c.id} className="flex items-center gap-3 px-5 py-3">
              <span className="flex-1 text-sm font-medium">{c.name}</span>
              <span className="meta text-muted-foreground">/{c.slug}</span>
              <label className="flex items-center gap-2 text-[13px]">
                <input
                  type="checkbox"
                  checked={c.is_visible}
                  onChange={(e) =>
                    void run(
                      async () =>
                        await supabase
                          .from("categories")
                          .update({ is_visible: e.target.checked })
                          .eq("id", c.id),
                      ["admin-categories"],
                      "Section updated",
                      "category.updated",
                      "category",
                      c.id,
                    )
                  }
                />
                Visible
              </label>
              <button
                aria-label={`Delete ${c.name}`}
                onClick={() => setDeleteCatTarget({ id: c.id, name: c.name })}
              >
                <Trash2 className="h-4 w-4 text-muted-foreground hover:text-crimson" />
              </button>
            </li>
          ))}
        </ul>
        <div className="flex gap-2 border-t px-5 py-3">
          <input
            className={field}
            placeholder="New section name"
            value={catName}
            onChange={(e) => setCatName(e.target.value)}
          />
          <button
            disabled={!catName.trim()}
            onClick={() =>
              void run(
                async () =>
                  await supabase.from("categories").insert({
                    name: catName.trim(),
                    slug: slugify(catName),
                    sort_order: categories.length,
                  }),
                ["admin-categories"],
                "Section added",
                "category.created",
                "category",
                catName.trim(),
              ).then(() => setCatName(""))
            }
            className="flex items-center gap-1.5 rounded-lg bg-crimson px-4 py-2 text-[13px] font-semibold text-crimson-foreground disabled:opacity-60"
          >
            <Plus className="h-3.5 w-3.5" /> Add
          </button>
        </div>
      </div>

      <div className="rounded-xl border bg-card">
        <div className="border-b px-5 py-3">
          <h2 className="font-serif text-xl">Breaking ticker</h2>
        </div>
        <ul className="divide-y">
          {ticker.map((t) => (
            <li key={t.id} className="flex items-center gap-3 px-5 py-3">
              <span className="min-w-0 flex-1 truncate text-sm">{t.text}</span>
              <label className="flex items-center gap-2 text-[13px]">
                <input
                  type="checkbox"
                  checked={t.is_active}
                  onChange={(e) =>
                    void run(
                      async () =>
                        await supabase
                          .from("ticker_items")
                          .update({ is_active: e.target.checked })
                          .eq("id", t.id),
                      ["admin-ticker"],
                      "Ticker updated",
                      "ticker.updated",
                      "ticker",
                      t.id,
                    )
                  }
                />
                Live
              </label>
              <button
                aria-label="Delete ticker item"
                onClick={() => setDeleteTickerTarget({ id: t.id, text: t.text })}
              >
                <Trash2 className="h-4 w-4 text-muted-foreground hover:text-crimson" />
              </button>
            </li>
          ))}
          {ticker.length === 0 && (
            <li className="px-5 py-8 text-center text-sm text-muted-foreground">
              No ticker items.
            </li>
          )}
        </ul>
        <div className="flex flex-wrap gap-2 border-t px-5 py-3">
          <input
            className={`${field} flex-1`}
            placeholder="Ticker headline"
            value={tickerText}
            onChange={(e) => setTickerText(e.target.value)}
          />
          <input
            className={`${field} sm:w-56`}
            placeholder="Link (optional)"
            value={tickerHref}
            onChange={(e) => setTickerHref(e.target.value)}
          />
          <button
            disabled={!tickerText.trim()}
            onClick={() =>
              void run(
                async () =>
                  await supabase.from("ticker_items").insert({
                    text: tickerText.trim(),
                    href: tickerHref || null,
                    sort_order: ticker.length,
                  }),
                ["admin-ticker"],
                "Ticker item added",
                "ticker.created",
                "ticker",
                tickerText.trim(),
              ).then(() => {
                setTickerText("");
                setTickerHref("");
              })
            }
            className="flex items-center gap-1.5 rounded-lg bg-crimson px-4 py-2 text-[13px] font-semibold text-crimson-foreground disabled:opacity-60"
          >
            <Plus className="h-3.5 w-3.5" /> Add
          </button>
        </div>
      </div>

      <ConfirmDialog
        open={Boolean(deleteCatTarget)}
        title="Delete Section"
        description={`Are you sure you want to delete category section "${deleteCatTarget?.name}"? Stories in this section will become unassigned.`}
        confirmText="Delete Section"
        onConfirm={() =>
          deleteCatTarget &&
          void run(
            async () => await supabase.from("categories").delete().eq("id", deleteCatTarget.id),
            ["admin-categories"],
            "Section deleted",
            "category.deleted",
            "category",
            deleteCatTarget.id,
          ).then(() => setDeleteCatTarget(null))
        }
        onCancel={() => setDeleteCatTarget(null)}
      />

      <ConfirmDialog
        open={Boolean(deleteTickerTarget)}
        title="Delete Ticker Headline"
        description={`Are you sure you want to delete breaking news headline "${deleteTickerTarget?.text}"?`}
        confirmText="Delete Ticker Item"
        onConfirm={() =>
          deleteTickerTarget &&
          void run(
            async () => await supabase.from("ticker_items").delete().eq("id", deleteTickerTarget.id),
            ["admin-ticker"],
            "Ticker item deleted",
            "ticker.deleted",
            "ticker",
            deleteTickerTarget.id,
          ).then(() => setDeleteTickerTarget(null))
        }
        onCancel={() => setDeleteTickerTarget(null)}
      />
    </div>
  );
}
