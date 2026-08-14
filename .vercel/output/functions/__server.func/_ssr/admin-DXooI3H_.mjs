import { t as supabase } from "./client-CLc7pYlP.mjs";
import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DXooI3H_.js
var import_jsx_runtime = require_jsx_runtime();
function AdminOverview() {
	const { data } = useQuery({
		queryKey: ["admin-overview"],
		queryFn: async () => {
			const { data: articles } = await supabase.from("articles").select("id,title,slug,status,views,published_at").order("created_at", { ascending: false }).limit(200);
			return articles ?? [];
		}
	});
	const rows = data ?? [];
	const published = rows.filter((a) => a.status === "published").length;
	const drafts = rows.filter((a) => a.status === "draft").length;
	const views = rows.reduce((n, a) => n + (a.views ?? 0), 0);
	const stats = [
		{
			label: "Published",
			value: published
		},
		{
			label: "Drafts",
			value: drafts
		},
		{
			label: "Total views",
			value: views.toLocaleString("en-IN")
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-3xl",
				children: "Admin overview"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Everything running on the front page today."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-3",
				children: stats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border bg-card p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "meta text-muted-foreground",
						children: s.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-serif text-3xl",
						children: s.value
					})]
				}, s.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border bg-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b px-5 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-xl",
						children: "Recent stories"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin/articles",
						className: "text-[13px] text-crimson hover:underline",
						children: "Manage articles"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "divide-y",
					children: [rows.slice(0, 10).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3 px-5 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-0 flex-1 truncate text-sm",
							children: a.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "meta text-muted-foreground",
							children: a.status
						})]
					}, a.id)), rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "px-5 py-8 text-center text-sm text-muted-foreground",
						children: "No stories yet."
					})]
				})]
			})
		]
	});
}
//#endregion
export { AdminOverview as component };
