<script context="module">
	export const load = async ({ page }) => ({
		props: {
			key: page.path
		}
	});
</script>

<script>
	import '../app.postcss';
	import Nav from '../components/Navigation.svelte';
	import PageTransition from '../components/PageTransition.svelte';
	export let key;
</script>

<div
	class="flex lg:flex-row flex-col justify-center mx-auto gap-6 lg:py-24 py-4 max-w-lg xl:max-w-6xl lg:max-w-4xl md:max-w-2xl sm:max-w-xl"
>
	<Nav segment={key} />

	<div class="w-full h-screen">
		<PageTransition refresh={key}>
			<slot />
		</PageTransition>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');
	div {
		font-family: 'Ubuntu', sans-serif;
	}
</style>
