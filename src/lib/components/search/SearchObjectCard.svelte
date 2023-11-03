<script lang="ts">
	import type { ObjectType } from '$lib/post';
	import type { PostObject } from '$lib/spotify';
	import { asSong, asArtist, asAlbum } from '$lib/spotify';
	import SearchAlbumCard from './SearchAlbumCard.svelte';
	import SearchArtistCard from './SearchArtistCard.svelte';
	import SearchSongCard from './SearchSongCard.svelte';
	export let object: PostObject;

	function convertType(type: string): string {
		switch (type) {
			case 'track':
				return 'songs';
			case 'album':
				return 'albums';
			case 'artist':
				return 'artists';
			default:
				return '';
		}
	}
</script>

<a href={`/${convertType(object.type)}/${object.id}`}>
    <div
	class="flex-row flex bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white my-2 p-2 items-center rounded-lg w-full"
>
	{#if object.type == 'track'}
		<SearchSongCard song={asSong(object)} />
	{:else if object.type == 'album'}
		<SearchAlbumCard album={asAlbum(object)} />
	{:else if object.type == 'artist'}
		<SearchArtistCard artist={asArtist(object)} />
	{/if}
    </div>
</a>
