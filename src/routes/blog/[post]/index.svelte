<script context="module">
	export async function load({ page, fetch }) {
		const res = await fetch('/api/' + page.params.post);
		const jsonRes = await res.json();
		return {
			props: {
				post: jsonRes.post
			}
		};
	}
</script>

<script>
	export let post;
</script>

<h1>{post.title}</h1>
<p>{post.body}</p>
