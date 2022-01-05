<script context="module">
	export async function load({ url, session }) {
		if (
			/.*(create|update|edit|delete)/.test(url.pathname) &&
			session.user === ""
		) {
			return { redirect: "/", status: 302 };
		}
		return {
			props: {
				segment: url.pathname,
			},
		};
	}
</script>

<script lang="ts">
	import "../app.css";
	import Menu from "$lib/components/Menu.svelte";
	import Page from "$lib/components/Page.svelte";
	import Transition from "$lib/components/Transition.svelte";

	export let segment: string;
</script>

<div class="flex h-screen xl:overflow-hidden font-ubuntu ">
	<div
		class="flex flex-col xl:flex-row m-auto h-screen w-screen xl:w-auto overflow-hidden px-6"
	>
		<aside class="xl:h-screen sticky top-0 xl:pr-3 py-3 pt-6 xl:py-6">
			<Menu {segment} />
		</aside>
		<main
			class="xl:pl-3 xl:max-w-screen-lg py-3 pb-6 xl:py-6 overflow-hidden"
		>
			<Transition refresh={segment}>
				<Page {segment}>
					<slot />
				</Page>
			</Transition>
		</main>
	</div>
</div>
