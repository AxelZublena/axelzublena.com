<script>
	export let text;
	export let href;
	export let segment;

	$: isSelected = () => {
		if (segment.length === 1 && segment === href) {
			return true;
		} else if (segment.length > 1 && href.length > 1 && segment.includes(href)) {
			return true;
		} else {
			return false;
		}
	};
</script>

<div>
	<a
		{href}
		class={isSelected()
			? 'current font-bold text-white mx-2 lg:text-2xl text-3xl'
			: 'text-gray-200 hover:text-white mx-2 lg:text-xl text-2xl'}
	>
		{text}
	</a>
</div>
