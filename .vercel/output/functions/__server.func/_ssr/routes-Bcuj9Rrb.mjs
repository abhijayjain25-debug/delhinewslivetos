import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { L as ArrowRight, n as Wind, s as Thermometer, w as Flame, x as Layers } from "../_libs/lucide-react.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { a as SecondaryLeadCard, c as StandardCard, i as ScrollTop, l as TrendingRow, n as HeroCard, o as SiteFooter, r as OpinionCard, s as SiteHeader, t as CompactCard, u as VideoCard } from "./article-card-Dcz-5uqj.mjs";
import { t as Route } from "./routes-CJo6uaIn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Bcuj9Rrb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SectionHeading({ title, to, slug }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-5 flex items-center justify-between border-b-2 border-foreground/90 pb-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-4 w-1.5 bg-crimson" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-serif text-2xl md:text-3xl font-extrabold tracking-tight text-foreground uppercase",
				children: title
			})]
		}), (to || slug) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: slug ? "/category/$slug" : to,
			params: slug ? { slug } : void 0,
			className: "meta flex items-center gap-1 text-crimson hover:underline font-bold",
			children: [
				to || "View All",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3" })
			]
		})]
	});
}
function Home() {
	const { articles, categories, ticker, settings } = Route.useLoaderData();
	const [activeFilter, setActiveFilter] = (0, import_react.useState)("all");
	const lead = articles.find((a) => a.is_lead) ?? articles[0];
	const secondaries = articles.filter((a) => a.id !== lead?.id).slice(0, 2);
	const fastStream = articles.filter((a) => a.id !== lead?.id && !secondaries.includes(a)).slice(0, 4);
	const rest = articles.filter((a) => a.id !== lead?.id && !secondaries.includes(a) && !fastStream.includes(a));
	const filtered = (0, import_react.useMemo)(() => activeFilter === "all" ? rest.slice(0, 9) : rest.filter((a) => a.categories?.slug === activeFilter).slice(0, 9), [activeFilter, rest]);
	const delhi = articles.filter((a) => a.categories?.slug === "delhi-ncr").slice(0, 4);
	const trending = [...articles].sort((a, b) => b.views - a.views).slice(0, 5);
	const videos = articles.filter((a) => a.is_video).slice(0, 8);
	const opinion = articles.filter((a) => a.categories?.slug === "opinion").slice(0, 3);
	const hidden = settings?.hidden_modules ?? [];
	const order = settings?.module_order ?? [
		"hero",
		"categories",
		"top",
		"delhi",
		"trending",
		"video",
		"opinion",
		"sections",
		"newsletter"
	];
	const previewSections = categories.filter((c) => [
		"business",
		"sports",
		"entertainment",
		"tech",
		"politics",
		"crime"
	].includes(c.slug));
	const modules = {
		hero: settings?.hero_takeover_enabled && settings.hero_takeover_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-[1400px] px-4 pt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden rounded border border-border shadow-lift",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: settings.hero_takeover_url,
					alt: settings.hero_takeover_title ?? "Special coverage",
					className: "h-[420px] md:h-[480px] w-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-6 md:p-10 text-white",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "meta text-amber-400 mb-2 block font-black",
							children: "Special Coverage"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "max-w-4xl font-serif text-2xl md:text-4xl lg:text-5xl font-bold leading-tight",
							children: settings.hero_takeover_title
						}),
						settings.hero_takeover_dek && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-2xl text-sm md:text-base text-white/85 line-clamp-2",
							children: settings.hero_takeover_dek
						})
					]
				})]
			})
		}) : lead ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-[1400px] px-4 pt-5 md:pt-7",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-12 items-start news-rule pb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-7 lg:border-r border-border/80 lg:pr-6 pb-6 lg:pb-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroCard, { article: lead })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-5 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b-2 border-crimson pb-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "meta font-black text-crimson tracking-wider",
								children: "Top Newsroom Stories"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "meta text-muted-foreground text-[10px]",
								children: "Updated Live"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: secondaries.map((sec) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SecondaryLeadCard, { article: sec }, sec.id))
						}),
						fastStream.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-2 border-t border-border/80",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "meta text-muted-foreground block mb-2 font-bold text-[10px]",
								children: "Quick Read Headlines"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "divide-y divide-border/60",
								children: fastStream.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompactCard, { article: a }, a.id))
							})]
						})
					]
				})]
			})
		}) : null,
		categories: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-[1400px] px-4 pt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 border-b border-border pb-2.5 overflow-x-auto [scrollbar-width:none]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "meta text-muted-foreground shrink-0 font-extrabold mr-2 flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-3.5 w-3.5 text-crimson" }), "Filter Feed:"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterPill, {
						label: "All Stories",
						active: activeFilter === "all",
						onClick: () => setActiveFilter("all")
					}),
					categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterPill, {
						label: c.name,
						active: activeFilter === c.slug,
						onClick: () => setActiveFilter(c.slug)
					}, c.id))
				]
			})
		}),
		top: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-[1400px] px-4 pt-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 lg:grid-cols-12 items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, { title: "Top Headlines" }), filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-12 text-center text-sm text-muted-foreground",
						children: "No stories in this section yet."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
						children: filtered.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StandardCard, {
							article: a,
							index: i
						}, a.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "lg:col-span-4 lg:border-l lg:border-border lg:pl-6 space-y-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded border border-border bg-card p-4 shadow-rest",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b-2 border-crimson pb-2 mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-4 w-4 text-crimson" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-serif text-lg font-bold uppercase",
									children: "Most Read in Delhi"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "meta text-crimson text-[10px]",
								children: "Trending"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "divide-y divide-border/60",
							children: trending.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingRow, {
								article: a,
								rank: i + 1
							}, a.id))
						})]
					})
				})]
			})
		}),
		delhi: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mt-12 border-y border-border bg-secondary/40 py-10 md:py-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-[1400px] px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 flex flex-wrap items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "meta text-crimson font-extrabold tracking-widest",
						children: "Hyperlocal Pulse"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-serif text-2xl md:text-3xl font-extrabold uppercase",
						children: "Delhi / NCR Spotlight"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 rounded border border-border bg-card px-4 py-2.5 shadow-rest text-xs font-sans",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-7 w-7 place-items-center rounded bg-crimson/10 text-crimson",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wind, { className: "h-3.5 w-3.5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "meta text-muted-foreground text-[9px]",
									children: "Air Quality (AQI)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-bold text-foreground text-xs",
									children: [
										settings?.aqi ?? 168,
										" · ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-amber-600 dark:text-amber-400",
											children: settings?.aqi_label ?? "Moderate"
										})
									]
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-7 w-px bg-border" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-7 w-7 place-items-center rounded bg-crimson/10 text-crimson",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thermometer, { className: "h-3.5 w-3.5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "meta text-muted-foreground text-[9px]",
									children: "Temperature"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-bold text-foreground text-xs",
									children: [
										settings?.temperature_c ?? 31,
										"°C · ",
										settings?.weather_label ?? "Haze"
									]
								})] })]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
					children: delhi.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StandardCard, {
						article: a,
						index: i
					}, a.id))
				})]
			})
		}),
		trending: null,
		video: videos.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-[1400px] px-4 pt-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, { title: "Video & Visual Dispatches" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none]",
				children: videos.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoCard, { article: a }, a.id))
			})]
		}) : null,
		opinion: opinion.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-[1400px] px-4 pt-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				title: "Opinion & Editorials",
				slug: "opinion"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 md:grid-cols-3",
				children: opinion.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpinionCard, { article: a }, a.id))
			})]
		}) : null,
		sections: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-[1400px] px-4",
			children: previewSections.map((c) => {
				const items = articles.filter((a) => a.categories?.slug === c.slug).slice(0, 4);
				if (!items.length) return null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "pt-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
						title: c.name,
						slug: c.slug
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
						children: items.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StandardCard, {
							article: a,
							index: i
						}, a.id))
					})]
				}, c.id);
			})
		}),
		newsletter: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto mt-14 max-w-[1400px] px-4 mb-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded border border-border bg-card p-6 md:p-10 text-center shadow-lift max-w-3xl mx-auto border-t-4 border-t-crimson",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "meta text-crimson font-extrabold tracking-wider",
						children: "The Delhi News Brief"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-serif text-2xl md:text-3xl font-extrabold uppercase",
						children: "Delhi, decoded every morning"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-2 max-w-lg text-xs md:text-sm text-muted-foreground leading-relaxed",
						children: "Essential dispatches delivered straight from the Delhi News Live newsroom. Curated coverage of policy, city affairs, and regional updates."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mx-auto mt-5 flex max-w-md flex-col sm:flex-row gap-2",
						onSubmit: (e) => e.preventDefault(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							required: true,
							placeholder: "Enter your email address",
							className: "flex-1 rounded border border-border bg-background px-3.5 py-2 text-sm outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "rounded bg-crimson px-5 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all hover:opacity-95 shadow-sm",
							children: "Subscribe Free"
						})]
					})
				]
			})
		})
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {
				categories,
				ticker,
				articles,
				logoUrl: settings?.logo_url
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { children: order.filter((key) => !hidden.includes(key)).map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: modules[key] ?? null }, key)) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, { categories }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollTop, {})
		]
	});
}
function FilterPill({ label, active, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("shrink-0 rounded px-3 py-1 text-xs font-bold tracking-tight uppercase transition-all duration-150", active ? "bg-crimson text-crimson-foreground shadow-sm" : "text-foreground/80 hover:bg-muted hover:text-foreground border border-border/80"),
		children: label
	});
}
//#endregion
export { Home as component };
