<script lang="ts">
	import { accessToken } from '$lib/stores/accessTokenStore';
	import { getObjectJson, type Artist, type Song, type Album} from '$lib/spotify.js';
	import SongThreadCard from '$lib/components/SongThreadCard.svelte';
	import AlbumThreadCard from '$lib/components/AlbumThreadCard.svelte';
	export let data;

	let getArtistData = async () => {
		let artist: Artist = await getObjectJson(data.artistId, $accessToken, 'artist');
		return artist;
	};

	async function getArtistTopTracks(): Promise<Array<Song>> {
		const response = await fetch(
			`https://api.spotify.com/v1/artists/${data.artistId}/top-tracks?market=GB`,
			{
				method: 'GET',
				headers: {
					// "Content-Type": "application/json",
					Authorization: `Bearer ${$accessToken}`
				}
				// body: JSON.stringify({ market: 'GB' })
			}
		);
		if (response.status == 200) {
			let json = await response.json();
			let songs: Array<Song> = json.tracks;
			return songs;
		} else {
			throw Error;
		}
	}

	async function getArtistAlbums(): Promise<Array<Album>> {
		const response = await fetch(
			`https://api.spotify.com/v1/artists/${data.artistId}/albums?market=GB`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${$accessToken}`
				}
			}
		);
		if (response.status == 200) {
			let json = await response.json();
			let albums: Array<Album> = json.items;
			return albums;
		} else {
			throw Error;
		}
	}
</script>

<div class="bg-gray-50 dark:bg-gray-800 h-full dark:text-white">
	{#await getArtistData()}
		<p>loading</p>
	{:then artist}
		<div class="p-4">
			<div class="bg-white dark:bg-gray-600 rounded-lg p-4 flex flex-row">
				<div class="w-28 h-28 bg-blue-500 rounded">
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
				{#await getArtistTopTracks()}
					<div />
				{:then songs}
					{#each songs as song}
						<SongThreadCard {song} />
						<div class="w-2" />
					{/each}
				{:catch error}
					<div>{error}</div>
				{/await}
			</div>
			<div class="h-4" />
			<div class="text-xl font-medium">Albums</div>
			<div class="flex flex-row overflow-auto">
				{#await getArtistAlbums()}
					<div />
				{:then albums}
					{#each albums as album}
						<AlbumThreadCard {album} />
						<div class="w-2" />
					{/each}
				{:catch error}
					<div>{error}</div>
				{/await}
			</div>
		</div>
	{:catch error}
		<div>{error}</div>
	{/await}
</div>
