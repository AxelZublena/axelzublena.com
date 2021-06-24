<script>
	export let segment;
</script>

<div
	class="bg-white rounded-xl shadow-md p-5 
"
>
	<ul class="">
		<li class="">
			<a href="/" class={segment === '/' ? 'current' : ''}>Home</a>
		</li>
		<li class="">
			<a href="/about" class={segment === '/about' ? 'current' : ''}>About</a>
		</li>
		<li class="">
			<a href="/projects" class={segment === '/projects' ? 'current' : ''}>Projects</a>
		</li>
	</ul>
</div>
