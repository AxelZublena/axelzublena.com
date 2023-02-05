<script>
	import DownloadButton from "$lib/components/DownloadButton.svelte";
</script>

<svelte:head>
	<title>Home</title>
	<meta
		name="description"
		content="Axel Zublena's description. What I do, what I like and how to contact me."
	/>
</svelte:head>
<h1 class="text-3xl sm:text-5xl text-blue-400 text-center pb-5">Home</h1>
<div class="content py-2">
	<img
		src="/profile_pic.jpg"
		alt="profile_pic.jpg"
		width="500"
		height="500"
		class="object-cover mr-5 mb-1 mt-2 sm:mb-0.5 h-28 w-28 sm:h-36 sm:w-36 lg:h-44 lg:w-44 rounded-xl float-left"
	/>
	<div class="text-justify">
		<h2 class="text-2xl sm:text-3xl pb-3">About me</h2>
		<p class="text-justify mb-3">
			Hi! I'm a 3rd-year student at HZ University of Applied Sciences. I'm
			studying ICT (Information and Communication Technologies), majoring
			in software engineering. After I obtained my high school diploma in
			France, I decided to go abroad to do a bachelor in the Netherlands.
		</p>
		<p class="text-justify">
			Since I started my studies, I've had the opportunity to learn web
			development and data science. After learning the fundamentals of
			CI/CD, I became passionate about cloud technologies. I am an AWS
			Certified Cloud Practitioner and can deploy CI/CD pipelines with
			Microsoft's Azure. <br /> Recently, I completed a cybersecurity
			minor at Anderson University in South Carolina, USA. During this
			semester I was able to learn the fundamentals of cybersecurity.
			Taking part in the National Cyber League Fall game allowed me to use
			my acquired knowledge in web development, cloud and cybersecurity.
			<br /> Finally, I've worked on many meaningful projects applying the
			Agile methodology. I like understanding the needs of stakeholders, translating
			them into pertinent solutions and developing them.
		</p>
	</div>
</div>
<div class="pt-5">
	<div class="grid grid-flow-row md:grid-flow-col gap-5">
		<div>
			<h2 class="text-2xl sm:text-3xl pb-3">Contact</h2>
			<div class="flex-none">
				<p class="text-lg sm:text-lg">
					<span class="text-blue-300">Email</span>:
					axel.zublena@gmail.com
				</p>
				<p class="text-lg sm:text-lg">
					<span class="text-blue-300">Linkedin</span>:
					<a
						href="https://www.linkedin.com/in/axel-zublena"
						target="_blank"
						rel="noreferrer">www.linkedin.com/in/axel-zublena</a
					>
				</p>
				<p class="text-lg sm:text-lg">
					<span class="text-blue-300">GitHub</span>:
					<a
						href="https://github.com/AxelZublena"
						target="_blank"
						rel="noreferrer">github.com/AxelZublena</a
					>
				</p>
				<p class="text-lg sm:text-lg">
					<span class="text-blue-300">Phone France</span>: +33 7 69 75
					39 08
				</p>
				<p class="text-lg sm:text-lg">
					<span class="text-blue-300">Phone Netherlands</span>: +31 6
					45 45 81 52
				</p>
			</div>
		</div>

		<div>
			<h2 class="text-2xl sm:text-3xl pb-3">More</h2>
			<div class="flex-none">
				<p class="text-lg sm:text-lg">
					<span class="text-blue-300">Certification</span>:
					<a
						href="https://www.credly.com/earner/earned/share/9246d2ea-d1cc-4c38-8827-8e5663190cb5"
						target="_blank"
						rel="noreferrer">Certfied Cloud Practitioner</a
					>
				</p>
				<p class="text-lg sm:text-lg">
					<span class="text-blue-300"
						>National Cyber League Fall 2022</span
					>:
					<a
						href="/ncl.pdf"
						download="NCL_Fall_2022_TeamGame_Axel_Zublena.pdf"
						target="_blank"
						rel="noreferrer">80th out of 3926</a
					>
				</p>
				<h2 class="text-lg sm:text-2xl pb-1 pt-2">Resume</h2>
				<div class="flex gap-2">
					<DownloadButton
						fileURL="/AxelZublenaCV-EU.pdf"
						fileName="AxelZublenaCV-EU.pdf"
						text="Download EU CV"
					/>
					<DownloadButton
						fileURL="/AxelZublenaCV-US.pdf"
						fileName="AxelZublenaCV-US.pdf"
						text="Download US CV"
					/>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
</style>
