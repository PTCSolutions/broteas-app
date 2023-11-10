<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	let ready = false;
	onMount(() => {
		if (window.innerWidth < 800) {
			console.log('mobile');
			goto('/mobile');
		}
		ready = true;
	});
    let welcome = $page.url.pathname == "/welcome";
</script>

{#if ready}
	<div class="h-full min-h-screen overflow-hidden background">
		<div class="w-full h-full min-h-screen flex flex-row gap-8 px-20 py-16 items-center">
			<div class="flex flex-col gap-6 w-full">
                <!-- Only fade in if on the welcome page-->
				<div in:fade={{ duration: welcome ? 1500 : 0 }}>
					<img src="/D1SCO_Logo.png" alt="Logo" />
				</div>

				<div class="text-3xl" in:fly={{ y: 200, duration: welcome ? 1500 : 0 , delay: welcome ? 750 : 0  }}>
					The new platform for communities centred around a love for music
				</div>
				<div class="text-3xl" in:fly={{ y: 200, duration: welcome ? 1500 : 0 , delay: welcome ? 750 : 0  }}>
					Share your favourite albums, discuss the songs you love, and learn more about your
					favourite artists
				</div>
				<div class="h-8" />
				<div class="text-2xl" in:fade={{ duration: welcome ? 1500 : 0 , delay: welcome ? 1750 : 0  }}>
					<a class="font-semibold hover:underline" href="/login">Log In</a> or
					<a class="font-semibold hover:underline" href="/signup">Sign Up</a> and get grooving today!
				</div>
			</div>
			<div class="w-full flex flex-col items-center">
				<slot />
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
