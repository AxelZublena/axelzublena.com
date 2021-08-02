<script>
	export let text;
	export let href;
	export let segment;
</script>

<div class="">
	<a
		{href}
		class={segment === href
			? 'current font-bold text-white mx-3 lg:text-2xl text-4xl'
			: 'text-gray-200 hover:text-white mx-3 lg:text-xl text-2xl'}
	>
		{text}
	</a>
</div>
