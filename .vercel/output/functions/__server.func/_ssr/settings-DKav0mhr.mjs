import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CLc7pYlP.mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as logActivity } from "./activity-log-DHOa81tS.mjs";
import { t as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-DKav0mhr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var field = "w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-crimson";
function SiteSettingsPage() {
	const qc = useQueryClient();
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		default_theme: "light",
		logo_url: "",
		aqi: 168,
		aqi_label: "Moderate",
		temperature_c: 31,
		weather_label: "Haze"
	});
	const { data: settings } = useQuery({
		queryKey: ["admin-settings"],
		queryFn: async () => {
			const { data } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
			return data;
		}
	});
	(0, import_react.useEffect)(() => {
		if (!settings) return;
		setForm({
			default_theme: settings.default_theme,
			logo_url: settings.logo_url ?? "",
			aqi: settings.aqi,
			aqi_label: settings.aqi_label,
			temperature_c: settings.temperature_c,
			weather_label: settings.weather_label
		});
	}, [settings]);
	async function save() {
		setSaving(true);
		const { error } = await supabase.from("site_settings").update({
			...form,
			logo_url: form.logo_url || null
		}).eq("id", 1);
		setSaving(false);
		if (error) toast.error(error.message);
		else {
			toast.success("Settings saved");
			await logActivity({
				action: "settings.updated",
				entity_type: "site_settings",
				entity_id: "1",
				details: form
			});
			qc.invalidateQueries({ queryKey: ["admin-settings"] });
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-2xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-serif text-3xl",
					children: "Site settings"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Brand, default theme and the Delhi live-conditions widget."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: save,
					disabled: saving,
					className: "ml-auto rounded-full bg-crimson px-5 py-2 text-[13px] font-semibold text-crimson-foreground disabled:opacity-60",
					children: saving ? "Saving…" : "Save"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 rounded-xl border bg-card p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-sm text-muted-foreground",
						children: "Default theme"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: field,
						value: form.default_theme,
						onChange: (e) => setForm({
							...form,
							default_theme: e.target.value
						}),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "light",
							children: "Light"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "dark",
							children: "Dark"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Logo URL"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: field,
						placeholder: "https://…",
						value: form.logo_url,
						onChange: (e) => setForm({
							...form,
							logo_url: e.target.value
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 rounded-xl border bg-card p-5 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-sm text-muted-foreground",
						children: "AQI"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						className: field,
						value: form.aqi,
						onChange: (e) => setForm({
							...form,
							aqi: Number(e.target.value)
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-sm text-muted-foreground",
						children: "AQI label"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: field,
						value: form.aqi_label,
						onChange: (e) => setForm({
							...form,
							aqi_label: e.target.value
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-sm text-muted-foreground",
						children: "Temperature (°C)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						className: field,
						value: form.temperature_c,
						onChange: (e) => setForm({
							...form,
							temperature_c: Number(e.target.value)
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-sm text-muted-foreground",
						children: "Weather label"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: field,
						value: form.weather_label,
						onChange: (e) => setForm({
							...form,
							weather_label: e.target.value
						})
					})] })
				]
			})
		]
	});
}
//#endregion
export { SiteSettingsPage as component };
