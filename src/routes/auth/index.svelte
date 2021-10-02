<script>
	import Login from "$lib/components/Login.svelte";
	import Register from "$lib/components/Register.svelte";
	import { goto } from "$app/navigation";

	function redirectToProfile() {
		goto("/blog");
	}
</script>

<svelte:head>
	<title>Auth</title>
</svelte:head>

<h1 class="text-5xl text-blue-400 pb-5">Authentication page</h1>

<main>
	<Login on:success={redirectToProfile} />
	<Register on:success={redirectToProfile} />
</main>
