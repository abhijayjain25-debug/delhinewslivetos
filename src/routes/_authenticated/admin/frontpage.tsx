import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowDown, ArrowUp, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { logActivity } from "@/lib/activity-log";

export const Route = createFileRoute("/_authenticated/admin/frontpage")({
  component: FrontPageBuilder,
});

const LABELS: Record<string, string> = {
  hero: "Lead hero",
  categories: "Section strip",
  top: "Top stories",
  delhi: "Delhi-NCR spotlight",
  trending: "Trending now",
  video: "Video rail",
  opinion: "Opinion",
  sections: "Section blocks",
  newsletter: "Newsletter",
};

const DEFAULT_ORDER = Object.keys(LABELS);

function FrontPageBuilder() {
  const qc = useQueryClient();
  const [order, setOrder] = useState<string[]>(DEFAULT_ORDER);
  const [hidden, setHidden] = useState<string[]>([]);
  const [takeover, setTakeover] = useState({
    hero_takeover_enabled: false,
    hero_takeover_title: "",
    hero_takeover_dek: "",
    hero_takeover_url: "",
  });
  const [saving, setSaving] = useState(false);

  const { data: settings } = useQuery({
    queryKey: ["admin-settings"],
    queryFn: async () => {
      const { data } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
      return data;
    },
  });

  useEffect(() => {
    if (!settings) return;
    setOrder(settings.module_order?.length ? settings.module_order : DEFAULT_ORDER);
    setHidden(settings.hidden_modules ?? []);
    setTakeover({
      hero_takeover_enabled: settings.hero_takeover_enabled,
      hero_takeover_title: settings.hero_takeover_title ?? "",
      hero_takeover_dek: settings.hero_takeover_dek ?? "",
      hero_takeover_url: settings.hero_takeover_url ?? "",
    });
  }, [settings]);

  function move(index: number, dir: -1 | 1) {
    const next = [...order];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    const a = next[index]!;
    const b = next[target]!;
    next[index] = b;
    next[target] = a;
    setOrder(next);
  }

  async function save() {
    setSaving(true);
    const { error } = await supabase
      .from("site_settings")
      .update({
        module_order: order,
        hidden_modules: hidden,
        hero_takeover_enabled: takeover.hero_takeover_enabled,
        hero_takeover_title: takeover.hero_takeover_title || null,
        hero_takeover_dek: takeover.hero_takeover_dek || null,
        hero_takeover_url: takeover.hero_takeover_url || null,
      })
      .eq("id", 1);
    setSaving(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Front page updated");
      await logActivity({
        action: "frontpage.updated",
        entity_type: "settings",
        entity_id: "1",
        details: { module_order: order, hidden_modules: hidden },
      });
      void qc.invalidateQueries({ queryKey: ["admin-settings"] });
    }
  }

  const field =
    "w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-crimson";

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <div>
          <h1 className="font-serif text-3xl">Front page builder</h1>
          <p className="text-sm text-muted-foreground">
            Reorder or hide modules on the home page.
          </p>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="ml-auto rounded-full bg-crimson px-5 py-2 text-[13px] font-semibold text-crimson-foreground disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save layout"}
        </button>
      </div>

      <div className="rounded-xl border bg-card">
        <ul className="divide-y">
          {order.map((key, i) => {
            const isHidden = hidden.includes(key);
            return (
              <li key={key} className="flex items-center gap-3 px-4 py-3">
                <span className="meta w-6 text-muted-foreground">{i + 1}</span>
                <span className={cn("flex-1 text-sm", isHidden && "text-muted-foreground line-through")}>
                  {LABELS[key] ?? key}
                </span>
                <button onClick={() => move(i, -1)} aria-label="Move up">
                  <ArrowUp className="h-4 w-4 text-muted-foreground hover:text-crimson" />
                </button>
                <button onClick={() => move(i, 1)} aria-label="Move down">
                  <ArrowDown className="h-4 w-4 text-muted-foreground hover:text-crimson" />
                </button>
                <button
                  onClick={() =>
                    setHidden(isHidden ? hidden.filter((h) => h !== key) : [...hidden, key])
                  }
                  aria-label={isHidden ? "Show module" : "Hide module"}
                >
                  {isHidden ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground hover:text-crimson" />
                  ) : (
                    <Eye className="h-4 w-4 text-crimson" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="space-y-3 rounded-xl border bg-card p-5">
        <h2 className="font-serif text-xl">Hero takeover</h2>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={takeover.hero_takeover_enabled}
            onChange={(e) =>
              setTakeover({ ...takeover, hero_takeover_enabled: e.target.checked })
            }
          />
          Enable takeover banner
        </label>
        <input
          className={field}
          placeholder="Takeover headline"
          value={takeover.hero_takeover_title}
          onChange={(e) => setTakeover({ ...takeover, hero_takeover_title: e.target.value })}
        />
        <input
          className={field}
          placeholder="Takeover standfirst"
          value={takeover.hero_takeover_dek}
          onChange={(e) => setTakeover({ ...takeover, hero_takeover_dek: e.target.value })}
        />
        <input
          className={field}
          placeholder="Takeover link URL"
          value={takeover.hero_takeover_url}
          onChange={(e) => setTakeover({ ...takeover, hero_takeover_url: e.target.value })}
        />
      </div>
    </div>
  );
}
