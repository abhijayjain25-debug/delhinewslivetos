import { I as notFound, h as createFileRoute, m as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as getHomeData, t as getArticleBySlug } from "./news.functions-DGU1Kg3M.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/article._slug-jNLGhq0g.js
var $$splitNotFoundComponentImporter = () => import("./article._slug-B2ZAZJm3.mjs");
var $$splitErrorComponentImporter = () => import("./article._slug-BxIYunVk.mjs");
var $$splitComponentImporter = () => import("./article._slug-DID-465u.mjs");
var Route = createFileRoute("/article/$slug")({
	loader: async ({ params }) => {
		const [detail, home] = await Promise.all([getArticleBySlug({ data: { slug: params.slug } }), getHomeData()]);
		if (!detail.article) throw notFound();
		return {
			...detail,
			home
		};
	},
	head: ({ loaderData }) => {
		const a = loaderData?.article;
		const title = a ? `${a.title} | Delhi News Live` : "Story | Delhi News Live";
		const description = a?.dek ?? "Read the latest reporting from Delhi News Live.";
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
				content: "article"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			...a?.image_url?.startsWith("https://") ? [{
				property: "og:image",
				content: a.image_url
			}, {
				name: "twitter:image",
				content: a.image_url
			}] : []
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
//#endregion
export { Route as t };
