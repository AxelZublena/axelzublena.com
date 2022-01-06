<script lang="ts">
	import MenuText from "$lib/components/MenuText.svelte";
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

	let opened = false;
	let style = "hidden";
	let styleTitle = "block";
	function burgerClick() {
		opened = !opened;
		opened ? (style = "block") : (style = "hidden");
		opened ? (styleTitle = "hidden") : (styleTitle = "block");
	}
</script>

<nav
	class="justify-self-end col-span-1 bg-01dp rounded-xl shadow-xl border-08dp border-2"
>
	<div
		class="flex xl:flex-col items-center xl:items-start justify-between px-5 py-2 xl:py-5"
	>
		<div>
			<h1 class="text-2xl sm:text-4xl text-blue-400 mb-1">
				Axel<br />Zublena
			</h1>
			<p class="text-ml text-gray-300 xl:mb-5 hidden sm:block">
				ICT Student
			</p>
		</div>
		<div class="hidden sm:flex xl:block xl:flex-col">
			{#each links as link}
				<MenuText text={link.text} href={link.href} {segment} />
			{/each}
		</div>
		<div class="flex items-center sm:hidden justify-end">
			<p class="{styleTitle} text-xl text-white pr-2">{pageTitle}</p>
			<button on:click={burgerClick}>
				<svg
					id="openBurger"
					class="h-10 w-10 text-white"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					{#if opened}
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					{:else}
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 10h16M4 14h16M4 18h16"
						/>
					{/if}
				</svg>
			</button>
		</div>
	</div>
	<div class="{style} sm:hidden pb-5  flex justify-center">
		{#each links as link}
			<MenuText text={link.text} href={link.href} {segment} />
		{/each}
	</div>
</nav>
