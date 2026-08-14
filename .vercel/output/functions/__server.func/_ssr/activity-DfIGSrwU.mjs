import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CLc7pYlP.mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, o as require_react, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { n as useRole } from "./admin-DYF_VBO7.mjs";
import { C as History, o as Trash2, r as UserPlus, u as Shield } from "../_libs/lucide-react.mjs";
import { t as ConfirmDialog } from "./confirm-dialog-B_xx_KqF.mjs";
import { t as logActivity } from "./activity-log-DHOa81tS.mjs";
import { i as timeAgo } from "./format-BUTIADpu.mjs";
import { t as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/activity-DfIGSrwU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminActivityAndRoles() {
	const role = useRole();
	const qc = useQueryClient();
	const [newEmail, setNewEmail] = (0, import_react.useState)("");
	const [newRole, setNewRole] = (0, import_react.useState)("editor");
	const [roleDeleteTarget, setRoleDeleteTarget] = (0, import_react.useState)(null);
	const { data: logs = [] } = useQuery({
		queryKey: ["admin-activity-logs"],
		queryFn: async () => {
			const { data, error } = await supabase.from("activity_logs").select("*").order("created_at", { ascending: false }).limit(100);
			if (error) throw error;
			return data ?? [];
		}
	});
	const { data: profiles = [] } = useQuery({
		queryKey: ["admin-all-profiles"],
		queryFn: async () => {
			const { data, error } = await supabase.from("profiles").select("id, display_name");
			if (error) return [];
			return data ?? [];
		},
		enabled: role === "owner"
	});
	const { data: staffRoles = [] } = useQuery({
		queryKey: ["admin-staff-roles"],
		queryFn: async () => {
			const { data, error } = await supabase.from("user_roles").select("id, user_id, role, created_at");
			if (error) throw error;
			return data ?? [];
		},
		enabled: role === "owner"
	});
	const assignRoleMutation = useMutation({
		mutationFn: async () => {
			if (!newEmail.trim()) throw new Error("Please enter or select a User ID");
			const targetUserId = newEmail.trim();
			const { error: rErr } = await supabase.from("user_roles").insert({
				user_id: targetUserId,
				role: newRole
			});
			if (rErr) throw rErr;
			await logActivity({
				action: "role.assigned",
				entity_type: "user_roles",
				entity_id: targetUserId,
				details: { role: newRole }
			});
		},
		onSuccess: () => {
			toast.success("Role assigned successfully!");
			setNewEmail("");
			qc.invalidateQueries({ queryKey: ["admin-staff-roles"] });
		},
		onError: (err) => toast.error(err.message)
	});
	const deleteRoleMutation = useMutation({
		mutationFn: async (id) => {
			const { error } = await supabase.from("user_roles").delete().eq("id", id);
			if (error) throw error;
			await logActivity({
				action: "role.revoked",
				entity_type: "user_roles",
				entity_id: id
			});
		},
		onSuccess: () => {
			toast.success("Role revoked.");
			setRoleDeleteTarget(null);
			qc.invalidateQueries({ queryKey: ["admin-staff-roles"] });
		},
		onError: (err) => toast.error(err.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-3xl",
				children: "Activity Log & Access Control"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Audit trails of newsroom operations and staff role assignments."
			})] }),
			role === "owner" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border/80 bg-card p-6 shadow-rest space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 border-b pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-5 w-5 text-crimson" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-serif text-xl font-bold",
							children: "Role Management (Owner Only)"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-3 border-b pb-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex-1 min-w-[240px]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: newEmail,
									onChange: (e) => setNewEmail(e.target.value),
									placeholder: "User UUID (e.g. 550e8400-e29b-41d4-a716-446655440000)",
									className: "w-full rounded-xl border border-border/80 bg-background px-3.5 py-2 text-sm outline-none focus:border-crimson"
								})
							}),
							profiles.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								onChange: (e) => setNewEmail(e.target.value),
								className: "rounded-xl border border-border/80 bg-background px-3.5 py-2 text-sm outline-none",
								value: newEmail,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Select registered user profile..."
								}), profiles.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: p.id,
									children: p.display_name ? `${p.display_name} (${p.id.slice(0, 8)}…)` : p.id
								}, p.id))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: newRole,
								onChange: (e) => setNewRole(e.target.value),
								className: "rounded-xl border border-border/80 bg-background px-3.5 py-2 text-sm outline-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "editor",
									children: "Editor"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "owner",
									children: "Owner"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								disabled: assignRoleMutation.isPending || !newEmail.trim(),
								onClick: () => assignRoleMutation.mutate(),
								className: "flex items-center gap-1.5 rounded-xl bg-crimson px-4 py-2 text-sm font-semibold text-crimson-foreground disabled:opacity-60",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-4 w-4" }), " Assign Role"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: staffRoles.map((r) => {
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between rounded-xl border p-4 bg-background",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-sm text-foreground truncate max-w-[180px]",
										children: profiles.find((p) => p.id === r.user_id)?.display_name || r.user_id.slice(0, 12) + "…"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-[10px] text-muted-foreground truncate max-w-[180px]",
										children: r.user_id
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "meta mt-1 inline-block text-crimson font-bold capitalize",
										children: r.role
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setRoleDeleteTarget(r),
									className: "text-muted-foreground hover:text-crimson p-1",
									title: "Revoke role",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
								})]
							}, r.id);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border/80 bg-card shadow-rest overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 border-b px-6 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "h-5 w-5 text-crimson" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-xl font-bold",
						children: "Newsroom Audit Trail"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "divide-y divide-border/60",
					children: [logs.map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "meta font-bold text-crimson",
								children: log.action
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted-foreground font-mono",
								children: [
									"(",
									log.entity_type,
									")"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-foreground/90 font-medium",
							children: [
								log.user_email || "System User",
								" performed ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: log.action
								}),
								" on ",
								log.entity_type,
								" ",
								log.entity_id ? `[${log.entity_id}]` : ""
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "meta text-muted-foreground/80 shrink-0",
							children: timeAgo(log.created_at)
						})]
					}, log.id)), logs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "p-12 text-center text-sm text-muted-foreground",
						children: "No activity logged yet. Operations performed in the admin panel will appear here automatically."
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: Boolean(roleDeleteTarget),
				title: "Revoke Role Access",
				description: `Are you sure you want to revoke the "${roleDeleteTarget?.role}" role for user ID "${roleDeleteTarget?.user_id}"? They will lose access to staff functions.`,
				confirmText: "Revoke Role",
				onConfirm: () => roleDeleteTarget && deleteRoleMutation.mutate(roleDeleteTarget.id),
				onCancel: () => setRoleDeleteTarget(null),
				busy: deleteRoleMutation.isPending
			})
		]
	});
}
//#endregion
export { AdminActivityAndRoles as component };
