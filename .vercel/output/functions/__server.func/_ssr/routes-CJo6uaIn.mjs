import { h as createFileRoute, m as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as getHomeData } from "./news.functions-DGU1Kg3M.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CJo6uaIn.js
var $$splitErrorComponentImporter = () => import("./routes-DoIVoGFs.mjs");
var $$splitComponentImporter = () => import("./routes-Bcuj9Rrb.mjs");
var Route = createFileRoute("/")({
	loader: () => getHomeData(),
	head: () => ({ meta: [
		{ title: "Delhi News Live — Delhi-NCR, India & World news" },
		{
			name: "description",
			content: "Delhi News Live brings hyperlocal Delhi-NCR reporting alongside India and world news, business, sport, tech and opinion — updated through the day."
		},
		{
			property: "og:title",
			content: "Delhi News Live — Delhi-NCR, India & World news"
		},
		{
			property: "og:description",
			content: "Hyperlocal Delhi-NCR reporting alongside India and world news, business, sport, tech and opinion."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
//#endregion
export { Route as t };
