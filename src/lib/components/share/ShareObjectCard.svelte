<script lang="ts">
	import type { PostObject } from '$lib/spotify';
	import { asSong, asArtist, asAlbum } from '$lib/spotify';
	import ShareAlbumCard from './ShareAlbumCard.svelte';
	import ShareArtistCard from './ShareArtistCard.svelte';
	import ShareSongCard from './ShareSongCard.svelte';
	export let object: PostObject;
</script>

{#if object.type == 'track'}
	<ShareSongCard song={asSong(object)} />
{:else if object.type == 'album'}
	<ShareAlbumCard album={asAlbum(object)} />
{:else if object.type == 'artist'}
	<ShareArtistCard artist={asArtist(object)} />
{/if}
