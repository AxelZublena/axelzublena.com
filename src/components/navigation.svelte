<script>
	import MenuText from './menu-text.svelte';

	export let segment;

	let links = [
		{
			text: 'Home',
			href: '/'
		},
		{
			text: 'About',
			href: '/about'
		},
		{
			text: 'Projects',
			href: '/projects'
		}
	];
</script>

<div class="flex flex-col  bg-grey-800 rounded-xl shadow-md p-5">
	<h1 class="text-4xl text-red-dark mb-6">Axel<br />Zublena</h1>
	{#each links as link}
		<MenuText text={link.text} href={link.href} {segment} />
	{/each}
</div>

<style>
</style>
