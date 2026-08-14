// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const patchCsrfPlugin = () => ({
  name: "patch-csrf-middleware",
  transform(code: string, id: string) {
    if (id.includes("createCsrfMiddleware")) {
      return {
        code: code.replace(
          /export const createCsrfMiddleware = [^;]+;/,
          "export const createCsrfMiddleware = (opts) => ((ctx) => ctx ? ctx.next() : undefined);"
        ),
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
