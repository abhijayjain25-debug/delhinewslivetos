import { I as notFound, h as createFileRoute, m as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as getCategoryPage, r as getHomeData } from "./news.functions-DGU1Kg3M.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/category._slug-BUHppxiM.js
var $$splitNotFoundComponentImporter = () => import("./category._slug-Jhij-6Yp.mjs");
var $$splitErrorComponentImporter = () => import("./category._slug-lcsk7Vmr.mjs");
var $$splitComponentImporter = () => import("./category._slug-BBIuVhjJ.mjs");
var Route = createFileRoute("/category/$slug")({
	loader: async ({ params }) => {
		const [page, home] = await Promise.all([getCategoryPage({ data: { slug: params.slug } }), getHomeData()]);
		if (!page.category) throw notFound();
		return {
			...page,
			home
		};
	},
	head: ({ loaderData }) => {
		const c = loaderData?.category;
		const title = c ? `${c.name} news | Delhi News Live` : "Section | Delhi News Live";
		const description = c?.description ?? "The latest reporting and analysis from the Delhi News Live newsroom.";
		return { meta: [
			{ title },
			{
				name: "description",
				content: description
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: description
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
//#endregion
export { Route as t };
