export async function load({ fetch }) {
	const res = await fetch("/blog", {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const jsonRes = await res.json();
	return {
		values: jsonRes
	};
}
// <script context="module">
// 	export async function load({ fetch, session }) {
// 		const res = await fetch("/blog/");
// 		const jsonRes = await res.json();
// 		return {
// 			props: {
// 				posts: jsonRes.posts,
// 				user: session.user,
// 			},
// 		};
// 	}
// </script>
