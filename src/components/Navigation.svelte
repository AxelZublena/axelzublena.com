<script>
	import MenuText from './MenuText.svelte';

	export let segment;

	let links = [
		{
			text: 'Home',
			href: '/'
		},
		{
			text: 'Skills',
			href: '/skills'
		},
		{
			text: 'Projects',
			href: '/projects'
		}
	];
</script>

<div class="flex flex-col bg-grey-1 border-2 border-solid border-gray-200 rounded-xl shadow-xl p-5">
	<h1 class="text-4xl text-blue-400 mb-1">Axel<br />Zublena</h1>
	<p class="text-ml text-gray-300 mb-5">ICT Student</p>
	{#each links as link}
		<MenuText text={link.text} href={link.href} {segment} />
	{/each}
</div>

<style>
</style>
