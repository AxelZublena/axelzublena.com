<svelte:head>
	<title>Home</title>
	<meta
		name="description"
		content="Axel Zublena's description. What I do, what I like and how to contact me."
	/>
</svelte:head>
<h1 class="text-5xl text-blue-400 text-center pb-5">Home</h1>
<div class="content py-2">
	<img
		src="/profile_pic.jpg"
		alt="profile_pic.jpg"
		width="500"
		height="500"
		class="object-cover mr-5 mb-1 mt-2 sm:mb-0.5 h-28 w-28 sm:h-36 sm:w-36 lg:h-44 lg:w-44 rounded-xl float-left"
	/>
	<div class="text-justify">
		<h2 class="text-3xl pb-3">About me</h2>
		<p class="text-justify mb-3">
			Hi! I&#39;m a 2nd-year student at HZ University of Applied Sciences. I&#39;m studying ICT
			(Information and Communication Technologies), majoring in software engineering. After I
			obtained my high school diploma in France, I decided to go abroad to pursue a bachelor in the
			Netherlands.
		</p>
		<p class="text-justify">
			Since middle school, I&#39;ve tried almost every facet of computer science: programming (C/C++
			with Arduino, Python, C#, Java, Javascript, and many more), data science (Machine Learning
			algorithms, Deep Learning with TensorFlow,...), game development (Unreal Engine and Unity),
			operating systems (Linux and Windows) and cyber security. <br />Nowadays, I like to learn how
			to create web applications with PHP (Laravel) and Javascript/TypeScript (mainly Svelte with
			NodeJS). I also really enjoy working with Linux, Docker containers and all the tasks related
			to DevOps (CI/CD, deploying an app (SSL certificates, Nginx/Apache), ...).
		</p>
	</div>
</div>
<div class="pt-5">
	<h2 class="text-3xl pb-3">Contact &amp; CV</h2>
	<div class="grid grid-flow-row md:grid-flow-col gap-5">
		<div class="flex-none">
			<p class="text-xl"><span class="text-blue-300">Email</span>: axel.zublena@gmail.com</p>
			<p class="text-xl">
				<span class="text-blue-300">Linkedin</span>:
				<a href="https://www.linkedin.com/in/axel-zublena">www.linkedin.com/in/axel-zublena</a>
			</p>
			<p class="text-xl"><span class="text-blue-300">Phone France</span>: +33 7 69 75 39 08</p>
			<p class="text-xl">
				<span class="text-blue-300">Phone Netherlands</span>: +31 6 45 45 81 52
			</p>
		</div>
		<div class="flex-none">
			<a href="/cv.pdf" download="AxelZublenaCV.pdf"
				><button
					class="bg-blue-400 hover:bg-gray-400 w-full sm:w-auto justify-center text-gray-900 font-bold p-5 rounded-xl inline-flex items-center"
					><svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
						/></svg
					>
					<span>Download my CV</span></button
				></a
			>
		</div>
	</div>
</div>

<style lang="postcss">
</style>
