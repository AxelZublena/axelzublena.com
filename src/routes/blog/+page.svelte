<script lang="ts">
	import { page } from "$app/stores";
	import { signOut } from "@auth/sveltekit/client";

	export let data: any;
	let posts = data.values.posts;
	let user: any = undefined;

	const options = {
		year: "numeric",
		month: "long",
		day: "numeric",
	};

	if (Object.keys($page.data.session || {}).length) {
		user = $page.data.session.user;
		if (user.name != "Axel Zublena") {
			user = undefined;
		}
	}
</script>

<svelte:head>
	<title>Blog</title>
	<meta
		name="description"
		content="Blog: articles/blog posts that might help you."
	/>
</svelte:head>

<p class="text-blue-400 text-3xl pb-5">Blog posts that might help you</p>

{#if user}
	<h2 class="text-2xl pb-5">
		Hello <span class="text-blue-300">{user.name}</span>, you can create,
		edit and delete posts
	</h2>
{/if}

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
			{#if user}
				<a href="/blog/{post._id}/update" class="justify-self-end">
					<button
						class="bg-blue-400 hover:bg-gray-400 w-full sm:w-auto justify-center text-gray-900 font-bold p-5 rounded-xl inline-flex items-center"
					>
						Edit post
					</button>
				</a>
			{/if}
		</div>
	{/each}
</div>
{#if user}
	<div class="pt-5">
		<button
			class="bg-red-600 hover:bg-gray-400 w-full sm:w-auto justify-center text-white font-bold px-3 py-2 rounded-xl inline-flex items-center mt-2"
			on:click={() => signOut()}>Sign out</button
		>
		<a href="/blog/create">
			<button
				class="bg-green-600 hover:bg-gray-400 w-full sm:w-auto justify-center text-white font-bold px-3 py-2 rounded-xl inline-flex items-center mt-2"
				>Create Post</button
			>
		</a>
	</div>
{/if}
