import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Masthead } from "@/components/site/masthead";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin sign in | Delhi News Live" },
      { name: "description", content: "Sign in to the Delhi News Live admin panel." },
      { property: "og:title", content: "Admin sign in | Delhi News Live" },
      { property: "og:description", content: "Administrator access for Delhi News Live." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) void navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim().toLowerCase(),
          password: password.trim(),
        });
        if (error) {
          throw new Error(error.message || "Invalid email or password combination.");
        }

        toast.success("Successfully authenticated");
        void navigate({ to: "/admin" });
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim().toLowerCase(),
          password: password.trim(),
          options: {
            data: {
              display_name: displayName.trim() || email.split("@")[0],
            },
          },
        });

        if (error) throw error;

        if (data.session) {
          toast.success("Account created and signed in!");
          void navigate({ to: "/admin" });
        } else if (data.user) {
          toast.success("Account created! Trying to sign in...");
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email: email.trim().toLowerCase(),
            password: password.trim(),
          });
          if (signInError) {
            toast.info("Please check your email to confirm your account.");
          } else {
            void navigate({ to: "/admin" });
          }
        }
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Authentication error occurred.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center px-4 bg-secondary/20 py-8">
      <div className="w-full max-w-sm">
        <Masthead className="mb-8 justify-center" />
        <div className="rounded-2xl border border-border/80 bg-card p-7 shadow-lift">
          <div className="mb-5 flex rounded-xl bg-secondary/50 p-1">
            <button
              type="button"
              onClick={() => setMode("signin")}
              className={`flex-1 rounded-lg py-1.5 text-xs font-semibold transition-all ${
                mode === "signin"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`flex-1 rounded-lg py-1.5 text-xs font-semibold transition-all ${
                mode === "signup"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign Up
            </button>
          </div>

          <h1 className="font-serif text-2xl font-bold">
            {mode === "signin" ? "Admin Sign In" : "Register Admin User"}
          </h1>
          <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
            {mode === "signin"
              ? "Restricted newsroom portal. Sign in with your authorized editor or owner credentials."
              : "Create an account. The first registered user will automatically receive owner administrative access."}
          </p>
          <form onSubmit={submit} className="mt-6 space-y-3.5">
            {mode === "signup" && (
              <div>
                <label className="meta mb-1.5 block text-muted-foreground">Display Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. Chief Editor"
                  className="w-full rounded-xl border border-border/80 bg-background px-3.5 py-2.5 text-sm outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all"
                />
              </div>
            )}
            <div>
              <label className="meta mb-1.5 block text-muted-foreground">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="editor@delhinewslive.com"
                className="w-full rounded-xl border border-border/80 bg-background px-3.5 py-2.5 text-sm outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all"
              />
            </div>
            <div>
              <label className="meta mb-1.5 block text-muted-foreground">Password</label>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-xl border border-border/80 bg-background px-3.5 py-2.5 text-sm outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all"
              />
            </div>
            <button
              disabled={busy}
              className="mt-2 w-full rounded-xl bg-crimson py-3 text-sm font-bold text-crimson-foreground transition-all hover:opacity-95 shadow-md disabled:opacity-60"
            >
              {busy
                ? "Processing…"
                : mode === "signin"
                  ? "Sign In to Newsroom"
                  : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
