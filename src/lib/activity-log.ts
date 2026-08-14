import { supabase } from "@/integrations/supabase/client";

export async function logActivity({
  action,
  entity_type,
  entity_id,
  details = {},
}: {
  action: string;
  entity_type: string;
  entity_id?: string | null;
  details?: Record<string, unknown>;
}) {
  try {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;

    await supabase.from("activity_logs").insert({
      user_id: user?.id ?? null,
      user_email: user?.email ?? "anonymous",
      action,
      entity_type,
      entity_id: entity_id ?? null,
      details: details as unknown as Record<string, unknown>,
    });
  } catch (err) {
    console.error("[ActivityLog] Failed to log activity:", err);
  }
}
