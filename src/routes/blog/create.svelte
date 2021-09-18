<script>
	import { goto } from '$app/navigation';
	import { Buffer } from 'buffer';

	let title = '';
	let date = '';
	let body = '';

	async function createPost() {
		try {
			const post = {
				title,
				date,
				body
			};
			await fetch('/api', {
				method: 'POST',
				body: JSON.stringify(post)
			});
			await goto('/blog');
		} catch (err) {
			alert('Failed to create the post.');
			console.error(err.message);
			title = '';
			date = '';
			body = '';
		}
	}

	/*async function uploadFile(e) {
		try {
			const file = e.target.files[0];
    console.log(file);
			if (file.size >= 16777216) {
				throw new Error('File size is more or equal to 16MB.');
			}
    const dataURL = await toBase64(file);
    const data = {
        fileDataURL: dataURL,
    fileName: file.name
			};
    await fetch('/api/file', {
        method: 'POST',
    body: JSON.stringify(data)
			});
		} catch (err) {
        console.error(err.message);
		}
	}*/
	async function uploadFile(e) {
		try {
			const file = e.target.files[0];
			if (file.size >= 16777216 && file.name.split('.')[1] != 'md') {
				throw new Error('File size is more or equal to 16MB.');
			}
			const fileText = await readFile(file);
			const data = {
				fileText: fileText,
				fileName: file.name
			};
			await fetch('/api/file', {
				method: 'POST',
				body: JSON.stringify(data)
			});
		} catch (err) {
			console.error(err.message);
		}
	}
	const readFile = (file) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsText(file, 'utf-8');
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
</script>

<svelte:head>
	<title>Create new Post</title>
</svelte:head>

<h1 class="text-5xl text-blue-400 pb-5">Create new post</h1>
<div class="grid grid-flow-row">
	<label for="title" class="text-3xl">Title</label>
	<input type="text" name="title" id="title" bind:value={title} placeholder="Title" />
	<label for="body" class="text-3xl">Body</label>
	<textarea name="body" id="body" bind:value={body} cols="30" rows="10" />
	<label for="file" class="text-3xl">File</label>
	<input type="file" id="file" name="file" on:change={uploadFile} />
	<label for="date" class="text-3xl">Date</label>
	<input type="date" name="date" id="date" bind:value={date} />
	<button
		on:click={createPost}
		class="bg-blue-400 hover:bg-gray-400 w-full sm:w-auto justify-center text-gray-900 font-bold p-5 rounded-xl inline-flex items-center"
	>
		Add a post
	</button>
</div>
