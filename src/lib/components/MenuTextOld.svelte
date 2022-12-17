<script>
	export let text;
	export let href;
	export let segment;

	$: console.log(`segment = ${segment} \nhref = ${href}`);

	$: isSelected = () => {
		if (segment.length === 1 && segment === href) {
			return true;
		} else if (
			segment.length > 1 &&
			href.length > 1 &&
			segment.includes(href)
		) {
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
			? "current font-bold text-white mx-2 text-2xl sm:text-3xl xl:text-2xl"
			: "text-gray-200 hover:text-white mx-2 text-xl sm:text-2xl xl:text-xl"}
	>
		<!-- <a> -->
		{text}
		<!-- </a> -->
	</a>
</div>
