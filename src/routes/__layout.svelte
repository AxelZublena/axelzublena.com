<script context="module">
	export const load = async ({ page }) => ({
		props: {
			key: page.path
		}
	});
</script>

<script>
	import '../app.postcss';
	import Nav from '../components/navigation.svelte';
	import PageTransition from '../components/PageTransition.svelte';
	export let key;
</script>

<div
	class="flex justify-center items-center h-screen m-auto gap-6 py-24 max-w-lg xl:max-w-6xl lg:max-w-4xl md:max-w-2xl sm:max-w-xl divide-x-2"
>
	<div class="w-28">
		<Nav segment={key} />
	</div>

	<div class="w-full">
		<PageTransition refresh={key}>
			<slot />
		</PageTransition>
	</div>
</div>
