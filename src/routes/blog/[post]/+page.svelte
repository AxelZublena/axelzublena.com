<script>
	export let data;
</script>

<svelte:head>
	<title>Blog - {data.title}</title>
	<meta name="description" content={data.title} />
</svelte:head>

<h1 class="text-4xl text-blue-400 text-center pb-5">{data.title}</h1>
<div class="post">{@html data.file.text}</div>

<style lang="postcss">
</style>
