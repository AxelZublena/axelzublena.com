<script lang="ts">
	import MenuText from '$lib/components/MenuText.svelte';
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

	let opened = false;
	let style = 'hidden';
	function burgerClick() {
		opened = !opened;
		opened ? (style = 'block') : (style = 'hidden');
	}
</script>

<nav class="justify-self-end col-span-1 bg-01dp rounded-xl shadow-xl border-08dp border-2">
	<div class="flex lg:flex-col items-center lg:items-start justify-between px-5 py-2 lg:py-5">
		<div>
			<h1 class="text-4xl text-blue-400 mb-1">Axel<br />Zublena</h1>
			<p class="text-ml text-gray-300 lg:mb-5 hidden lg:block">ICT Student</p>
		</div>
		<div class="hidden lg:block lg:flex-col items-start">
			{#each links as link}
				<MenuText text={link.text} href={link.href} {segment} />
			{/each}
			<!--
                {#if email}
					<MenuText text="Logout" href="/home" {segment} />
				{/if}
                -->
		</div>
		<div class="flex items-center sm:hidden">
			<p class="text-3xl text-white pr-5">{pageTitle}</p>
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
	<div class="{style} lg:hidden sm:flex sm:items-center p-5">
		{#each links as link}
			<MenuText text={link.text} href={link.href} {segment} />
		{/each}
	</div>
</nav>
