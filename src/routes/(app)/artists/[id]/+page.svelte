<script lang="ts">
	import SongThreadCard from '$lib/components/artist_page/SongThreadCard.svelte';
	import type { Album, Artist, Song } from '$lib/spotify.js';
	import AlbumThreadCard from '$lib/components/artist_page/AlbumThreadCard.svelte';
	export let data;
	let songs: Song[] = data.songs.slice(0, 5);
	let artist: Artist = data.artist;
	let albums: Album[] = data.albums.slice(0, 5);
	let json = data.json;

	function bioShortener(bio: string) {
		return bio.split('Read more')[0];
	}

	// async function searchWikipedia(searchQuery: string) {
	// 	const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=1&srsearch=musical%20artist%20${searchQuery}`;
	// 	const response = await fetch(endpoint);
	// 	if (!response.ok) {
	// 		throw Error(response.statusText);
	// 	}
	// 	const json = await response.json();
	// 	const result = json.query.search[0];
	// 	console.log(result.snippet);
	// 	return result;
	// }
</script>

<div class="h-full p-4 overflow-hidden">
	<!--Current layout. We give the row a fixed height of 40 pixels. This is the right height
	for two lines since the snippet will only ever take up 2 lines of space.-->
	<div class="h-40 bg-white dark:bg-gray-600 rounded-lg p-4 flex flex-row gap-4 items-center">
		<!-- The image takes up all the height it can in the given space-->
		<div class="h-full aspect-square rounded">
			<img class="rounded h-full w-full" src={artist.images[0].url} alt="" />
		</div>
		<div class="flex flex-col">
			<div class="text-6xl font-semibold">
				{artist.name}
			</div>
			<div class="h-2" />

			<!-- Line clamp ensures div can only ever go over two lines-->
			<div class="text-md break-normal line-clamp-3">
				{@html bioShortener(json.bio.content)}
				<!-- <span>
						{@html result.snippet}...
					</span>
					<a class="hover:underline" href={`https://en.wikipedia.org/?curid=${result.pageid}`}
						>Read more</a
					> -->
			</div>
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

	<div class="h-4" />
	<div class="text-xl font-medium">Bio</div>
	<div class="">
		{@html bioShortener(json.bio.content)}
	</div>
</div>
