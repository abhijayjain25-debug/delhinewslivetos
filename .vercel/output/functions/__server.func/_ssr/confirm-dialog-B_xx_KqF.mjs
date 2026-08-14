import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as TriangleAlert, t as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/confirm-dialog-B_xx_KqF.js
var import_jsx_runtime = require_jsx_runtime();
function ConfirmDialog({ open, title, description, confirmText = "Delete", cancelText = "Cancel", variant = "destructive", onConfirm, onCancel, busy = false }) {
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-rise",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-2xl border border-border/80 bg-card p-6 shadow-float",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between pb-3 border-b",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-9 w-9 place-items-center rounded-full bg-crimson/10 text-crimson",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-serif text-xl font-bold",
							children: title
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onCancel,
						disabled: busy,
						className: "text-muted-foreground hover:text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "py-4 text-sm text-muted-foreground leading-relaxed",
					children: description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-end gap-3 pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onCancel,
						disabled: busy,
						className: "rounded-lg border px-4 py-2 text-sm font-medium hover:bg-accent disabled:opacity-50",
						children: cancelText
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onConfirm,
						disabled: busy,
						className: `rounded-lg px-5 py-2 text-sm font-semibold text-white transition-opacity disabled:opacity-50 ${variant === "destructive" ? "bg-crimson hover:bg-crimson/90" : "bg-primary hover:bg-primary/90"}`,
						children: busy ? "Processing…" : confirmText
					})]
				})
			]
		})
	});
}
//#endregion
export { ConfirmDialog as t };
