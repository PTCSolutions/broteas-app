<script lang="ts">
	import type { PostObject } from '$lib/spotify';
	import { asSong, asArtist, asAlbum } from '$lib/spotify';
	import AlbumWidget from './AlbumWidget.svelte';
	import SongWidget from './SongWidget.svelte';
    import ArtistWidget from './ArtistWidget.svelte';
	export let object: PostObject;
</script>

{#if object.type == 'track'}
	<SongWidget song={asSong(object)} />
{:else if object.type == 'album'}
	<AlbumWidget album={asAlbum(object)} />
    {:else if object.type == 'artist'}
	<ArtistWidget artist={asArtist(object)} />
{/if}
