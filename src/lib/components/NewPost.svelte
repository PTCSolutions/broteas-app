<script lang="ts">
	import SearchToShareWidget from './SearchToShareWidget.svelte';
	import type { Song, Album, Artist } from '$lib/spotify';
	import ShareObjectWidget from '$lib/components/ShareObjectWidget.svelte';
	import { horizontalSlide } from '$lib/transition/transition';
	import { fly } from 'svelte/transition';
	import { linear } from 'svelte/easing';
	// Should the modal display the search widget
	export let search: boolean = true;
	// Object selected in the search widget
	export let objectSelected: Song | Album | Artist | null = null;
	// Should the modal be open
	export let showModal : boolean;
</script>

<div class="flex flex-col bg-white dark:bg-gray-800 dark:text-white overflow-hidden w-[550px] h-[450px]">
	<!-- On clikcing an objectcard change from search to object page-->
	{#if search}
	<div out:fly={{x: -550, duration: 400, }} class="h-full">
		<div class="font-medium mx-4 text-xl mb-1">
			Search for a song, artist or album to talk about
		</div>
		<SearchToShareWidget onObjectCardClicked={() => search = false} bind:objectSelected />
		</div>
	{:else}
	<div in:fly={{x: 550, delay: 400, duration: 400, }} class="h-full">
		<ShareObjectWidget bind:showModal object={objectSelected} objectType={objectSelected?.type} />
	</div>
	{/if}
</div>
