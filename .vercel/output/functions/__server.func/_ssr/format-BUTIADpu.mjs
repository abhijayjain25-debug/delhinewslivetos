//#region node_modules/.nitro/vite/services/ssr/assets/format-BUTIADpu.js
function timeAgo(iso) {
	if (!iso) return "";
	const then = new Date(iso).getTime();
	const mins = Math.max(1, Math.round((Date.now() - then) / 6e4));
	if (mins < 60) return `${mins} min ago`;
	const hrs = Math.round(mins / 60);
	if (hrs < 24) return `${hrs} hr ago`;
	const days = Math.round(hrs / 24);
	if (days < 7) return `${days}d ago`;
	return new Date(iso).toLocaleDateString("en-IN", {
		day: "numeric",
		month: "short",
		year: "numeric"
	});
}
function fullDate(iso) {
	if (!iso) return "";
	return new Date(iso).toLocaleString("en-IN", {
		day: "numeric",
		month: "long",
		year: "numeric",
		hour: "numeric",
		minute: "2-digit"
	});
}
function slugify(input) {
	return input.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 80);
}
function readingMinutes(body) {
	const words = body.trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / 220));
}
//#endregion
export { timeAgo as i, readingMinutes as n, slugify as r, fullDate as t };
