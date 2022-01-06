<script>
	export let thumbnail;
	export let title;
	export let body;
	export let technologies;
	export let link_github;
	// export let link_hosted;
</script>

<div class="pb-5 flex gap-4">
	<div class="pt-2 hidden sm:block sm:w-1/6">
		<img
			src={thumbnail}
			alt="{title} thumbnail"
			class="object-cover rounded-xl h-36 w-36"
		/>
	</div>
	<div class="sm:w-5/6">
		<h2 class="text-2xl sm:text-3xl font-semibold">{title}</h2>
		<p class="text-justify">{@html body}</p>
		<div class="flex flex-col sm:flex-row sm:items-center gap-2 pt-2">
			<h4 class="font-bold text-blue-300">Technologies:</h4>
			<div class="flex flex-row pb-3 sm:pb-0">
				{#each technologies as technology}
					{#if technology == "typescript"}
						<div class="flex flex-none pl-2 items-center">
							<img
								src="/icons/typescript.svg"
								alt="TypeScript icon"
								class="rounded mr-2 w-5 h-5"
							/>
							<p class="text-white">TypeScript - OOP</p>
						</div>
					{:else if technology == "html5"}
						<div class="flex flex-none pl-2 items-center">
							<img
								src="/icons/html5.svg"
								alt="HTML5 icon"
								class="rounded mr-2 w-5 h-5"
							/>
							<p class="text-white">HTML5</p>
						</div>
					{:else if technology == "javascript"}
						<div class="flex flex-none pl-2 items-center">
							<img
								src="/icons/javascript.svg"
								alt="JavaScript icon"
								class="rounded mr-2 w-5 h-5"
							/>
							<p class="text-white">JavaScript</p>
						</div>
					{:else if technology == "node"}
						<div class="flex flex-none pl-2 items-center">
							<img
								src="/icons/node.svg"
								alt="NodeJS icon"
								class="rounded mr-2 w-5 h-5"
							/>
							<p class="text-white">NodeJS - Express</p>
						</div>
					{:else if technology == "php"}
						<div class="flex flex-none pl-2 items-center">
							<img
								src="/icons/php.svg"
								alt="PHP icon"
								class="rounded mr-2 w-5 h-5"
							/>
							<p class="text-white">PHP</p>
						</div>
					{:else if technology == "laravel"}
						<div class="flex flex-none pl-2 items-center">
							<img
								src="/icons/laravel.svg"
								alt="Laravel icon"
								class="rounded mr-2 w-5 h-5"
							/>
							<p class="text-white">Laravel</p>
						</div>
					{:else if technology == "sveltekit"}
						<div class="flex flex-none pl-2 items-center">
							<img
								src="/icons/sveltekit.svg"
								alt="SvelteKit icon"
								class="rounded mr-2 w-5 h-5"
							/>
							<p class="text-white">SvelteKit</p>
						</div>
					{:else if technology == "tailwind"}
						<div class="flex flex-none pl-2 items-center">
							<img
								src="/icons/tailwind.svg"
								alt="Tailwind icon"
								class="rounded mr-2 w-5 h-5"
							/>
							<p class="text-white">Tailwind CSS</p>
						</div>
					{:else}
						<div
							class="flex flex-none bg-red rounded px-2.5 py-1 items-center"
						>
							<p class="text-white">{technology}</p>
						</div>
					{/if}
				{/each}
			</div>
		</div>

		<h4 class="font-bold text-blue-300">
			GitHub link: <br class="sm:hidden" />
			<a
				href="https://{link_github}"
				target="_blank"
				class="text-white font-normal"
			>
				{link_github}
			</a>
		</h4>
		<!-- <h4 class="font-bold text-blue-300"> -->
		<!-- 	Demo/Hosted link: <br class="sm:hidden" /> -->
		<!-- 	<a -->
		<!-- 		href="https://{link_hosted}" -->
		<!-- 		target="_blank" -->
		<!-- 		class="text-white font-normal" -->
		<!-- 	> -->
		<!-- 		{link_hosted} -->
		<!-- 	</a> -->
		<!-- </h4> -->
	</div>
</div>
