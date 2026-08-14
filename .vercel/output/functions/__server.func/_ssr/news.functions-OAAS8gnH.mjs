import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/news.functions-OAAS8gnH.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function publicClient() {
	const url = process.env["SUPABASE_URL"] || process.env["VITE_SUPABASE_URL"];
	const key = process.env["SUPABASE_PUBLISHABLE_KEY"] || process.env["VITE_SUPABASE_PUBLISHABLE_KEY"];
	if (!url || !key) {
		const missing = [...!url ? ["SUPABASE_URL / VITE_SUPABASE_URL"] : [], ...!key ? ["SUPABASE_PUBLISHABLE_KEY / VITE_SUPABASE_PUBLISHABLE_KEY"] : []];
		throw new Error(`Missing Supabase environment variable(s): ${missing.join(", ")}`);
	}
	return createClient(url, key, { auth: {
		storage: void 0,
		persistSession: false,
		autoRefreshToken: false
	} });
}
var ARTICLE_SELECT = "id,slug,title,dek,body,image_url,image_caption,category_id,author_name,tags,published_at,read_minutes,is_lead,is_featured,is_video,video_url,pull_quote,views,status,created_at,updated_at,created_by,categories(id,name,slug)";
var getHomeData_createServerFn_handler = createServerRpc({
	id: "466091f80c27c3e29886121da29fcc6b4a56ccc37471d91e585859430d928a9c",
	name: "getHomeData",
	filename: "src/lib/news.functions.ts"
}, (opts) => getHomeData.__executeServer(opts));
var getHomeData = createServerFn({ method: "GET" }).handler(getHomeData_createServerFn_handler, async () => {
	const sb = publicClient();
	const [articles, categories, ticker, settings] = await Promise.all([
		sb.from("articles").select(ARTICLE_SELECT).eq("status", "published").order("published_at", { ascending: false }).limit(60),
		sb.from("categories").select("*").eq("is_visible", true).order("sort_order"),
		sb.from("ticker_items").select("*").eq("is_active", true).order("sort_order"),
		sb.from("site_settings").select("*").eq("id", 1).maybeSingle()
	]);
	return {
		articles: articles.data ?? [],
		categories: categories.data ?? [],
		ticker: ticker.data ?? [],
		settings: settings.data ?? null
	};
});
var getArticleBySlug_createServerFn_handler = createServerRpc({
	id: "33f51350493d9bbe54afb6def301c5430311fb6e5be673db320ac6d97ea0bde9",
	name: "getArticleBySlug",
	filename: "src/lib/news.functions.ts"
}, (opts) => getArticleBySlug.__executeServer(opts));
var getArticleBySlug = createServerFn({ method: "GET" }).inputValidator((d) => objectType({ slug: stringType() }).parse(d)).handler(getArticleBySlug_createServerFn_handler, async ({ data }) => {
	const sb = publicClient();
	const { data: article } = await sb.from("articles").select(ARTICLE_SELECT).eq("slug", data.slug).eq("status", "published").maybeSingle();
	if (!article) return {
		article: null,
		related: []
	};
	const { data: related } = await sb.from("articles").select(ARTICLE_SELECT).eq("status", "published").eq("category_id", article.category_id ?? "").neq("id", article.id).order("published_at", { ascending: false }).limit(6);
	return {
		article,
		related: related ?? []
	};
});
var getCategoryPage_createServerFn_handler = createServerRpc({
	id: "2bc2a68928d1ddf9837833a09cddcb17cdbe8b3cc6a3824f1d5f3f1f4c00cbcb",
	name: "getCategoryPage",
	filename: "src/lib/news.functions.ts"
}, (opts) => getCategoryPage.__executeServer(opts));
var getCategoryPage = createServerFn({ method: "GET" }).inputValidator((d) => objectType({ slug: stringType() }).parse(d)).handler(getCategoryPage_createServerFn_handler, async ({ data }) => {
	const sb = publicClient();
	const { data: category } = await sb.from("categories").select("*").eq("slug", data.slug).maybeSingle();
	if (!category) return {
		category: null,
		articles: []
	};
	const { data: articles } = await sb.from("articles").select(ARTICLE_SELECT).eq("status", "published").eq("category_id", category.id).order("published_at", { ascending: false }).limit(40);
	return {
		category,
		articles: articles ?? []
	};
});
//#endregion
export { getArticleBySlug_createServerFn_handler, getCategoryPage_createServerFn_handler, getHomeData_createServerFn_handler };
