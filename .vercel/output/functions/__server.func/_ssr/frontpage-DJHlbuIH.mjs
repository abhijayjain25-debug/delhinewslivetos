import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CLc7pYlP.mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { D as EyeOff, E as Eye, I as ArrowUp, R as ArrowDown } from "../_libs/lucide-react.mjs";
import { t as logActivity } from "./activity-log-DHOa81tS.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/frontpage-DJHlbuIH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LABELS = {
	hero: "Lead hero",
	categories: "Section strip",
	top: "Top stories",
	delhi: "Delhi-NCR spotlight",
	trending: "Trending now",
	video: "Video rail",
	opinion: "Opinion",
	sections: "Section blocks",
	newsletter: "Newsletter"
};
var DEFAULT_ORDER = Object.keys(LABELS);
function FrontPageBuilder() {
	const qc = useQueryClient();
	const [order, setOrder] = (0, import_react.useState)(DEFAULT_ORDER);
	const [hidden, setHidden] = (0, import_react.useState)([]);
	const [takeover, setTakeover] = (0, import_react.useState)({
		hero_takeover_enabled: false,
		hero_takeover_title: "",
		hero_takeover_dek: "",
		hero_takeover_url: ""
	});
	const [saving, setSaving] = (0, import_react.useState)(false);
	const { data: settings } = useQuery({
		queryKey: ["admin-settings"],
		queryFn: async () => {
			const { data } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
			return data;
		}
	});
	(0, import_react.useEffect)(() => {
		if (!settings) return;
		setOrder(settings.module_order?.length ? settings.module_order : DEFAULT_ORDER);
		setHidden(settings.hidden_modules ?? []);
		setTakeover({
			hero_takeover_enabled: settings.hero_takeover_enabled,
			hero_takeover_title: settings.hero_takeover_title ?? "",
			hero_takeover_dek: settings.hero_takeover_dek ?? "",
			hero_takeover_url: settings.hero_takeover_url ?? ""
		});
	}, [settings]);
	function move(index, dir) {
		const next = [...order];
		const target = index + dir;
		if (target < 0 || target >= next.length) return;
		const a = next[index];
		next[index] = next[target];
		next[target] = a;
		setOrder(next);
	}
	async function save() {
		setSaving(true);
		const { error } = await supabase.from("site_settings").update({
			module_order: order,
			hidden_modules: hidden,
			hero_takeover_enabled: takeover.hero_takeover_enabled,
			hero_takeover_title: takeover.hero_takeover_title || null,
			hero_takeover_dek: takeover.hero_takeover_dek || null,
			hero_takeover_url: takeover.hero_takeover_url || null
		}).eq("id", 1);
		setSaving(false);
		if (error) toast.error(error.message);
		else {
			toast.success("Front page updated");
			await logActivity({
				action: "frontpage.updated",
				entity_type: "settings",
				entity_id: "1",
				details: {
					module_order: order,
					hidden_modules: hidden
				}
			});
			qc.invalidateQueries({ queryKey: ["admin-settings"] });
		}
	}
	const field = "w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-crimson";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-serif text-3xl",
					children: "Front page builder"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Reorder or hide modules on the home page."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: save,
					disabled: saving,
					className: "ml-auto rounded-full bg-crimson px-5 py-2 text-[13px] font-semibold text-crimson-foreground disabled:opacity-60",
					children: saving ? "Saving…" : "Save layout"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y",
					children: order.map((key, i) => {
						const isHidden = hidden.includes(key);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3 px-4 py-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "meta w-6 text-muted-foreground",
									children: i + 1
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("flex-1 text-sm", isHidden && "text-muted-foreground line-through"),
									children: LABELS[key] ?? key
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => move(i, -1),
									"aria-label": "Move up",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "h-4 w-4 text-muted-foreground hover:text-crimson" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => move(i, 1),
									"aria-label": "Move down",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "h-4 w-4 text-muted-foreground hover:text-crimson" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setHidden(isHidden ? hidden.filter((h) => h !== key) : [...hidden, key]),
									"aria-label": isHidden ? "Show module" : "Hide module",
									children: isHidden ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4 text-muted-foreground hover:text-crimson" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4 text-crimson" })
								})
							]
						}, key);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 rounded-xl border bg-card p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-xl",
						children: "Hero takeover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: takeover.hero_takeover_enabled,
							onChange: (e) => setTakeover({
								...takeover,
								hero_takeover_enabled: e.target.checked
							})
						}), "Enable takeover banner"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: field,
						placeholder: "Takeover headline",
						value: takeover.hero_takeover_title,
						onChange: (e) => setTakeover({
							...takeover,
							hero_takeover_title: e.target.value
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: field,
						placeholder: "Takeover standfirst",
						value: takeover.hero_takeover_dek,
						onChange: (e) => setTakeover({
							...takeover,
							hero_takeover_dek: e.target.value
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: field,
						placeholder: "Takeover link URL",
						value: takeover.hero_takeover_url,
						onChange: (e) => setTakeover({
							...takeover,
							hero_takeover_url: e.target.value
						})
					})
				]
			})
		]
	});
}
//#endregion
export { FrontPageBuilder as component };
