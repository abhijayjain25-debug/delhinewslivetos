import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/auth" });

    // Validate staff role in RLS database table
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", data.user.id);

    const isStaff = (roles ?? []).some((r) => r.role === "owner" || r.role === "editor");
    if (!isStaff) {
      console.warn("[AuthGuard] Access denied: User is not an authorized staff member");
      throw redirect({ to: "/auth" });
    }

    return { user: data.user, roles: roles ?? [] };
  },
  component: () => <Outlet />,
});
