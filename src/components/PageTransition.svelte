<script>
	import { fly } from "svelte/transition";
	import Page from "./Page.svelte";

	export let refresh = "";
</script>

{#key refresh}
	<div
		in:fly={{ y: 50, duration: 250, delay: 300 }}
		out:fly={{ y: 50, duration: 250 }}
		class="h-full"
	>
		<Page>
			<slot />
		</Page>
	</div>
{/key}
