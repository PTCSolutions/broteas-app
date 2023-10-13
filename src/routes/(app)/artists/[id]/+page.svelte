<script lang="ts">
	import SongThreadCard from '$lib/components/SongThreadCard.svelte';
	import type { Album, Artist, Song } from '$lib/spotify.js';
	import AlbumThreadCard from '$lib/components/AlbumThreadCard.svelte';
	export let data;
	let songs: Song[] = data.songs;
	let artist: Artist = data.artist;
	let albums: Album[] = data.albums;
</script>

<div class="h-full p-4">
	<div class="bg-white dark:bg-gray-600 rounded-lg p-4 flex flex-row">
		<div class="w-28 h-28 aspect-square bg-blue-500 rounded overflow-hidden">
			<img class="rounded" src={artist.images[0].url} alt="" />
		</div>
		<div class="w-4" />
		<div class="flex flex-col">
			<div class="text-7xl font-semibold">
				{artist.name}
			</div>
			<div class="h-2" />
			<div class="text-xl">A bio about the artist if we can get the code for it somewhere</div>
		</div>
	</div>
	<div class="h-4" />
	<div class="text-xl font-medium">Popular songs</div>
	<div class="flex flex-row overflow-auto">
		{#each songs as song}
			<SongThreadCard {song} />
			<div class="w-2" />
		{/each}
	</div>
	<div class="h-4" />
	<div class="text-xl font-medium">Albums</div>
	<div class="flex flex-row overflow-auto">
		{#each albums as album}
			<AlbumThreadCard {album} />
			<div class="w-2" />
		{/each}
	</div>
</div>
