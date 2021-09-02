<script context="module">
	export function load({ error, status }) {
		return {
			props: {
				error: error,
				status: status
			}
		};
	}
</script>

<script>
	export let error;
	export let status;
</script>

{#if status === 404}
	<h1 class="text-5xl text-blue-400">Error 404</h1>
	<p class="text-4xl text-gray-200 pt-3">This page doesn't exist.</p>
{:else}
	<h1 class="text-5xl text-gray-200">{error.message}</h1>
{/if}
