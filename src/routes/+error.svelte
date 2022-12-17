<!-- </script> -->
<script>
	import { page } from "$app/stores";
</script>

<!-- <script context="module"> -->
<!-- 	/** @type {import('@sveltejs/kit').ErrorLoad} */ -->
<!-- 	export function load({ error, status }) { -->
<!-- 		return { -->
<!-- 			props: { -->
<!-- 				code: status, -->
<!-- 				error: error, -->
<!-- 			}, -->
<!-- 		}; -->
<!-- 	} -->
<!-- </script> -->
<!---->
<!-- <script lang="ts"> -->
<!-- 	import "../app.css"; -->
<!---->
<!-- 	export let code: string; -->
<!-- 	export let error: any; -->

<h1>{$page.status}: {$page.error.message}</h1>
<!-- <h1 class="text-blue-400 text-3xl pb-5">Error {code}</h1> -->
<!-- <h1 class="text-xl">{error.message}</h1> -->
