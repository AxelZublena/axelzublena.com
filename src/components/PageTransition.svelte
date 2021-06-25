<script>
	import { fly } from 'svelte/transition';
	export let refresh = '';
</script>

{#key refresh}
	<div
		in:fly={{ y: -50, duration: 250, delay: 300 }}
		out:fly={{ y: -50, duration: 250 }}
		class="bg-white rounded-xl shadow-md p-5 ml-12"
	>
		<slot />
	</div>
{/key}
