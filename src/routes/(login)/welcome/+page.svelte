<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	let ready = false;
	onMount(() => (ready = true));
</script>

{#if ready}
	<div class="h-full min-h-screen overflow-hidden background">
		<div class="w-full h-full min-h-screen flex flex-row gap-8 px-20 py-16 items-center">
			<div class="flex flex-col gap-6 w-full">
				<div in:fade={{ duration: 1500 }}>
					<img src="/D1SCO_Logo.png" alt="Logo" />
				</div>

				<div class="text-3xl" in:fly={{ y: 200, duration: 1500, delay: 750 }}>
					The new platform for communities centred around a love for music
				</div>
				<div class="text-3xl" in:fly={{ y: 200, duration: 1500, delay: 750 }}>
					Share your favourite albums, discuss the songs you love, and learn more about your
					favourite artists
				</div>
				<div class="h-8"></div>
				<div class="text-2xl" in:fade={{ duration: 1500, delay: 1750 }}>
					<a class="font-semibold hover:underline" href="/login">Log In</a> or <a class="font-semibold hover:underline" href="/signup">Sign Up</a> and get grooving today!
				</div>
			</div>
			<div class="w-full flex flex-col items-center">
				<img class="object-resize max-h-[500px]" src="/PostEx.png" alt="Post Example" />
			</div>
		</div>
	</div>
{/if}

<style>
	.background {
		background: linear-gradient(169deg, #ebebeb 6.63%, #f3eaea 98.31%);
		font-family: 'Inter', sans-serif;
	}
</style>
