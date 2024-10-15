<script lang="ts">
	import MobileNavBar from '$lib/components/MobileNavBar.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
</script>

<div class="flex-row flex bg-gray-100 dark:bg-gray-800 dark:text-white min-h-screen">
	<NavBar />
	<div class="md:hidden">
		<MobileNavBar />
	</div>

	<div class="grow md:ml-32 h-full">
		<slot />
	</div>
</div>
