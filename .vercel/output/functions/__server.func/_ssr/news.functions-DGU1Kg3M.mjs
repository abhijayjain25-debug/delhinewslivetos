import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-ChlOKILD.mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/news.functions-DGU1Kg3M.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getHomeData = createServerFn({ method: "GET" }).handler(createSsrRpc("466091f80c27c3e29886121da29fcc6b4a56ccc37471d91e585859430d928a9c"));
var getArticleBySlug = createServerFn({ method: "GET" }).inputValidator((d) => objectType({ slug: stringType() }).parse(d)).handler(createSsrRpc("33f51350493d9bbe54afb6def301c5430311fb6e5be673db320ac6d97ea0bde9"));
var getCategoryPage = createServerFn({ method: "GET" }).inputValidator((d) => objectType({ slug: stringType() }).parse(d)).handler(createSsrRpc("2bc2a68928d1ddf9837833a09cddcb17cdbe8b3cc6a3824f1d5f3f1f4c00cbcb"));
//#endregion
export { getCategoryPage as n, getHomeData as r, getArticleBySlug as t };
