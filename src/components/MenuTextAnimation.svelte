<script>
	export let size;

	function mouseOver() {
		size = 'text-2xl';
	}
	function mouseOut() {
		size = 'text-xl';
	}
</script>

<span on:mouseover={mouseOver} on:mouseout={mouseOut} class={size}>
	<slot />
</span>
