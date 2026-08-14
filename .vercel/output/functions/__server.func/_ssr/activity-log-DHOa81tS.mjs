import { t as supabase } from "./client-CLc7pYlP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/activity-log-DHOa81tS.js
async function logActivity({ action, entity_type, entity_id, details = {} }) {
	try {
		const { data: userData } = await supabase.auth.getUser();
		const user = userData?.user;
		await supabase.from("activity_logs").insert({
			user_id: user?.id ?? null,
			user_email: user?.email ?? "anonymous",
			action,
			entity_type,
			entity_id: entity_id ?? null,
			details
		});
	} catch (err) {
		console.error("[ActivityLog] Failed to log activity:", err);
	}
}
//#endregion
export { logActivity as t };
