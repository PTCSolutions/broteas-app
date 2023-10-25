<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	let ready = false;
	onMount(() => (ready = true));
</script>

<!-- CD Image With tagline at the top overlapping-->
<!-- <div class="w-full min-h-screen background pt-16">
    <div class="flex flex-col items-center justify-center">
    <div class="text-6xl z-10 absolute top-32" in:fade>DISCUSS, DISCOVER, <span class="font-semibold">DISCO</span></div>
    <img src="/CD.svg" alt="CD" class="w-7/12 ">
    </div>
</div> -->
{#if ready}
<div class="w-full, min-h-screen background flex flex-col items-center pt-32">
	<div class="flex flex-col gap-20">
		<div class="text-6xl font-semibold tracking-widest" in:fade={{ duration: 2000 }}>
			DISCUSS, DISCOVER, <span class="font-bold text-red-600">DISCO</span>
		</div>
		<div class="w-1/2" in:fly={{ y: 200, duration: 2000, delay: 1000 }}>
			<div class="text-4xl leading-snug">
				Disco is a new platform for communities centred around a love for music
			</div>
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
