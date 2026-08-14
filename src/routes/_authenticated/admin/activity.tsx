import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Shield, ShieldAlert, UserPlus, Trash2, History } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useRole } from "../admin";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { logActivity } from "@/lib/activity-log";
import { timeAgo } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/admin/activity")({
  component: AdminActivityAndRoles,
});

function AdminActivityAndRoles() {
  const role = useRole();
  const qc = useQueryClient();
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<"editor" | "owner">("editor");
  const [roleDeleteTarget, setRoleDeleteTarget] = useState<{ id: string; user_id: string; role: string } | null>(null);

  const { data: logs = [] } = useQuery({
    queryKey: ["admin-activity-logs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("activity_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      return data ?? [];
    },
  });

  const { data: profiles = [] } = useQuery({
    queryKey: ["admin-all-profiles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("id, display_name");
      if (error) return [];
      return data ?? [];
    },
    enabled: role === "owner",
  });

  const { data: staffRoles = [] } = useQuery({
    queryKey: ["admin-staff-roles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("id, user_id, role, created_at");
      if (error) throw error;
      return data ?? [];
    },
    enabled: role === "owner",
  });

  const assignRoleMutation = useMutation({
    mutationFn: async () => {
      if (!newEmail.trim()) throw new Error("Please enter or select a User ID");

      const targetUserId = newEmail.trim();
      const { error: rErr } = await supabase
        .from("user_roles")
        .insert({
          user_id: targetUserId,
          role: newRole,
        });
      if (rErr) throw rErr;

      await logActivity({
        action: "role.assigned",
        entity_type: "user_roles",
        entity_id: targetUserId,
        details: { role: newRole },
      });
    },
    onSuccess: () => {
      toast.success("Role assigned successfully!");
      setNewEmail("");
      void qc.invalidateQueries({ queryKey: ["admin-staff-roles"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteRoleMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("user_roles").delete().eq("id", id);
      if (error) throw error;
      await logActivity({
        action: "role.revoked",
        entity_type: "user_roles",
        entity_id: id,
      });
    },
    onSuccess: () => {
      toast.success("Role revoked.");
      setRoleDeleteTarget(null);
      void qc.invalidateQueries({ queryKey: ["admin-staff-roles"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl">Activity Log & Access Control</h1>
        <p className="text-sm text-muted-foreground">
          Audit trails of newsroom operations and staff role assignments.
        </p>
      </div>

      {role === "owner" && (
        <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-rest space-y-4">
          <div className="flex items-center gap-2 border-b pb-3">
            <Shield className="h-5 w-5 text-crimson" />
            <h2 className="font-serif text-xl font-bold">Role Management (Owner Only)</h2>
          </div>

          <div className="flex flex-wrap gap-3 border-b pb-4">
            <div className="flex-1 min-w-[240px]">
              <input
                type="text"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="User UUID (e.g. 550e8400-e29b-41d4-a716-446655440000)"
                className="w-full rounded-xl border border-border/80 bg-background px-3.5 py-2 text-sm outline-none focus:border-crimson"
              />
            </div>
            {profiles.length > 0 && (
              <select
                onChange={(e) => setNewEmail(e.target.value)}
                className="rounded-xl border border-border/80 bg-background px-3.5 py-2 text-sm outline-none"
                value={newEmail}
              >
                <option value="">Select registered user profile...</option>
                {profiles.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.display_name ? `${p.display_name} (${p.id.slice(0, 8)}…)` : p.id}
                  </option>
                ))}
              </select>
            )}
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value as "editor" | "owner")}
              className="rounded-xl border border-border/80 bg-background px-3.5 py-2 text-sm outline-none"
            >
              <option value="editor">Editor</option>
              <option value="owner">Owner</option>
            </select>
            <button
              disabled={assignRoleMutation.isPending || !newEmail.trim()}
              onClick={() => assignRoleMutation.mutate()}
              className="flex items-center gap-1.5 rounded-xl bg-crimson px-4 py-2 text-sm font-semibold text-crimson-foreground disabled:opacity-60"
            >
              <UserPlus className="h-4 w-4" /> Assign Role
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {staffRoles.map((r) => {
              const matchedProfile = profiles.find((p) => p.id === r.user_id);
              return (
                <div key={r.id} className="flex items-center justify-between rounded-xl border p-4 bg-background">
                  <div>
                    <p className="font-semibold text-sm text-foreground truncate max-w-[180px]">
                      {matchedProfile?.display_name || r.user_id.slice(0, 12) + "…"}
                    </p>
                    <p className="font-mono text-[10px] text-muted-foreground truncate max-w-[180px]">
                      {r.user_id}
                    </p>
                    <span className="meta mt-1 inline-block text-crimson font-bold capitalize">{r.role}</span>
                  </div>
                  <button
                    onClick={() => setRoleDeleteTarget(r)}
                    className="text-muted-foreground hover:text-crimson p-1"
                    title="Revoke role"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-border/80 bg-card shadow-rest overflow-hidden">
        <div className="flex items-center gap-2 border-b px-6 py-4">
          <History className="h-5 w-5 text-crimson" />
          <h2 className="font-serif text-xl font-bold">Newsroom Audit Trail</h2>
        </div>
        <ul className="divide-y divide-border/60">
          {logs.map((log) => (
            <li key={log.id} className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="meta font-bold text-crimson">{log.action}</span>
                  <span className="text-xs text-muted-foreground font-mono">({log.entity_type})</span>
                </div>
                <p className="mt-1 text-sm text-foreground/90 font-medium">
                  {log.user_email || "System User"} performed <span className="font-semibold">{log.action}</span> on {log.entity_type} {log.entity_id ? `[${log.entity_id}]` : ""}
                </p>
              </div>
              <span className="meta text-muted-foreground/80 shrink-0">
                {timeAgo(log.created_at)}
              </span>
            </li>
          ))}
          {logs.length === 0 && (
            <li className="p-12 text-center text-sm text-muted-foreground">
              No activity logged yet. Operations performed in the admin panel will appear here automatically.
            </li>
          )}
        </ul>
      </div>

      <ConfirmDialog
        open={Boolean(roleDeleteTarget)}
        title="Revoke Role Access"
        description={`Are you sure you want to revoke the "${roleDeleteTarget?.role}" role for user ID "${roleDeleteTarget?.user_id}"? They will lose access to staff functions.`}
        confirmText="Revoke Role"
        onConfirm={() => roleDeleteTarget && deleteRoleMutation.mutate(roleDeleteTarget.id)}
        onCancel={() => setRoleDeleteTarget(null)}
        busy={deleteRoleMutation.isPending}
      />
    </div>
  );
}
