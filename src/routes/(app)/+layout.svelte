<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
</script>

<div class="flex-row flex bg-gray-100 dark:bg-gray-800 dark:text-white min-h-screen">
	<NavBar />
	<div class="grow ml-32 h-full">
		<slot />
	</div>
</div>
