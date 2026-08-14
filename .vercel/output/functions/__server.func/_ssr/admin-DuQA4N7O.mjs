import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CLc7pYlP.mjs";
import { a as require_jsx_runtime, i as useQueryClient, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Link, p as Outlet, u as useRouterState, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as History, N as ChartColumn, S as Image, T as FileText, b as LayoutTemplate, c as Tags, f as Settings, y as LogOut } from "../_libs/lucide-react.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Masthead } from "./masthead-D2aBLNWB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DuQA4N7O.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV = [
	{
		to: "/admin",
		label: "Overview",
		icon: ChartColumn,
		exact: true
	},
	{
		to: "/admin/articles",
		label: "Articles",
		icon: FileText
	},
	{
		to: "/admin/media",
		label: "Media Library",
		icon: Image
	},
	{
		to: "/admin/frontpage",
		label: "Front Page",
		icon: LayoutTemplate
	},
	{
		to: "/admin/sections",
		label: "Sections & Ticker",
		icon: Tags
	},
	{
		to: "/admin/settings",
		label: "Site settings",
		icon: Settings
	},
	{
		to: "/admin/activity",
		label: "Activity & Access",
		icon: History
	}
];
function useRole() {
	const [role, setRole] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		supabase.auth.getUser().then(async ({ data }) => {
			if (!data.user) return;
			const { data: rows } = await supabase.from("user_roles").select("role").eq("user_id", data.user.id);
			const roles = (rows ?? []).map((r) => r.role);
			setRole(roles.includes("owner") ? "owner" : roles.includes("editor") ? "editor" : null);
		});
	}, []);
	return role;
}
function AdminLayout() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const path = useRouterState({ select: (s) => s.location.pathname });
	const role = useRole();
	async function signOut() {
		await queryClient.cancelQueries();
		queryClient.clear();
		await supabase.auth.signOut();
		navigate({
			to: "/auth",
			replace: true
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-secondary/30",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "glass sticky top-0 z-40 border-b",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex h-16 max-w-[1500px] items-center gap-4 px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Masthead, { compact: true }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "meta rounded-full border px-2.5 py-1 text-muted-foreground",
						children: ["Admin ", role ? `· ${role}` : ""]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "ml-auto text-[13px] text-muted-foreground hover:text-crimson",
						children: "View site"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: signOut,
						className: "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] hover:border-crimson hover:text-crimson",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-3.5 w-3.5" }), " Sign out"]
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-[1500px] gap-6 px-4 py-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "hidden w-56 shrink-0 space-y-1 md:block",
				children: NAV.map((item) => {
					const active = item.exact ? path === item.to : path.startsWith(item.to);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: cn("flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors", active ? "bg-crimson text-crimson-foreground" : "text-foreground/75 hover:bg-accent"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "h-4 w-4" }), item.label]
					}, item.to);
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "min-w-0 flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			})]
		})]
	});
}
//#endregion
export { AdminLayout as component, useRole };
