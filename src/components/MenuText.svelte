<script>
	export let text;
	export let href;
	export let segment;
</script>

<div>
	<a
		{href}
		class={segment === href
			? 'current text-2xl font-bold text-white'
			: 'text-xl text-gray-200 hover:text-white'}
	>
		{text}
	</a>
</div>
