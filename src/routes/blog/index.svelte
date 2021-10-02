<script context="module">
	export async function load({ fetch, session }) {
		if (!session.user.authenticated) {
			return {
				status: 302,
				redirect: "/auth/unauthorized"
			};
		} else {
			const res = await fetch("/api");
			const jsonRes = await res.json();
			return {
				props: {
					posts: jsonRes.posts,
					email: session.user.email
				}
			};
		}
	}
</script>

<script>
	import { onMount } from "svelte";
	export let posts;
	export let email;

	let name;

	onMount(async () => {
		const res = await fetch("/user");
		const user = await res.json();
		name = user.name;
		email = user.email;
	});
</script>

<svelte:head>
	<title>Blog</title>
</svelte:head>
<h1 class="text-5xl text-blue-400 pb-5">Blog</h1>
<h2>Hello {email}:{name}</h2>

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
