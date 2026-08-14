import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CLc7pYlP.mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, o as require_react, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { M as Check, O as Copy, S as Image, i as Upload, o as Trash2 } from "../_libs/lucide-react.mjs";
import { t as ConfirmDialog } from "./confirm-dialog-B_xx_KqF.mjs";
import { t as logActivity } from "./activity-log-DHOa81tS.mjs";
import { t as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/media-DHiTSetf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ALLOWED_TYPES = [
	"image/jpeg",
	"image/png",
	"image/webp",
	"image/gif",
	"image/avif",
	"image/svg+xml"
];
var MAX_SIZE_MB = 5;
function AdminMediaLibrary() {
	const qc = useQueryClient();
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [copiedUrl, setCopiedUrl] = (0, import_react.useState)(null);
	const [deleteTarget, setDeleteTarget] = (0, import_react.useState)(null);
	const { data: files = [], isLoading } = useQuery({
		queryKey: ["admin-media-files"],
		queryFn: async () => {
			const { data, error } = await supabase.storage.from("media").list("", {
				limit: 100,
				sortBy: {
					column: "created_at",
					order: "desc"
				}
			});
			if (error) throw error;
			return data ?? [];
		}
	});
	async function handleFileUpload(e) {
		const file = e.target.files?.[0];
		if (!file) return;
		if (!ALLOWED_TYPES.includes(file.type)) {
			toast.error(`Invalid file type (${file.type}). Please upload a JPEG, PNG, WebP, GIF, or SVG image.`);
			return;
		}
		if (file.size > MAX_SIZE_MB * 1024 * 1024) {
			toast.error(`File size exceeds ${MAX_SIZE_MB}MB limit (${(file.size / 1024 / 1024).toFixed(1)}MB).`);
			return;
		}
		setUploading(true);
		try {
			const ext = file.name.split(".").pop();
			const path = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${ext}`;
			const { error } = await supabase.storage.from("media").upload(path, file, {
				cacheControl: "3600",
				upsert: false
			});
			if (error) throw error;
			const { data: publicUrlData } = supabase.storage.from("media").getPublicUrl(path);
			toast.success("Image uploaded successfully!");
			await logActivity({
				action: "media.uploaded",
				entity_type: "media",
				entity_id: path,
				details: {
					filename: file.name,
					url: publicUrlData.publicUrl,
					size: file.size
				}
			});
			qc.invalidateQueries({ queryKey: ["admin-media-files"] });
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Failed to upload image.");
		} finally {
			setUploading(false);
			e.target.value = "";
		}
	}
	const removeFile = useMutation({
		mutationFn: async (name) => {
			const { error } = await supabase.storage.from("media").remove([name]);
			if (error) throw error;
			await logActivity({
				action: "media.deleted",
				entity_type: "media",
				entity_id: name
			});
		},
		onSuccess: () => {
			toast.success("Image deleted.");
			setDeleteTarget(null);
			qc.invalidateQueries({ queryKey: ["admin-media-files"] });
		},
		onError: (err) => toast.error(err.message)
	});
	function copyToClipboard(url) {
		navigator.clipboard.writeText(url);
		setCopiedUrl(url);
		toast.success("Image URL copied to clipboard!");
		setTimeout(() => setCopiedUrl(null), 2500);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-serif text-3xl",
					children: "Media Library"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Upload and manage assets for articles, banners and site graphics."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex cursor-pointer items-center gap-2 rounded-full bg-crimson px-5 py-2.5 text-sm font-semibold text-crimson-foreground shadow-sm hover:opacity-95",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-4 w-4" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: uploading ? "Uploading…" : "Upload Image" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							accept: "image/*",
							disabled: uploading,
							onChange: handleFileUpload,
							className: "hidden"
						})
					]
				})]
			}),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					1,
					2,
					3,
					4
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-48 animate-shimmer rounded-2xl bg-muted" }, i))
			}) : files.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-dashed p-12 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "mx-auto h-10 w-10 text-muted-foreground/60" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-serif text-lg font-semibold",
						children: "No media assets uploaded yet"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Upload images to use them across your articles and banners."
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
				children: files.map((f) => {
					const publicUrl = supabase.storage.from("media").getPublicUrl(f.name).data.publicUrl;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "group overflow-hidden rounded-2xl border bg-card shadow-rest transition-all hover:shadow-lift",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative aspect-video overflow-hidden bg-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: publicUrl,
								alt: f.name,
								className: "h-full w-full object-cover transition-transform group-hover:scale-105"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => copyToClipboard(publicUrl),
									className: "grid h-9 w-9 place-items-center rounded-full bg-white text-foreground shadow hover:bg-slate-100",
									title: "Copy Public URL",
									children: copiedUrl === publicUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-emerald-600" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setDeleteTarget(f.name),
									className: "grid h-9 w-9 place-items-center rounded-full bg-crimson text-white shadow hover:bg-crimson/90",
									title: "Delete Image",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-xs font-semibold text-foreground/90",
								children: f.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "meta mt-1 text-muted-foreground",
								children: f.metadata?.size ? `${(f.metadata.size / 1024).toFixed(0)} KB` : "Image"
							})]
						})]
					}, f.name);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: Boolean(deleteTarget),
				title: "Delete Image",
				description: `Are you sure you want to permanently delete "${deleteTarget}" from media storage? This action cannot be undone.`,
				confirmText: "Delete Image",
				onConfirm: () => deleteTarget && removeFile.mutate(deleteTarget),
				onCancel: () => setDeleteTarget(null),
				busy: removeFile.isPending
			})
		]
	});
}
//#endregion
export { AdminMediaLibrary as component };
