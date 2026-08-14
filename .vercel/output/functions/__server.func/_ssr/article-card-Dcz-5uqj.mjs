import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Link, l as useLocation } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Clock, I as ArrowUp, P as Calendar, _ as Moon, g as Play, k as CloudSun, l as Sun, p as Search, t as X, u as Shield, v as Menu } from "../_libs/lucide-react.mjs";
import { i as timeAgo } from "./format-BUTIADpu.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Masthead } from "./masthead-D2aBLNWB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/article-card-Dcz-5uqj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KEY = "dnl-theme";
function useTheme() {
	const [theme, setTheme] = (0, import_react.useState)("light");
	(0, import_react.useEffect)(() => {
		const initial = localStorage.getItem(KEY) ?? null ?? (document.documentElement.classList.contains("dark") ? "dark" : "light");
		setTheme(initial);
		document.documentElement.classList.toggle("dark", initial === "dark");
	}, []);
	const toggle = () => {
		setTheme((prev) => {
			const next = prev === "dark" ? "light" : "dark";
			localStorage.setItem(KEY, next);
			document.documentElement.classList.toggle("dark", next === "dark");
			return next;
		});
	};
	return {
		theme,
		toggle
	};
}
function ThemeToggle() {
	const { theme, toggle } = useTheme();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: toggle,
		"aria-label": "Toggle colour theme",
		className: "grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
		children: theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-4 w-4" })
	});
}
function BreakingTicker({ items }) {
	if (!items.length) return null;
	const loop = [
		...items,
		...items,
		...items
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "border-b border-crimson/20 bg-crimson/[0.04] dark:bg-crimson/10 text-sm py-2 overflow-hidden select-none",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-[1400px] items-center gap-3 px-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5 shrink-0 rounded bg-crimson px-2.5 py-0.5 text-crimson-foreground shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-white animate-live" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "meta text-[10px] font-extrabold tracking-wider uppercase text-white",
					children: "Breaking News"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "group relative flex-1 overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex w-max gap-10 animate-marquee group-hover:[animation-play-state:paused]",
					children: loop.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: item.href ?? "#",
						className: "inline-flex items-center whitespace-nowrap text-xs md:text-sm font-semibold text-foreground/90 transition-colors hover:text-crimson",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mr-2 text-crimson font-black",
							children: "LATEST ///"
						}), item.text]
					}, `${item.id}-${i}`))
				})
			})]
		})
	});
}
function SiteHeader({ categories, ticker, articles = [], logoUrl }) {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const location = useLocation();
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 30);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.key === "Escape") {
				setSearchOpen(false);
				setMenuOpen(false);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	const primary = categories.slice(0, 9);
	const more = categories.slice(9);
	const results = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		if (!q) return [];
		return articles.filter((a) => a.title.toLowerCase().includes(q) || (a.dek ?? "").toLowerCase().includes(q) || a.tags.some((t) => t.toLowerCase().includes(q))).slice(0, 6);
	}, [query, articles]);
	const formattedDate = (0, import_react.useMemo)(() => {
		return (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric"
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-b border-border/70 bg-secondary/50 text-xs font-sans text-muted-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex h-9 max-w-[1400px] items-center justify-between px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5 font-semibold text-foreground/90 text-[11px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3.5 w-3.5 text-crimson" }), formattedDate]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline-block text-border/80",
							children: "•"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "hidden sm:flex items-center gap-1 font-bold uppercase tracking-wider text-muted-foreground text-[10px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudSun, { className: "h-3.5 w-3.5 text-amber-600 dark:text-amber-400" }), "Delhi NCR Edition"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setSearchOpen(true),
							className: "flex items-center gap-1.5 font-semibold text-foreground/80 hover:text-crimson transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline",
								children: "Search News"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-border/80",
							children: "•"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-border/80",
							children: "•"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin",
							className: "flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground hover:text-crimson transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-3 w-3 text-crimson" }), "Newsroom Admin"]
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "relative bg-background border-b border-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-[1400px] px-4 py-4 md:py-5 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "grid h-9 w-9 place-items-center rounded border border-border text-muted-foreground hover:bg-accent hover:text-foreground lg:hidden",
							onClick: () => setMenuOpen((v) => !v),
							"aria-label": "Open menu",
							children: menuOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Masthead, {
							logoUrl,
							compact: false
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden md:flex items-center gap-6 text-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-r border-border/80 pr-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "meta text-crimson",
								children: "Live Weather"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-serif text-sm font-bold text-foreground",
								children: "31°C · Haze"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "meta text-crimson",
							children: "Delhi AQI"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-serif text-sm font-bold text-amber-600 dark:text-amber-400",
							children: "168 · Moderate"
						})] })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("sticky top-0 z-40 border-t-2 border-b border-foreground/90 bg-background/98 backdrop-blur transition-all duration-200", scrolled ? "shadow-md py-1" : "py-1.5"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex max-w-[1400px] items-center justify-between px-4 overflow-x-auto [scrollbar-width:none]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "flex items-center gap-1 shrink-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									activeOptions: { exact: true },
									className: cn("px-3 py-1.5 text-xs md:text-sm font-bold tracking-tight transition-colors uppercase", location.pathname === "/" ? "bg-crimson text-crimson-foreground" : "text-foreground/90 hover:bg-muted hover:text-crimson"),
									children: "Front Page"
								}),
								primary.map((c) => {
									const isActive = location.pathname === `/category/${c.slug}`;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/category/$slug",
										params: { slug: c.slug },
										className: cn("px-3 py-1.5 text-xs md:text-sm font-bold tracking-tight transition-colors whitespace-nowrap uppercase", isActive ? "bg-crimson text-crimson-foreground" : "text-foreground/80 hover:bg-muted hover:text-crimson"),
										children: c.name
									}, c.id);
								}),
								more.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "group relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "px-3 py-1.5 text-xs md:text-sm font-bold uppercase tracking-tight text-foreground/80 hover:text-crimson",
										children: "More Sections ▾"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "invisible absolute left-0 top-full w-52 translate-y-1 border-2 border-border bg-popover p-1.5 shadow-float transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 z-50",
										children: more.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/category/$slug",
											params: { slug: c.slug },
											className: "block px-3 py-2 text-xs font-bold uppercase tracking-wider text-foreground/80 hover:bg-muted hover:text-crimson",
											children: c.name
										}, c.id))
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setSearchOpen(true),
							className: "ml-3 shrink-0 rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground",
							"aria-label": "Search articles",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4" })
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BreakingTicker, { items: ticker }),
				menuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "animate-rise border-b bg-background px-4 py-4 lg:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							onClick: () => setMenuOpen(false),
							className: "rounded-md px-3 py-2 text-sm font-medium hover:bg-accent",
							children: "Home"
						}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/category/$slug",
							params: { slug: c.slug },
							onClick: () => setMenuOpen(false),
							className: "rounded-md px-3 py-2 text-sm font-medium hover:bg-accent",
							children: c.name
						}, c.id))]
					})
				})
			]
		}),
		searchOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-[60] bg-black/40 px-4 pt-20 backdrop-blur-sm",
			onClick: () => setSearchOpen(false),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-2xl animate-rise rounded-xl border border-border bg-card p-5 shadow-float",
				onClick: (e) => e.stopPropagation(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 border-b pb-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-5 w-5 text-crimson" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							autoFocus: true,
							value: query,
							onChange: (e) => setQuery(e.target.value),
							placeholder: "Search Delhi News Live stories, topics, places...",
							className: "w-full bg-transparent text-lg outline-none placeholder:text-muted-foreground font-serif"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSearchOpen(false),
							"aria-label": "Close search",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5 text-muted-foreground hover:text-foreground" })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pt-4",
					children: query.trim() === "" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "meta mb-2.5 text-muted-foreground",
						children: "Popular Topics"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							"Delhi Metro Phase 4",
							"Yamuna Water Level",
							"Delhi Air Quality",
							"RBI Policy",
							"Noida AI Plant",
							"Cricket"
						].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setQuery(t),
							className: "rounded-md border bg-secondary/50 px-3 py-1 text-xs font-semibold text-foreground/80 hover:border-crimson hover:text-crimson",
							children: t
						}, t))
					})] }) : results.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "py-8 text-center text-sm text-muted-foreground",
						children: [
							"No stories found matching “",
							query,
							"”."
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y divide-border/60",
						children: results.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/article/$slug",
							params: { slug: a.slug },
							onClick: () => setSearchOpen(false),
							className: "block py-3 hover:text-crimson group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "meta text-crimson",
								children: a.categories?.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-serif text-base font-semibold leading-snug group-hover:text-crimson",
								children: a.title
							})]
						}) }, a.id))
					})
				})]
			})
		})
	] });
}
function SiteFooter({ categories }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "mt-16 border-t-4 border-foreground/90 bg-secondary/50 text-foreground font-sans",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1400px] px-4 py-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 md:grid-cols-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-4 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Masthead, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground leading-relaxed max-w-sm",
								children: "Delhi News Live is an independent digital publication covering hyperlocal Delhi-NCR affairs, national policy, global dispatches, business, tech, culture, and opinion."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "meta text-crimson font-black tracking-wider text-[10px]",
								children: "DELHI NCR EDITION • DIGITAL NEWSROOM"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "meta mb-3 text-crimson font-black uppercase",
							children: "News Sections"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "grid grid-cols-2 gap-2 text-xs font-bold uppercase",
							children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/category/$slug",
								params: { slug: c.slug },
								className: "text-foreground/80 hover:text-crimson transition-colors",
								children: c.name
							}) }, c.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "meta mb-3 text-crimson font-black uppercase",
							children: "Newsroom"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "space-y-1.5 text-xs font-bold uppercase text-foreground/80",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "hover:text-crimson cursor-pointer transition-colors",
									children: "About Us"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "hover:text-crimson cursor-pointer transition-colors",
									children: "Editorial Code"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "hover:text-crimson cursor-pointer transition-colors",
									children: "Corrections"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "hover:text-crimson cursor-pointer transition-colors",
									children: "Careers"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "hover:text-crimson cursor-pointer transition-colors",
									children: "Contact Desk"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "meta mb-3 text-crimson font-black uppercase",
								children: "Access & Policies"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "space-y-1.5 text-xs font-bold uppercase text-foreground/80 mb-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										className: "hover:text-crimson cursor-pointer transition-colors",
										children: "Privacy Policy"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										className: "hover:text-crimson cursor-pointer transition-colors",
										children: "Terms of Service"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										className: "hover:text-crimson cursor-pointer transition-colors",
										children: "Cookie Settings"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin",
								className: "inline-block rounded border border-border bg-card px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-foreground hover:border-crimson hover:text-crimson shadow-xs transition-colors",
								children: "Staff Newsroom Sign In →"
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 flex flex-col gap-2 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between font-sans",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" Delhi News Live. All rights reserved."
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-foreground uppercase text-[11px]",
							children: "English Edition"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hover:text-crimson cursor-pointer font-bold text-[11px]",
							children: "हिन्दी (Hindi)"
						})
					]
				})]
			})]
		})
	});
}
function ScrollTop() {
	const [show, setShow] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setShow(window.scrollY > 800);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": "Back to top",
		onClick: () => window.scrollTo({
			top: 0,
			behavior: "smooth"
		}),
		className: `glass fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full border shadow-float transition-all duration-500 ${show ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "h-4 w-4" })
	});
}
function CategoryTag({ name, gold }) {
	if (!name) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("meta inline-block font-extrabold tracking-wider text-[10px] uppercase", gold ? "text-amber-600 dark:text-amber-400" : "text-crimson"),
		children: name
	});
}
function Meta({ article }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "meta text-muted-foreground/80 flex items-center gap-2 flex-wrap text-[10px] font-sans",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-bold text-foreground/80",
				children: article.author_name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: timeAgo(article.published_at) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }),
					article.read_minutes,
					" min read"
				]
			})
		]
	});
}
function HeroCard({ article }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
		className: "group animate-rise",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/article/$slug",
			params: { slug: article.slug },
			className: "block",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden rounded bg-muted border border-border",
				children: [article.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: article.image_url,
					alt: article.title,
					loading: "eager",
					className: "aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute top-3 left-3 z-10 flex items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded bg-crimson px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-sm",
						children: "TOP STORY"
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pt-4 space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryTag, { name: article.categories?.name })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-[1.15] tracking-tight text-foreground transition-colors group-hover:text-crimson",
						children: article.title
					}),
					article.dek && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm md:text-base leading-relaxed text-muted-foreground font-sans line-clamp-3",
						children: article.dek
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pt-2 border-t border-border/50",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, { article })
					})
				]
			})]
		})
	});
}
function SecondaryLeadCard({ article }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
		className: "group animate-rise border-b border-border/80 pb-4 last:border-b-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/article/$slug",
			params: { slug: article.slug },
			className: "flex flex-col sm:flex-row gap-3.5",
			children: [article.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sm:w-2/5 shrink-0 overflow-hidden rounded bg-muted border border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: article.image_url,
					alt: article.title,
					loading: "lazy",
					className: "aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 min-w-0 space-y-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryTag, {
						name: article.categories?.name,
						gold: article.is_featured
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-lg font-bold leading-snug transition-colors group-hover:text-crimson line-clamp-2",
						children: article.title
					}),
					article.dek && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground line-clamp-2 leading-relaxed",
						children: article.dek
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "meta text-muted-foreground/70 pt-1",
						children: timeAgo(article.published_at)
					})
				]
			})]
		})
	});
}
function CompactCard({ article }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
		className: "group py-2.5 border-b border-border/60 last:border-b-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/article/$slug",
			params: { slug: article.slug },
			className: "flex gap-3 items-start justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryTag, { name: article.categories?.name }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-0.5 font-serif text-sm md:text-base font-bold leading-snug transition-colors group-hover:text-crimson line-clamp-2",
						children: article.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "meta mt-1 text-muted-foreground/70 text-[10px]",
						children: timeAgo(article.published_at)
					})
				]
			}), article.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-14 w-18 md:h-16 md:w-20 shrink-0 overflow-hidden rounded bg-muted border border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: article.image_url,
					alt: article.title,
					loading: "lazy",
					className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
				})
			})]
		})
	});
}
function TrendingRow({ article, rank }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
		className: "group py-3 border-b border-border/60 last:border-b-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/article/$slug",
			params: { slug: article.slug },
			className: "flex gap-3.5 items-start",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-serif text-xl font-black text-crimson shrink-0 w-6 text-center leading-none mt-0.5",
				children: String(rank).padStart(2, "0")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryTag, { name: article.categories?.name }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-0.5 font-serif text-sm md:text-base font-bold leading-snug transition-colors group-hover:text-crimson line-clamp-2",
						children: article.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "meta mt-1 text-muted-foreground/70 text-[10px]",
						children: timeAgo(article.published_at)
					})
				]
			})]
		})
	});
}
function OpinionCard({ article }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
		className: "group p-4 border-l-4 border-crimson bg-card rounded-r border-y border-r border-border news-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/article/$slug",
			params: { slug: article.slug },
			className: "block",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "meta text-amber-600 dark:text-amber-400 font-extrabold",
					children: "Opinion & Analysis"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "mt-1.5 font-serif text-lg font-bold italic leading-snug transition-colors group-hover:text-crimson",
					children: [
						"“",
						article.title,
						"”"
					]
				}),
				article.dek && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed",
					children: article.dek
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 pt-2.5 border-t border-border/60 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-bold text-xs text-foreground/90 font-sans",
						children: ["— ", article.author_name]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "meta text-muted-foreground/70 text-[10px]",
						children: timeAgo(article.published_at)
					})]
				})
			]
		})
	});
}
function VideoCard({ article }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/article/$slug",
		params: { slug: article.slug },
		className: "group block w-[260px] md:w-[300px] shrink-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden rounded bg-muted border border-border",
				children: [article.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: article.image_url,
					alt: article.title,
					loading: "lazy",
					className: "aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "glass absolute inset-0 m-auto grid h-10 w-10 place-items-center rounded-full border border-white/40 shadow-md transition-transform group-hover:scale-110",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4 fill-current text-foreground" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-2 font-serif text-sm md:text-base font-bold leading-snug transition-colors group-hover:text-crimson line-clamp-2",
				children: article.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "meta mt-1 text-muted-foreground/70 text-[10px]",
				children: timeAgo(article.published_at)
			})
		]
	});
}
function StandardCard({ article, index = 0 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
		className: "news-card group animate-rise overflow-hidden rounded border border-border bg-card flex flex-col h-full",
		style: { animationDelay: `${Math.min(index, 8) * 35}ms` },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/article/$slug",
			params: { slug: article.slug },
			className: "flex flex-col h-full",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden bg-muted border-b border-border",
				children: [article.image_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: article.image_url,
					alt: article.title,
					loading: "lazy",
					className: "aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "aspect-[16/10] w-full bg-muted/60 flex items-center justify-center text-xs text-muted-foreground font-serif font-bold",
					children: "Delhi News Live"
				}), article.is_video && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "glass absolute inset-0 m-auto grid h-9 w-9 place-items-center rounded-full border shadow transition-transform group-hover:scale-110",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-3.5 w-3.5 fill-current text-foreground" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col flex-1 p-3.5 md:p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryTag, {
						name: article.categories?.name,
						gold: article.is_featured
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-1.5 font-serif text-base md:text-lg font-bold leading-snug transition-colors group-hover:text-crimson line-clamp-2",
						children: article.title
					}),
					article.dek && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-xs leading-relaxed text-muted-foreground line-clamp-2",
						children: article.dek
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-auto pt-3 border-t border-border/50 mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, { article })
					})
				]
			})]
		})
	});
}
//#endregion
export { SecondaryLeadCard as a, StandardCard as c, ScrollTop as i, TrendingRow as l, HeroCard as n, SiteFooter as o, OpinionCard as r, SiteHeader as s, CompactCard as t, VideoCard as u };
