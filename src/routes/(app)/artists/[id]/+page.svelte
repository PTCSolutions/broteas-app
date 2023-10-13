<script lang="ts">
	import SongThreadCard from '$lib/components/SongThreadCard.svelte';
	import type { Album, Artist, Song } from '$lib/spotify.js';
	import AlbumThreadCard from '$lib/components/AlbumThreadCard.svelte';
	export let data;
	let songs: Song[] = data.songs.slice(0, 5);
	let artist: Artist = data.artist;
	let albums: Album[] = data.albums.slice(0, 5);

	async function searchWikipedia(searchQuery: string) {
		const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=1&srsearch=${searchQuery}`;
		const response = await fetch(endpoint);
		if (!response.ok) {
			throw Error(response.statusText);
		}

		const json = await response.json();
		const result = json.query.search[0];

		return result;
	}
</script>

<div class="h-full p-4 overflow-hidden">
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
			{#await searchWikipedia(artist.name)}
				<div>...</div>
			{:then result}
				<div class="text-xl break-normal">
					{@html result.snippet}...
					<a class="hover:underline" href={`https://en.wikipedia.org/?curid=${result.pageid}`}
						>Read more</a
					>
				</div>
			{:catch error}
				<div />
			{/await}
		</div>
	</div>
	<div class="h-4" />
	<div class="text-xl font-medium">Popular songs</div>
	<div class="flex flex-row overflow-auto items-center">
		{#each songs as song}
			<SongThreadCard {song} />
			<div class="w-2" />
		{/each}
		<div class="font-md p-2">See more</div>
	</div>

	<div class="h-4" />
	<div class="text-xl font-medium">Albums</div>
	<div class="flex flex-row overflow-auto items-center">
		{#each albums as album}
			<AlbumThreadCard {album} />
			<div class="w-2" />
		{/each}
		<div class="font-md p-2">See more</div>
	</div>
</div>
