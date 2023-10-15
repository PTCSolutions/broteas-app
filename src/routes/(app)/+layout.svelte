<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
</script>

<link
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,100..700,0..1,-50..200"
	rel="stylesheet"
/>
<div class="flex-row flex bg-gray-100 dark:bg-gray-800 dark:text-white">
	<NavBar />
	<div class="grow ml-32 h-full">
		<slot />
	</div>
</div>
