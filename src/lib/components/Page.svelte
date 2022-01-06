<script lang="ts">
	export let segment;
	let links = [
		{
			text: "Home",
			href: "/",
		},
		{
			text: "Projects",
			href: "/projects",
		},
		{
			text: "Blog",
			href: "/blog",
		},
	];

	$: linksIndex = links.findIndex((link) => link.href == segment);
	$: pageTitle = linksIndex > -1 ? links[linksIndex].text : "";
</script>

<div
	id="content"
	class="overflow-y-scroll p-5 sm:p-10 bg-01dp rounded-xl shadow-xl border-08dp border-2 max-h-full"
>
	<slot />
</div>

<style lang="postcss">
	div::-webkit-scrollbar {
		width: 12px; /* width of the entire scrollbar */
	}

	div::-webkit-scrollbar-track {
		background: transparent; /* color of the tracking area */
	}

	div::-webkit-scrollbar-thumb {
		background-color: cornflowerblue; /* color of the scroll thumb */
		border-radius: 20px; /* roundness of the scroll thumb */
		border: 3px solid #1d1d1d; /* creates padding around scroll thumb */
	}
</style>
