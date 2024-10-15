<script lang="ts">
	import type {PostObject } from '$lib/spotify';
	import SharePostWidget from '$lib/components/new_post/SharePostWidget.svelte';
	import { fly } from 'svelte/transition';
	import SearchWidget from '../SearchWidget.svelte';
	// Should the modal display the search widget
	export let search: boolean = true;
	// Object selected in the search widget
	export let objectSelected: PostObject | null = null;
	// Should the modal be open
	export let showModal: boolean;
</script>

<div
	class="flex flex-col bg-white dark:bg-gray-800 text-black dark:text-white overflow-hidden md:w-[550px] h-[450px]"
>
	<!-- On clikcing an objectcard change from search to object page-->
	{#if search}
		<div out:fly={{ x: -550, duration: 400 }} class="h-full">
			<div class="font-medium md:mx-4 text-xl mb-1">
				Search for a song, artist or album to talk about
			</div>
			<SearchWidget onObjectCardClicked={() => (search = false)} bind:objectSelected newPost={true}/>
		</div>
	{:else if objectSelected != null}
		<div in:fly={{ x: 550, delay: 400, duration: 400 }} class="h-full">
			<SharePostWidget bind:showModal object={objectSelected} objectType={objectSelected?.type} />
		</div>
	{/if}
</div>
