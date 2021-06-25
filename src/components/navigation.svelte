<script>
	import MenuTextAnimation from './MenuTextAnimation.svelte';

	let size = 'text-xl';

	export let segment;
</script>

<div class="flex flex-col text-white pr-32">
	<div>
		<a href="/" class={segment === '/' ? 'current' : ''}>
			<MenuTextAnimation {size}>Home</MenuTextAnimation>
		</a>
	</div>
	<div>
		<a href="/about" class={segment === '/about' ? 'current' : ''}>
			<MenuTextAnimation {size}>About</MenuTextAnimation>
		</a>
	</div>
	<div>
		<a href="/projects" class={segment === '/projects' ? 'current' : ''}>
			<MenuTextAnimation {size}>Projects</MenuTextAnimation>
		</a>
	</div>
</div>
