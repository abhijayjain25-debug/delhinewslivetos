import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { c as StandardCard, i as ScrollTop, n as HeroCard, o as SiteFooter, s as SiteHeader } from "./article-card-Dcz-5uqj.mjs";
import { t as Route } from "./category._slug-BUHppxiM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/category._slug-BBIuVhjJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CategoryPage() {
	const { category, articles, home } = Route.useLoaderData();
	const [sort, setSort] = (0, import_react.useState)("latest");
	const [limit, setLimit] = (0, import_react.useState)(12);
	const sorted = (0, import_react.useMemo)(() => {
		const list = [...articles];
		if (sort === "read") list.sort((a, b) => b.views - a.views);
		return list;
	}, [articles, sort]);
	const leadStory = sorted[0];
	const remainingStories = sorted.slice(1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {
				categories: home.categories,
				ticker: home.ticker,
				articles: home.articles,
				logoUrl: home.settings?.logo_url
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-[1400px] px-4 pt-6 md:pt-10 pb-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "border-b-2 border-foreground/90 pb-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "meta text-crimson font-extrabold tracking-wider uppercase",
								children: "Editorial Section"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-1 font-serif text-3xl md:text-5xl font-extrabold uppercase",
								children: category.name
							}),
							category.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-3xl text-sm md:text-base text-muted-foreground leading-relaxed font-sans",
								children: category.description
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex items-center justify-between border-b border-border pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "inline-flex gap-1 rounded border border-border bg-card p-1",
							children: ["latest", "read"].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSort(k),
								className: cn("rounded px-3 py-1 text-xs font-bold uppercase transition-colors", sort === k ? "bg-crimson text-crimson-foreground" : "text-foreground/80 hover:text-foreground"),
								children: k === "latest" ? "Latest Dispatches" : "Most Read"
							}, k))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "meta text-muted-foreground font-bold",
							children: [
								sorted.length,
								" ",
								sorted.length === 1 ? "Story" : "Stories"
							]
						})]
					}),
					sorted.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-20 text-center text-sm text-muted-foreground font-serif italic",
						children: "No published stories in this section yet."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-8 mt-6",
						children: [leadStory && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "border-b border-border pb-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroCard, { article: leadStory })
						}), remainingStories.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
							children: remainingStories.slice(0, limit - 1).map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StandardCard, {
								article: a,
								index: i
							}, a.id))
						}), limit - 1 < remainingStories.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 text-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setLimit((l) => l + 12),
								className: "rounded border border-border bg-card px-5 py-2 text-xs font-bold uppercase tracking-wider hover:border-crimson hover:text-crimson shadow-sm transition-colors",
								children: "Load More Stories"
							})
						})] })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, { categories: home.categories }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollTop, {})
		]
	});
}
//#endregion
export { CategoryPage as component };
