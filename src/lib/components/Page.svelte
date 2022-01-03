<script lang="ts">
	export let segment;
	let links = [
		{
			text: 'Home',
			href: '/'
		},
		{
			text: 'Projects',
			href: '/projects'
		},
		{
			text: 'Blog',
			href: '/blog'
		}
	];

	$: linksIndex = links.findIndex((link) => link.href == segment);
	$: pageTitle = linksIndex > -1 ? links[linksIndex].text : '';
</script>

<div
	id="content"
	class="overflow-y-scroll p-10 bg-01dp rounded-xl shadow-xl border-08dp border-2 max-h-full"
>
	<slot />
</div>

<style lang="postcss">
	/* Hide scrollbar for Chrome, Safari and Opera */
	div::-webkit-scrollbar {
		display: none;
	}

	/* Hide scrollbar for IE, Edge and Firefox */
	div {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
</style>
