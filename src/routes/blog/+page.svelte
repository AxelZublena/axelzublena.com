<script lang="ts">
	export let data: any;
	let posts = data.values.posts;
	let user = data.values.user;

	const options = {
		year: "numeric",
		month: "long",
		day: "numeric",
	};
</script>

<svelte:head>
	<title>Blog</title>
	<meta
		name="description"
		content="Blog: articles/blog posts that might help you."
	/>
</svelte:head>

<p class="text-blue-400 text-3xl pb-5">Blog posts that might help you</p>

<!-- {#if user} -->
<h2 class="text-2xl pb-5">
	Hello <span class="text-blue-300">{user}</span>, you can create, edit and
	delete posts
</h2>
<!-- {/if} -->

<div class="grid grid-flow-row gap-3">
	{#each posts as post}
		<div
			class="rounded-xl border-2 border-08dp bg-00dp p-2 px-4 grid grid-flow-col content-center"
		>
			<a href="/blog/{post._id}">
				<div>
					<h3 class="text-blue-400 text-2xl">{post.title}</h3>
					<p class="text-white">
						{new Date(post.date).toLocaleDateString(
							"en-US",
							options
						)}
					</p>
				</div>
			</a>
			<!-- {#if user} -->
			<a href="/blog/{post._id}/update" class="justify-self-end">
				<button
					class="bg-blue-400 hover:bg-gray-400 w-full sm:w-auto justify-center text-gray-900 font-bold p-5 rounded-xl inline-flex items-center"
				>
					Edit post
				</button>
			</a>
			<!-- {/if} -->
		</div>
	{/each}
</div>
<!-- {#if user} -->
<div class="pt-5">
	<a rel="external" href="/logout">
		<button
			class="bg-blue-400 hover:bg-gray-400 w-full sm:w-auto justify-center text-gray-900 font-bold p-5 rounded-xl inline-flex items-center"
			>Logout</button
		>
	</a>
	<a href="/blog/create">
		<button
			class="bg-blue-400 hover:bg-gray-400 w-full sm:w-auto justify-center text-gray-900 font-bold p-5 rounded-xl inline-flex items-center"
		>
			Create Post
		</button>
	</a>
</div>
<!-- {/if} -->
