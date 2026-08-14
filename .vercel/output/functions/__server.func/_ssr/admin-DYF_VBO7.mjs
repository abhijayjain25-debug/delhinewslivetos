import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CLc7pYlP.mjs";
import { o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as createFileRoute, m as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DYF_VBO7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var $$splitComponentImporter = () => import("./admin-DuQA4N7O.mjs");
var Route = createFileRoute("/_authenticated/admin")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
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
//#endregion
export { useRole as n, Route as t };
