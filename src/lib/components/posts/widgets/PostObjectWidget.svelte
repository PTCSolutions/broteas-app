<script lang="ts">
	import type { PostObject } from '$lib/spotify';
	import { asSong, asArtist, asAlbum } from '$lib/spotify';
	import AlbumWidget from './PostAlbumWidget.svelte';
	import SongWidget from './PostSongWidget.svelte';
	import ArtistWidget from './PostArtistWidget.svelte';
	import IntersectionObserver from '../../IntersectionObserver.svelte';
	import { fade } from 'svelte/transition';
	export let object: PostObject;
</script>

<IntersectionObserver once={true} let:intersecting>
	{#if intersecting}
	<div in:fade>
		{#if object.type == 'track'}
			<SongWidget song={asSong(object)} />
		{:else if object.type == 'album'}
			<AlbumWidget album={asAlbum(object)} />
		{:else if object.type == 'artist'}
			<ArtistWidget artist={asArtist(object)} />
		{/if}
	</div>
	{/if}
</IntersectionObserver>
