<script>
	export let fileURL;
	export let fileName;
	export let text;
</script>

<div>
	<a href={fileURL} download={fileName}
		><button
			class="bg-blue-400 hover:bg-gray-400 w-full sm:w-auto justify-center text-gray-900 font-bold px-4 py-3 rounded-xl inline-flex items-center"
			><svg
				class="h-8 w-8"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
				/></svg
			>
			<span class="pl-2">{text}</span></button
		></a
	>
</div>
