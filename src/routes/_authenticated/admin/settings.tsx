import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { logActivity } from "@/lib/activity-log";

export const Route = createFileRoute("/_authenticated/admin/settings")({
  component: SiteSettingsPage,
});

const field =
  "w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-crimson";

function SiteSettingsPage() {
  const qc = useQueryClient();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    default_theme: "light",
    logo_url: "",
    aqi: 168,
    aqi_label: "Moderate",
    temperature_c: 31,
    weather_label: "Haze",
  });

  const { data: settings } = useQuery({
    queryKey: ["admin-settings"],
    queryFn: async () => {
      const { data } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
      return data;
    },
  });

  useEffect(() => {
    if (!settings) return;
    setForm({
      default_theme: settings.default_theme,
      logo_url: settings.logo_url ?? "",
      aqi: settings.aqi,
      aqi_label: settings.aqi_label,
      temperature_c: settings.temperature_c,
      weather_label: settings.weather_label,
    });
  }, [settings]);

  async function save() {
    setSaving(true);
    const { error } = await supabase
      .from("site_settings")
      .update({ ...form, logo_url: form.logo_url || null })
      .eq("id", 1);
    setSaving(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Settings saved");
      await logActivity({
        action: "settings.updated",
        entity_type: "site_settings",
        entity_id: "1",
        details: form,
      });
      void qc.invalidateQueries({ queryKey: ["admin-settings"] });
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center">
        <div>
          <h1 className="font-serif text-3xl">Site settings</h1>
          <p className="text-sm text-muted-foreground">
            Brand, default theme and the Delhi live-conditions widget.
          </p>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="ml-auto rounded-full bg-crimson px-5 py-2 text-[13px] font-semibold text-crimson-foreground disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </div>

      <div className="grid gap-3 rounded-xl border bg-card p-5">
        <label className="text-sm text-muted-foreground">Default theme</label>
        <select
          className={field}
          value={form.default_theme}
          onChange={(e) => setForm({ ...form, default_theme: e.target.value })}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>

        <label className="mt-2 text-sm text-muted-foreground">Logo URL</label>
        <input
          className={field}
          placeholder="https://…"
          value={form.logo_url}
          onChange={(e) => setForm({ ...form, logo_url: e.target.value })}
        />
      </div>

      <div className="grid gap-3 rounded-xl border bg-card p-5 sm:grid-cols-2">
        <div>
          <label className="text-sm text-muted-foreground">AQI</label>
          <input
            type="number"
            className={field}
            value={form.aqi}
            onChange={(e) => setForm({ ...form, aqi: Number(e.target.value) })}
          />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">AQI label</label>
          <input
            className={field}
            value={form.aqi_label}
            onChange={(e) => setForm({ ...form, aqi_label: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Temperature (°C)</label>
          <input
            type="number"
            className={field}
            value={form.temperature_c}
            onChange={(e) => setForm({ ...form, temperature_c: Number(e.target.value) })}
          />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Weather label</label>
          <input
            className={field}
            value={form.weather_label}
            onChange={(e) => setForm({ ...form, weather_label: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
