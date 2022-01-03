<script context="module">
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
	import { goto } from '$app/navigation';
	export let post = { title: '', file: { text: '', name: '' }, date: '' };
	let title = post.title;
	let date = post.date;

	async function updatePost() {
		post.title = title;
		post.date = date;
		try {
			await fetch('/blog/posts', {
				method: 'PUT',
				body: JSON.stringify(post)
			});
			await goto('/blog');
		} catch (err) {
			alert('There was an error.');
		}
	}
	async function deletePost() {
		try {
			await fetch('/blog/posts', {
				method: 'DELETE',
				body: JSON.stringify(post)
			});
			await goto('/blog');
		} catch (err) {
			alert('There was an error.');
		}
	}
</script>

<svelte:head>
	<title>Edit Post</title>
</svelte:head>

<h1 class="text-5xl text-blue-400 pb-5">Edit post</h1>
<div class="grid grid-flow-row">
	<label for="title" class="text-3xl">Title</label>
	<input
		type="text"
		name="title"
		id="title"
		class="text-black"
		bind:value={title}
		placeholder="Title"
	/>
	<label for="date" class="text-3xl">Date</label>
	<input type="date" name="date" id="date" class="text-black" bind:value={date} />

	<div>
		<button
			on:click={updatePost}
			class="bg-blue-400 hover:bg-gray-400 w-full sm:w-auto justify-center text-gray-900 font-bold p-5 rounded-xl inline-flex items-center"
		>
			Update
		</button>
		<button
			on:click={deletePost}
			class="bg-red-fr hover:bg-gray-400 w-full sm:w-auto justify-center text-gray-900 font-bold p-5 rounded-xl inline-flex items-center"
		>
			Delete
		</button>
	</div>
</div>
