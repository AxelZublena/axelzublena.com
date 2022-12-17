/** @type {import('./$types').LayoutLoad} */
export function load({ url }) {
	// console.log(url.pathname)
	return {
		segment: url.pathname,
	};
}
// export function load({ url, session }) {
// 	if (
// 		/.*(create|update|edit|delete)/.test(url.pathname) &&
// 		session.user === ""
// 	) {
// 		return { redirect: "/", status: 302 };
// 	}
// 	return {
// 		segment: url.pathname,
// 	};
// }
