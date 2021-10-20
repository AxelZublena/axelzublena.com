<script context="module">
	export async function load({ fetch }) {
		const res = await fetch("/api");
		const jsonRes = await res.json();
		return {
			props: {
				posts: jsonRes.posts
			}
		};
	}
</script>

<script>
	/*export let user;*/
	export let posts;
</script>

<svelte:head>
	<title>Blog</title>
</svelte:head>
<h1 class="text-5xl text-blue-400 pb-5">Blog</h1>
<!--
{#if user}
	<h2 class="text-2xl">
		Hello <span class="text-blue-300">{user.name}</span>, you can create, edit and delete posts
	</h2>
{/if}
-->

<ul>
	{#each posts as post}
		<li>
			<a href="/blog/{post._id}">
				{post.title}:{post.date}:{post.file.name}
			</a>
			<a href="/blog/{post._id}/update">
				<button
					class="bg-blue-400 hover:bg-gray-400 w-full sm:w-auto justify-center text-gray-900 font-bold p-5 rounded-xl inline-flex items-center"
				>
					Edit post
				</button>
			</a>
		</li>
	{/each}
</ul>
<a href="/blog/create">
	<button
		class="bg-blue-400 hover:bg-gray-400 w-full sm:w-auto justify-center text-gray-900 font-bold p-5 rounded-xl inline-flex items-center"
	>
		Create Post
	</button>
</a>
