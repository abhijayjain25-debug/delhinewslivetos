import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CLc7pYlP.mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Plus, o as Trash2 } from "../_libs/lucide-react.mjs";
import { t as ConfirmDialog } from "./confirm-dialog-B_xx_KqF.mjs";
import { t as logActivity } from "./activity-log-DHOa81tS.mjs";
import { r as slugify } from "./format-BUTIADpu.mjs";
import { t as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sections-CscqHv4u.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var field = "w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-crimson";
function SectionsAndTicker() {
	const qc = useQueryClient();
	const [catName, setCatName] = (0, import_react.useState)("");
	const [tickerText, setTickerText] = (0, import_react.useState)("");
	const [tickerHref, setTickerHref] = (0, import_react.useState)("");
	const [deleteCatTarget, setDeleteCatTarget] = (0, import_react.useState)(null);
	const [deleteTickerTarget, setDeleteTickerTarget] = (0, import_react.useState)(null);
	const { data: categories = [] } = useQuery({
		queryKey: ["admin-categories"],
		queryFn: async () => {
			const { data } = await supabase.from("categories").select("*").order("sort_order");
			return data ?? [];
		}
	});
	const { data: ticker = [] } = useQuery({
		queryKey: ["admin-ticker"],
		queryFn: async () => {
			const { data } = await supabase.from("ticker_items").select("*").order("sort_order");
			return data ?? [];
		}
	});
	async function run(fn, keys, msg, actionName, entityType, entityId) {
		const { error } = await fn();
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success(msg);
		if (actionName && entityType) await logActivity({
			action: actionName,
			entity_type: entityType,
			entity_id: entityId
		});
		keys.forEach((k) => void qc.invalidateQueries({ queryKey: [k] }));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-3xl",
				children: "Sections & ticker"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Manage the navigation sections and the breaking-news ticker."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border bg-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-b px-5 py-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-serif text-xl",
							children: "Sections"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y",
						children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3 px-5 py-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex-1 text-sm font-medium",
									children: c.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "meta text-muted-foreground",
									children: ["/", c.slug]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center gap-2 text-[13px]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: c.is_visible,
										onChange: (e) => void run(async () => await supabase.from("categories").update({ is_visible: e.target.checked }).eq("id", c.id), ["admin-categories"], "Section updated", "category.updated", "category", c.id)
									}), "Visible"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									"aria-label": `Delete ${c.name}`,
									onClick: () => setDeleteCatTarget({
										id: c.id,
										name: c.name
									}),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-muted-foreground hover:text-crimson" })
								})
							]
						}, c.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 border-t px-5 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: field,
							placeholder: "New section name",
							value: catName,
							onChange: (e) => setCatName(e.target.value)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							disabled: !catName.trim(),
							onClick: () => void run(async () => await supabase.from("categories").insert({
								name: catName.trim(),
								slug: slugify(catName),
								sort_order: categories.length
							}), ["admin-categories"], "Section added", "category.created", "category", catName.trim()).then(() => setCatName("")),
							className: "flex items-center gap-1.5 rounded-lg bg-crimson px-4 py-2 text-[13px] font-semibold text-crimson-foreground disabled:opacity-60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " Add"]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border bg-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-b px-5 py-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-serif text-xl",
							children: "Breaking ticker"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "divide-y",
						children: [ticker.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3 px-5 py-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "min-w-0 flex-1 truncate text-sm",
									children: t.text
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center gap-2 text-[13px]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: t.is_active,
										onChange: (e) => void run(async () => await supabase.from("ticker_items").update({ is_active: e.target.checked }).eq("id", t.id), ["admin-ticker"], "Ticker updated", "ticker.updated", "ticker", t.id)
									}), "Live"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									"aria-label": "Delete ticker item",
									onClick: () => setDeleteTickerTarget({
										id: t.id,
										text: t.text
									}),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-muted-foreground hover:text-crimson" })
								})
							]
						}, t.id)), ticker.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "px-5 py-8 text-center text-sm text-muted-foreground",
							children: "No ticker items."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2 border-t px-5 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: `${field} flex-1`,
								placeholder: "Ticker headline",
								value: tickerText,
								onChange: (e) => setTickerText(e.target.value)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: `${field} sm:w-56`,
								placeholder: "Link (optional)",
								value: tickerHref,
								onChange: (e) => setTickerHref(e.target.value)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								disabled: !tickerText.trim(),
								onClick: () => void run(async () => await supabase.from("ticker_items").insert({
									text: tickerText.trim(),
									href: tickerHref || null,
									sort_order: ticker.length
								}), ["admin-ticker"], "Ticker item added", "ticker.created", "ticker", tickerText.trim()).then(() => {
									setTickerText("");
									setTickerHref("");
								}),
								className: "flex items-center gap-1.5 rounded-lg bg-crimson px-4 py-2 text-[13px] font-semibold text-crimson-foreground disabled:opacity-60",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " Add"]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: Boolean(deleteCatTarget),
				title: "Delete Section",
				description: `Are you sure you want to delete category section "${deleteCatTarget?.name}"? Stories in this section will become unassigned.`,
				confirmText: "Delete Section",
				onConfirm: () => deleteCatTarget && void run(async () => await supabase.from("categories").delete().eq("id", deleteCatTarget.id), ["admin-categories"], "Section deleted", "category.deleted", "category", deleteCatTarget.id).then(() => setDeleteCatTarget(null)),
				onCancel: () => setDeleteCatTarget(null)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: Boolean(deleteTickerTarget),
				title: "Delete Ticker Headline",
				description: `Are you sure you want to delete breaking news headline "${deleteTickerTarget?.text}"?`,
				confirmText: "Delete Ticker Item",
				onConfirm: () => deleteTickerTarget && void run(async () => await supabase.from("ticker_items").delete().eq("id", deleteTickerTarget.id), ["admin-ticker"], "Ticker item deleted", "ticker.deleted", "ticker", deleteTickerTarget.id).then(() => setDeleteTickerTarget(null)),
				onCancel: () => setDeleteTickerTarget(null)
			})
		]
	});
}
//#endregion
export { SectionsAndTicker as component };
