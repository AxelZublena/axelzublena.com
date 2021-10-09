<script context="module">
	export async function load({ page, fetch }) {
		console.log(page.params.post);
		const res = await fetch("/api/" + page.params.post);
		const jsonRes = await res.json();

		// Style code snippets
		/*html = html.replaceAll("<code>", "<code style='color:blue'>");*/

		// Style Title
		/*html = html.replaceAll("<h3>", "<h3 style='font-size:50px'>");*/
		/*html = html.replaceAll("<h2>", "<h2 style='font-size:50px'>");*/
		/*html = html.replaceAll("<h2>", "<h2 class='text-5xl'>");*/

		return {
			props: {
				post: jsonRes.post
			}
		};
	}
</script>

<script>
	export let post;

	$: date = new Date(post.date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric"
	});
	/*const html = `<article>${post.file.text}</article>`;*/
</script>

<svelte:head>
	<title>Blog - {post.title}</title>
	<!--
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/github-dark.min.css"
	/>
    <div class="text-justify"><span id="markdown">{@html html}</span></div>
<div class="text-justify w-96" id="markdown">{@html post.file.text}</div>
    -->
	<link rel="stylesheet" href="/style.css" />
</svelte:head>

<h1 class="text-4xl text-blue-400 pb-3">{post.title}</h1>
<p class="pb-5">{date}</p>
<div class="" id="markdown">{@html post.file.text}</div>

<style>
	#markdown > :global(h2) {
		@apply text-2xl;
		@apply border-solid;
		@apply border-blue-500;
		@apply border-b-1;
		@apply pb-1;
		@apply pt-3;
	}
	#markdown > :global(h3) {
		@apply text-xl;
		@apply pb-1;
	}
	#markdown > :global(h4) {
		@apply font-semibold;
		@apply pb-1;
		@apply pt-3;
	}
	#markdown > :global(p) {
		@apply text-lg;
		@apply py-3;
	}

	#markdown > :global(ul) {
		@apply text-lg;
		@apply list-disc;
		@apply ml-5;
	}
	:global(pre) {
		@apply bg-gray-900;
		@apply rounded-md;
		@apply p-2;
		@apply overflow-x-auto;
	}
	:global(code) {
		@apply bg-gray-900;
		@apply rounded-md;
		@apply p-1;
		/*@apply p-1;*/
		/*@apply px-2;*/
	}
	:global(article) {
		@apply w-full;
	}
</style>
