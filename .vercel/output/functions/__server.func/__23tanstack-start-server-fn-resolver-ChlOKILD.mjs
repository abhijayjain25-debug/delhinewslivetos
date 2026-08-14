//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-ChlOKILD.js
var manifest = {
	"2bc2a68928d1ddf9837833a09cddcb17cdbe8b3cc6a3824f1d5f3f1f4c00cbcb": {
		functionName: "getCategoryPage_createServerFn_handler",
		importer: () => import("./_ssr/news.functions-OAAS8gnH.mjs")
	},
	"33f51350493d9bbe54afb6def301c5430311fb6e5be673db320ac6d97ea0bde9": {
		functionName: "getArticleBySlug_createServerFn_handler",
		importer: () => import("./_ssr/news.functions-OAAS8gnH.mjs")
	},
	"466091f80c27c3e29886121da29fcc6b4a56ccc37471d91e585859430d928a9c": {
		functionName: "getHomeData_createServerFn_handler",
		importer: () => import("./_ssr/news.functions-OAAS8gnH.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
