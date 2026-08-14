import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Clock, F as Bookmark, P as Calendar, d as Share2, j as ChevronRight, m as Printer } from "../_libs/lucide-react.mjs";
import { t as fullDate } from "./format-BUTIADpu.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as Route } from "./article._slug-jNLGhq0g.mjs";
import { c as StandardCard, i as ScrollTop, o as SiteFooter, s as SiteHeader, t as CompactCard } from "./article-card-Dcz-5uqj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/article._slug-DID-465u.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ArticlePage() {
	const { article, related, home } = Route.useLoaderData();
	const [progress, setProgress] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const onScroll = () => {
			const h = document.body.scrollHeight - window.innerHeight;
			setProgress(h > 0 ? Math.min(100, window.scrollY / h * 100) : 0);
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	const paragraphs = article.body.split(/\n\s*\n/).filter(Boolean);
	function handleShare() {
		if (typeof navigator !== "undefined" && navigator.share) navigator.share({
			title: article.title,
			url: window.location.href
		});
		else {
			navigator.clipboard.writeText(window.location.href);
			toast.success("Story link copied to clipboard!");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {
				categories: home.categories,
				ticker: home.ticker,
				articles: home.articles,
				logoUrl: home.settings?.logo_url
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed left-0 top-0 z-[70] h-1 bg-crimson transition-[width] duration-150",
				style: { width: `${progress}%` }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-[1400px] px-4 pt-6 md:pt-10 pb-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "mb-5 flex items-center gap-1.5 text-xs text-muted-foreground font-sans",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "hover:text-crimson font-semibold transition-colors",
								children: "Front Page"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3" }),
							article.categories && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/category/$slug",
								params: { slug: article.categories.slug },
								className: "hover:text-crimson font-semibold transition-colors uppercase",
								children: article.categories.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate text-foreground font-bold max-w-[200px] sm:max-w-md",
								children: article.title
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-10 lg:grid-cols-12 items-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "lg:col-span-8 max-w-[820px]",
							children: [
								article.categories && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "meta text-crimson font-extrabold tracking-wider uppercase",
									children: [article.categories.name, " Dispatch"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "mt-2 font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.12] tracking-tight text-foreground",
									children: article.title
								}),
								article.dek && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-base md:text-lg leading-relaxed text-muted-foreground font-sans border-l-4 border-crimson pl-4 py-1 italic",
									children: article.dek
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-5 flex flex-wrap items-center justify-between gap-4 border-y border-border py-3 text-xs text-muted-foreground font-sans",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid h-8 w-8 place-items-center rounded bg-crimson text-white font-bold text-xs uppercase shadow-sm",
											children: article.author_name.charAt(0)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-bold text-foreground text-xs",
											children: article.author_name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[11px] flex items-center gap-2 mt-0.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center gap-1 font-medium",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3 w-3 text-crimson" }), fullDate(article.published_at)]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center gap-1 font-medium",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3 text-muted-foreground" }),
														article.read_minutes,
														" min read"
													]
												})
											]
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: handleShare,
												className: "flex items-center gap-1.5 rounded border border-border px-3 py-1.5 text-xs font-bold hover:border-crimson hover:text-crimson transition-colors",
												title: "Share story",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-3.5 w-3.5 text-crimson" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Share" })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => window.print(),
												className: "flex items-center gap-1.5 rounded border border-border px-3 py-1.5 text-xs font-bold hover:border-crimson hover:text-crimson transition-colors",
												title: "Print story",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "hidden sm:inline",
													children: "Print"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => toast.success("Story bookmarked!"),
												className: "grid h-8 w-8 place-items-center rounded border border-border hover:border-crimson hover:text-crimson transition-colors",
												title: "Bookmark",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "h-3.5 w-3.5" })
											})
										]
									})]
								}),
								article.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
									className: "mt-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: article.image_url,
										alt: article.title,
										className: "w-full rounded object-cover border border-border shadow-lift"
									}), article.image_caption && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
										className: "mt-2 text-xs text-muted-foreground italic text-center font-sans",
										children: article.image_caption
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-7 space-y-6 text-base md:text-lg leading-relaxed text-foreground/95 font-sans",
									children: paragraphs.map((para, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: i === 0 ? "drop-cap" : "",
											children: para
										}),
										article.pull_quote && i === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
											className: "my-6 border-l-4 border-crimson bg-secondary/40 p-5 rounded-r font-serif text-xl md:text-2xl italic font-extrabold leading-snug text-foreground",
											children: [
												"“",
												article.pull_quote,
												"”"
											]
										}),
										related[0] && i === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
											className: "my-6 rounded border border-border bg-card p-4 shadow-rest",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "meta text-crimson font-extrabold block mb-1",
												children: "Related Newsroom Dispatch"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompactCard, { article: related[0] })]
										})
									] }, i))
								}),
								article.tags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-8 flex flex-wrap items-center gap-2 pt-5 border-t border-border",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "meta text-muted-foreground mr-1",
										children: "Filed Under:"
									}), article.tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "rounded border border-border bg-secondary/60 px-2.5 py-1 text-xs font-bold text-foreground/80 hover:border-crimson hover:text-crimson transition-colors",
										children: ["#", t]
									}, t))]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
							className: "lg:col-span-4 lg:border-l lg:border-border lg:pl-6 space-y-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded border border-border bg-card p-4 shadow-rest",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "border-b-2 border-crimson pb-2 mb-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "font-serif text-lg font-bold uppercase",
										children: ["More in ", article.categories?.name ?? "News"]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "divide-y divide-border/60",
									children: related.slice(0, 5).map((rel) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompactCard, { article: rel }, rel.id))
								})]
							})
						})]
					}),
					related.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-14 pt-8 border-t-2 border-foreground/90",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-5 flex items-center justify-between",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-serif text-2xl md:text-3xl font-extrabold uppercase",
								children: "Further Reading"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
							children: related.slice(0, 4).map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StandardCard, {
								article: a,
								index: i
							}, a.id))
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, { categories: home.categories }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollTop, {})
		]
	});
}
//#endregion
export { ArticlePage as component };
