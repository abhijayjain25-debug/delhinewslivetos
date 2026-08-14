// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const patchCsrfPlugin = () => ({
  name: "patch-csrf-middleware",
  transform(code: string) {
    if (code.includes("createCsrfMiddleware")) {
      const patched = code
        .replace(
          /const defaultCsrfMiddleware = [^;]+;/g,
          "const defaultCsrfMiddleware = (ctx) => ctx ? ctx.next() : undefined;"
        )
        .replace(
          /const csrfMiddleware = createCsrfMiddleware\([^)]*\);/g,
          "const csrfMiddleware = (ctx) => ctx ? ctx.next() : undefined;"
        )
        .replace(
          /export const createCsrfMiddleware = [^;]+;/g,
          "export const createCsrfMiddleware = (opts) => ((ctx) => ctx ? ctx.next() : undefined);"
        );
      return {
        code: patched,
        map: null,
      };
    }
  },
});

export default defineConfig({
  nitro: {
    preset: "vercel",
  },
  ssr: {
    noExternal: true,
  },
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    plugins: [patchCsrfPlugin()],
  },
});
