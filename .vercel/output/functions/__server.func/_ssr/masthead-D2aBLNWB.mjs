import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/masthead-D2aBLNWB.js
var import_jsx_runtime = require_jsx_runtime();
function Masthead({ className, compact = false, logoUrl }) {
	const finalLogoUrl = logoUrl || "/delhi-news-live-logo.png";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/",
		className: cn("flex items-center shrink-0 transition-opacity hover:opacity-95", className),
		"aria-label": "Delhi News Live home",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: finalLogoUrl,
			alt: "Delhi News Live",
			className: cn("w-auto object-contain transition-all duration-300", compact ? "h-6 md:h-7" : "h-8 md:h-[42px]")
		})
	});
}
//#endregion
export { Masthead as t };
