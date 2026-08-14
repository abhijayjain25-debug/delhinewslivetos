import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CLc7pYlP.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as Masthead } from "./masthead-D2aBLNWB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-kC8oFngN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthPage() {
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [displayName, setDisplayName] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) navigate({ to: "/admin" });
		});
	}, [navigate]);
	async function submit(e) {
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
					password: password.trim()
				});
				if (error) throw new Error(error.message || "Invalid email or password combination.");
				toast.success("Successfully authenticated");
				navigate({ to: "/admin" });
			} else {
				const { data, error } = await supabase.auth.signUp({
					email: email.trim().toLowerCase(),
					password: password.trim(),
					options: { data: { display_name: displayName.trim() || email.split("@")[0] } }
				});
				if (error) throw error;
				if (data.session) {
					toast.success("Account created and signed in!");
					navigate({ to: "/admin" });
				} else if (data.user) {
					toast.success("Account created! Trying to sign in...");
					const { error: signInError } = await supabase.auth.signInWithPassword({
						email: email.trim().toLowerCase(),
						password: password.trim()
					});
					if (signInError) toast.info("Please check your email to confirm your account.");
					else navigate({ to: "/admin" });
				}
			}
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Authentication error occurred.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center px-4 bg-secondary/20 py-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Masthead, { className: "mb-8 justify-center" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border/80 bg-card p-7 shadow-lift",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-5 flex rounded-xl bg-secondary/50 p-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setMode("signin"),
							className: `flex-1 rounded-lg py-1.5 text-xs font-semibold transition-all ${mode === "signin" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
							children: "Sign In"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setMode("signup"),
							className: `flex-1 rounded-lg py-1.5 text-xs font-semibold transition-all ${mode === "signup" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
							children: "Sign Up"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-serif text-2xl font-bold",
						children: mode === "signin" ? "Admin Sign In" : "Register Admin User"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-xs text-muted-foreground leading-relaxed",
						children: mode === "signin" ? "Restricted newsroom portal. Sign in with your authorized editor or owner credentials." : "Create an account. The first registered user will automatically receive owner administrative access."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: submit,
						className: "mt-6 space-y-3.5",
						children: [
							mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "meta mb-1.5 block text-muted-foreground",
								children: "Display Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: displayName,
								onChange: (e) => setDisplayName(e.target.value),
								placeholder: "e.g. Chief Editor",
								className: "w-full rounded-xl border border-border/80 bg-background px-3.5 py-2.5 text-sm outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "meta mb-1.5 block text-muted-foreground",
								children: "Email Address"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								required: true,
								value: email,
								onChange: (e) => setEmail(e.target.value),
								placeholder: "editor@delhinewslive.com",
								className: "w-full rounded-xl border border-border/80 bg-background px-3.5 py-2.5 text-sm outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "meta mb-1.5 block text-muted-foreground",
								children: "Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								required: true,
								minLength: 8,
								value: password,
								onChange: (e) => setPassword(e.target.value),
								placeholder: "••••••••••••",
								className: "w-full rounded-xl border border-border/80 bg-background px-3.5 py-2.5 text-sm outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								disabled: busy,
								className: "mt-2 w-full rounded-xl bg-crimson py-3 text-sm font-bold text-crimson-foreground transition-all hover:opacity-95 shadow-md disabled:opacity-60",
								children: busy ? "Processing…" : mode === "signin" ? "Sign In to Newsroom" : "Create Account"
							})
						]
					})
				]
			})]
		})
	});
}
//#endregion
export { AuthPage as component };
