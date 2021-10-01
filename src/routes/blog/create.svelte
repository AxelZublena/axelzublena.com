<script lang="ts">
	import { goto } from "$app/navigation";
	import { Buffer } from "buffer";

	let title = "";
	let date = "";
	let files: FileList;

	async function createPost() {
		try {
			const file = files[0];

			if (file.type !== "text/markdown") {
				throw new Error("Wrong format. Only Markdown is accepted.");
			}

			const fileText = await readFile(file);
			const post = {
				file: {
					text: fileText,
					name: file.name
				},
				date
			};

			await fetch("/api", {
				method: "POST",
				body: JSON.stringify(post)
			});
			await goto("/blog");
		} catch (err) {
			console.error(err.message);
			title = "";
			(document.getElementById("file") as HTMLInputElement).value = "";
			date = "";
		}
	}

	async function uploadFile(e) {
		try {
			const file = e.target.files[0];
			if (file.type !== "text/markdown") {
				throw new Error("Wrong format. Only Markdown is accepted.");
			}
			const fileText = await readFile(file);
			const data = {
				fileText: fileText,
				fileName: file.name
			};
			await fetch("/api/file", {
				method: "POST",
				body: JSON.stringify(data)
			});
		} catch (err) {
			console.error(err.message);
		}
	}
	const readFile = (file: File) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsText(file, "utf-8");
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
</script>

<svelte:head>
	<title>Create new Post</title>
</svelte:head>

<h1 class="text-5xl text-blue-400 pb-5">Create new post</h1>
<div class="grid grid-flow-row">
	<label for="file" class="text-3xl">File</label>
	<input type="file" id="file" name="file" bind:files />
	<label for="date" class="text-3xl">Date</label>
	<input type="date" name="date" id="date" bind:value={date} />
	<button
		on:click={createPost}
		class="bg-blue-400 hover:bg-gray-400 w-full sm:w-auto justify-center text-gray-900 font-bold p-5 rounded-xl inline-flex items-center"
	>
		Add a post
	</button>
</div>
