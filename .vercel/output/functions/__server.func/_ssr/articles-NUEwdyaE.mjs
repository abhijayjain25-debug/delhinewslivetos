import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CLc7pYlP.mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, o as require_react, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { h as Plus, o as Trash2, t as X } from "../_libs/lucide-react.mjs";
import { t as ConfirmDialog } from "./confirm-dialog-B_xx_KqF.mjs";
import { t as logActivity } from "./activity-log-DHOa81tS.mjs";
import { i as timeAgo, n as readingMinutes, r as slugify } from "./format-BUTIADpu.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/articles-NUEwdyaE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EMPTY = {
	title: "",
	slug: "",
	dek: "",
	body: "",
	image_url: "",
	image_caption: "",
	category_id: "",
	author_name: "DNL Desk",
	tags: "",
	status: "draft",
	is_lead: false,
	is_featured: false,
	is_video: false,
	video_url: "",
	pull_quote: ""
};
var field = "w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-crimson";
function AdminArticles() {
	const qc = useQueryClient();
	const [draft, setDraft] = (0, import_react.useState)(null);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const { data: categories = [] } = useQuery({
		queryKey: ["admin-categories"],
		queryFn: async () => {
			const { data } = await supabase.from("categories").select("*").order("sort_order");
			return data ?? [];
		}
	});
	const { data: articles = [] } = useQuery({
		queryKey: ["admin-articles"],
		queryFn: async () => {
			const { data, error } = await supabase.from("articles").select("*").order("created_at", { ascending: false }).limit(300);
			if (error) throw error;
			return data ?? [];
		}
	});
	const rows = (0, import_react.useMemo)(() => filter === "all" ? articles : articles.filter((a) => a.status === filter), [articles, filter]);
	const [deleteTarget, setDeleteTarget] = (0, import_react.useState)(null);
	const save = useMutation({
		mutationFn: async (d) => {
			const payload = {
				title: d.title.trim(),
				slug: d.slug.trim() || slugify(d.title),
				dek: d.dek || null,
				body: d.body,
				image_url: d.image_url || null,
				image_caption: d.image_caption || null,
				category_id: d.category_id || null,
				author_name: d.author_name || "DNL Desk",
				tags: d.tags.split(",").map((t) => t.trim()).filter(Boolean),
				status: d.status,
				read_minutes: readingMinutes(d.body || d.title),
				is_lead: d.is_lead,
				is_featured: d.is_featured,
				is_video: d.is_video,
				video_url: d.video_url || null,
				pull_quote: d.pull_quote || null,
				published_at: d.status === "published" ? (/* @__PURE__ */ new Date()).toISOString() : null
			};
			if (d.id) {
				const { error } = await supabase.from("articles").update(payload).eq("id", d.id);
				if (error) throw error;
				await logActivity({
					action: d.status === "published" ? "article.published" : "article.updated",
					entity_type: "article",
					entity_id: d.id,
					details: {
						title: d.title,
						status: d.status
					}
				});
			} else {
				const { data, error } = await supabase.from("articles").insert(payload).select("id").single();
				if (error) throw error;
				await logActivity({
					action: d.status === "published" ? "article.created_and_published" : "article.created",
					entity_type: "article",
					entity_id: data?.id,
					details: {
						title: d.title,
						status: d.status
					}
				});
			}
		},
		onSuccess: () => {
			toast.success("Story saved successfully");
			setDraft(null);
			qc.invalidateQueries({ queryKey: ["admin-articles"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const remove = useMutation({
		mutationFn: async (id) => {
			const { error } = await supabase.from("articles").delete().eq("id", id);
			if (error) throw error;
			await logActivity({
				action: "article.deleted",
				entity_type: "article",
				entity_id: id,
				details: { title: deleteTarget?.title }
			});
		},
		onSuccess: () => {
			toast.success("Story deleted");
			setDeleteTarget(null);
			qc.invalidateQueries({ queryKey: ["admin-articles"] });
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-serif text-3xl",
					children: "Articles"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Write, edit and publish stories."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto flex items-center gap-2",
					children: [[
						"all",
						"published",
						"draft"
					].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setFilter(f),
						className: cn("meta rounded-full border px-3 py-1.5 capitalize", filter === f ? "border-crimson text-crimson" : "text-muted-foreground"),
						children: f
					}, f)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setDraft({ ...EMPTY }),
						className: "flex items-center gap-1.5 rounded-full bg-crimson px-4 py-2 text-[13px] font-semibold text-crimson-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " New story"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "divide-y",
					children: [rows.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3 px-4 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setDraft({
									id: a.id,
									title: a.title,
									slug: a.slug,
									dek: a.dek ?? "",
									body: a.body ?? "",
									image_url: a.image_url ?? "",
									image_caption: a.image_caption ?? "",
									category_id: a.category_id ?? "",
									author_name: a.author_name,
									tags: (a.tags ?? []).join(", "),
									status: a.status,
									is_lead: a.is_lead,
									is_featured: a.is_featured,
									is_video: a.is_video,
									video_url: a.video_url ?? "",
									pull_quote: a.pull_quote ?? ""
								}),
								className: "min-w-0 flex-1 truncate text-left text-sm hover:text-crimson",
								children: a.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "meta hidden text-muted-foreground sm:inline",
								children: timeAgo(a.published_at ?? a.created_at)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("meta rounded-full border px-2 py-0.5", a.status === "published" ? "border-crimson text-crimson" : "text-muted-foreground"),
								children: a.status
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setDeleteTarget({
									id: a.id,
									title: a.title
								}),
								className: "text-muted-foreground hover:text-crimson",
								"aria-label": `Delete ${a.title}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
							})
						]
					}, a.id)), rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "px-5 py-10 text-center text-sm text-muted-foreground",
						children: "Nothing here yet."
					})]
				})
			}),
			draft && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 overflow-y-auto bg-background/80 p-4 backdrop-blur",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-3xl rounded-2xl border bg-card p-6 shadow-rest",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-serif text-2xl",
							children: draft.id ? "Edit story" : "New story"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setDraft(null),
							className: "ml-auto",
							"aria-label": "Close",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: field,
								placeholder: "Headline",
								value: draft.title,
								onChange: (e) => setDraft({
									...draft,
									title: e.target.value,
									slug: draft.id ? draft.slug : slugify(e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: field,
								placeholder: "Slug",
								value: draft.slug,
								onChange: (e) => setDraft({
									...draft,
									slug: e.target.value
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								className: field,
								rows: 2,
								placeholder: "Standfirst / dek",
								value: draft.dek,
								onChange: (e) => setDraft({
									...draft,
									dek: e.target.value
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								className: cn(field, "font-serif"),
								rows: 12,
								placeholder: "Body — one paragraph per line",
								value: draft.body,
								onChange: (e) => setDraft({
									...draft,
									body: e.target.value
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: field,
										placeholder: "Image URL",
										value: draft.image_url,
										onChange: (e) => setDraft({
											...draft,
											image_url: e.target.value
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: field,
										placeholder: "Image caption",
										value: draft.image_caption,
										onChange: (e) => setDraft({
											...draft,
											image_caption: e.target.value
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										className: field,
										value: draft.category_id,
										onChange: (e) => setDraft({
											...draft,
											category_id: e.target.value
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "Select section"
										}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: c.id,
											children: c.name
										}, c.id))]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: field,
										placeholder: "Byline",
										value: draft.author_name,
										onChange: (e) => setDraft({
											...draft,
											author_name: e.target.value
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: field,
										placeholder: "Tags, comma separated",
										value: draft.tags,
										onChange: (e) => setDraft({
											...draft,
											tags: e.target.value
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										className: field,
										value: draft.status,
										onChange: (e) => setDraft({
											...draft,
											status: e.target.value
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "draft",
											children: "Draft"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "published",
											children: "Published"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: field,
										placeholder: "Video URL (optional)",
										value: draft.video_url,
										onChange: (e) => setDraft({
											...draft,
											video_url: e.target.value
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: field,
										placeholder: "Pull quote (optional)",
										value: draft.pull_quote,
										onChange: (e) => setDraft({
											...draft,
											pull_quote: e.target.value
										})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-4 text-sm",
								children: [
									["is_lead", "Lead story"],
									["is_featured", "Featured"],
									["is_video", "Video story"]
								].map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: draft[key],
										onChange: (e) => setDraft({
											...draft,
											[key]: e.target.checked
										})
									}), label]
								}, key))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-end gap-2 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setDraft(null),
									className: "rounded-lg border px-4 py-2 text-sm",
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									disabled: save.isPending || !draft.title.trim(),
									onClick: () => save.mutate(draft),
									className: "rounded-lg bg-crimson px-5 py-2 text-sm font-semibold text-crimson-foreground disabled:opacity-60",
									children: save.isPending ? "Saving…" : "Save"
								})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: Boolean(deleteTarget),
				title: "Delete Story",
				description: `Are you sure you want to delete "${deleteTarget?.title}"? This story will be permanently removed.`,
				confirmText: "Delete Story",
				onConfirm: () => deleteTarget && remove.mutate(deleteTarget.id),
				onCancel: () => setDeleteTarget(null),
				busy: remove.isPending
			})
		]
	});
}
//#endregion
export { AdminArticles as component };
