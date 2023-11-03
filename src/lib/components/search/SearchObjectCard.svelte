<script lang="ts">
	import type { PostObject } from '$lib/spotify';
	import { asSong, asArtist, asAlbum } from '$lib/spotify';
	import SearchAlbumCard from './SearchAlbumCard.svelte';
	import SearchArtistCard from './SearchArtistCard.svelte';
	import SearchSongCard from './SearchSongCard.svelte';
	export let object: PostObject;
</script>

{#if object.type == 'track'}
	<SearchSongCard song={asSong(object)} />
{:else if object.type == 'album'}
	<SearchAlbumCard album={asAlbum(object)} />
{:else if object.type == 'artist'}
	<SearchArtistCard artist={asArtist(object)} />
{/if}
