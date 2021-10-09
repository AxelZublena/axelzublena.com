<script context="module">
	export async function load({ fetch, page, session }) {
		/*let authenticated = true;*/
		/*if (!session.user.authenticated || session.user.email === undefined) {*/
		/*authenticated = false;*/
		/*}*/
		let user = undefined;
		if (session.user.authenticated) {
			const res = await fetch("/user");
			user = await res.json();
		}

		return {
			props: {
				key: page.path,
				user
			}
		};
	}
</script>

<script>
	import "../app.postcss";
	import Nav from "$lib/components/Navigation.svelte";
	import PageTransition from "$lib/components/PageTransition.svelte";
	import Page from "$lib/components/Page.svelte";
	import { onMount } from "svelte";

	export let key;
	/*export let email;*/
	/*export let authenticated;*/

	export let user;
	$: console.log(user);

	/*onMount(async () => {*/
	/*const res = await fetch("/user");*/
	/*user = await res.json();*/
	/*console.log(user);*/
	/*});*/

	const restrictRoutes = ["/blog/create", "/blog/[post]/update"];

	function canSeeContent() {
		return true;
	}
</script>

<svelte:head>
	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-RGZW9RM2W6"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag("js", new Date());

		gtag("config", "G-RGZW9RM2W6");
	</script>
</svelte:head>

<!--
<div class="flex lg:flex-row flex-col justify-center mx-auto gap-6 lg:py-24 py-4 w-4/5">
<div>
	<h1 class="text-white">Hello {name}:{email}</h1>
	<h2 class="text-white">authenticated: {authenticated}</h2>
</div>

<div>
	<h1 class="text-white">Hello {user.name}</h1>
</div>
-->

<div
	class="flex lg:flex-row flex-col justify-center mx-auto gap-6 lg:py-24 py-4 max-w-lg xl:w-4/5 xl:max-w-6xl lg:max-w-4xl md:max-w-2xl sm:max-w-xl"
>
	<Nav segment={key} />

	<div class="lg:w-5/6 h-screen">
		<PageTransition refresh={key}>
			<Page>
				{#if canSeeContent()}
					<slot {user} />
				{:else}
					<h1>Unauthorized</h1>
				{/if}
			</Page>
		</PageTransition>
	</div>
</div>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap");
	div {
		font-family: "Ubuntu", sans-serif;
	}
</style>
