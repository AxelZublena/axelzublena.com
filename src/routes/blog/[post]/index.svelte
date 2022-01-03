<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ params, fetch }) {
		const res = await fetch('/blog/' + params.post + '/get');
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
	$: title = post.title;
	$: html = post.file.text;
</script>

<svelte:head>
	<title>Blog - {post.title}</title>
</svelte:head>

<h1 class="text-4xl text-blue-400 text-center pb-5">{title}</h1>
<div>{@html html}</div>
