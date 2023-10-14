<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	// import { browser } from '$app/environment';
	// import { userProfileStore } from '$lib/stores/userStore';

	// if (browser && $userProfileStore?.user == null) {
	// 	// to prevent error window is not defined, because it's SSR
	// 	window.location.href = '/signup';
	// }
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
