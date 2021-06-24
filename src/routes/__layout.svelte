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

<div class="px-5 max-w-lg xl:max-w-6xl lg:max-w-4xl md:max-w-2xl sm:max-w-xl mx-auto h-screen">
	<div class="flex gap-6 h-full content-center py-24">
		<Nav segment={key} />

		<PageTransition refresh={key}>
			<slot />
		</PageTransition>
	</div>
</div>
