<script lang="ts">
	import SearchWidget from './SearchWidget.svelte';
	import type { Song, Album, Artist } from '$lib/spotify';
	import ShareObjectWidget from '$lib/components/ShareObjectWidget.svelte';
	// Should the modal display the search widget
	export let search: boolean = true;
	// Object selected in the search widget
	export let objectSelected: Song | Album | Artist | null = null;
	// Should the modal be open
	export let showModal : boolean;
</script>

<div class="flex flex-col bg-white dark:bg-gray-800 dark:text-white overflow-hidden w-[550px]">
	<!-- On clikcing an objectcard change from search to object page-->
	{#if search}
		<div class="font-medium mx-4 text-xl text-black mb-1">
			Search for a song, artist or album to talk about
		</div>
		<SearchWidget onObjectCardClicked={() => search = false} userSearchOn={false} bind:objectSelected/>
	{:else}
		<ShareObjectWidget bind:showModal object={objectSelected} objectType={objectSelected?.type} />
	{/if}
</div>
