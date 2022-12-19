<script>
	import { signIn, signOut } from "@auth/sveltekit/client";
	import { page } from "$app/stores";
</script>

<p>
	{#if Object.keys($page.data.session || {}).length}
		{#if $page.data.session.user.image}
			<span
				style="background-image: url('{$page.data.session.user.image}')"
				class="avatar"
			/>
		{/if}
		<span class="signedInText">
			<small>Signed in as</small><br />
			<strong
				>{$page.data.session.user.email ||
					$page.data.session.user.name}</strong
			>
		</span><br />
		<button
			class="bg-red-600 hover:bg-gray-400 w-full sm:w-auto justify-center text-white font-bold px-3 py-2 rounded-xl inline-flex items-center mt-2"
			on:click={() => signOut()}>Sign out</button
		>
	{:else}
		<span class="notSignedInText">You are not signed in</span><br />
		<button
			class="bg-blue-400 hover:bg-gray-400 w-full sm:w-auto justify-center text-gray-900 font-bold px-3 py-2 rounded-xl inline-flex items-center mt-2"
			on:click={() => signIn("github")}>Sign In with GitHub</button
		>
	{/if}
</p>
