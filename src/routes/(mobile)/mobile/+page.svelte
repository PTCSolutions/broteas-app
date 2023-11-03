<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	
	onMount(() => {
		console.log(window.innerWidth)
		if (window.innerWidth >= 800) {
			goto('/welcome');
		}
	});
</script>

<div class="overflow-hidden">
	<img
		class="z-0 overflow-hidden min-h-screen object-cover fixed bottom-0"
		src="/DiscoHead.png"
		alt=""
	/>
	<div class="flex flex-col m-8 fixed top-10 items-center">
		<div class="text-3xl font-semibold">welcome to</div>
		<div class="h-4" />

		<!-- <div class="text-8xl font-black tracking-wide">Disco</div> -->
		<img src="/D1SCO_Logo.png" alt="Logo">

		<div class="h-4" />
		<div class="text-xl font-medium text-justify">
			sadly we're still working on our mobile site so to join in with the discussion visit D1SCO on
			a large screen device like your laptop.
		</div>
	</div>
</div>
