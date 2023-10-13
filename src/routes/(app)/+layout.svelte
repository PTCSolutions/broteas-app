<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
</script>

<div class="flex-row flex bg-gray-50 dark:bg-gray-800 dark:text-white">
	<NavBar />
	<div class="grow ml-32">
		<slot />
	</div>
</div>
