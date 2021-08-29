<div
	class="text-gray-200 bg-grey-1 border-2 border-solid border-gray-200 rounded-xl shadow-xl p-5 lg:max-h-3/4 overflow-auto"
>
	<slot />
</div>

<style>
	::-webkit-scrollbar {
		width: 20px;
	}

	/* Track */
	::-webkit-scrollbar-track {
		background-color: transparent;
		border-radius: 100px;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		border-radius: 100px;
		border: 6px solid transparent;
		background-clip: content-box;
		background-color: #cfd2d8;
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		border-radius: 100px;
		border: 5px solid transparent;
		background-clip: content-box;
		background-color: #ffffff;
	}
</style>
