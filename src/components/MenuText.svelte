<script>
	export let text;
	export let href;
	export let segment;
</script>

<div>
	<a
		{href}
		class={segment === href
			? 'current font-bold text-white mx-2 lg:text-2xl text-3xl'
			: 'text-gray-200 hover:text-white mx-2 lg:text-xl text-2xl'}
	>
		{text}
	</a>
</div>
