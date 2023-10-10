<script lang="ts">
	import type { Song, Artist, Album } from '$lib/spotify';
	import Button from './forms/Button.svelte';
	import Input from './forms/Input.svelte';
	import SongCard from './SongCard.svelte';
	import Radio from './forms/Radio.svelte';
	import ArtistCard from './ArtistCard.svelte';
	import AlbumCard from './AlbumCard.svelte';
	import { accessToken } from '$lib/stores/accessTokenStore';
	export let showModal: boolean;
	export let songSelected: Song;

	const options = [
		{
			value: 'track',
			label: 'Song'
		},
		{
			value: 'artist',
			label: 'Artist'
		},
		{
			value: 'album',
			label: 'Album'
		},
		{
			value: 'user',
			label: 'User'
		}
	];

	let searchCatagory: string = 'track';
	let searchText: string = '';
	let songs: Array<Song> = [];
	let artists: Array<Artist> = [];
	let albums: Array<Album> = [];
	// Function which returns a list of songs from spotify
	async function search(searchText: string, searchCatagory: string) {
		if (searchText != null) {
			if (searchCatagory != 'user') {
				const response = await fetch(
					`https://api.spotify.com/v1/search?q=${searchText}&type=${searchCatagory}`,
					{
						method: 'GET',
						headers: {
							// Accept: 'application/json'
							Authorization: `Bearer ${$accessToken}`
						}
					}
				);
				if (response.status == 200) {
					let json = await response.json();
					switch (searchCatagory) {
						case 'track':
							songs = json.tracks.items;
						case 'artist':
							artists = json.artists.items;
						case 'album':
							albums = json.albums.items;
					}
				}
			} else {
				console.log('user search');
			}
		}
	}
	// Reactive declaration means search runs whenever the reactive variable it
	// depends on (in this case `searchText`) changes. This is ensures that
	// list of songs is always calibrated with searchText
	$: search(searchText, searchCatagory);
</script>

<div class="flex-col flex">
	<div class="flex-row flex">
		<div>
			<Input
				id="search"
				type="text"
				placeholder="Enter Search Term"
				autocomplete={false}
				bind:boundValue={searchText}
			/>
		</div>
		<div class="w-4" />
		<div class="w-1/8">
			<Button text="Search" onClick={() => search(searchText, searchCatagory)} />
		</div>
	</div>
	<div class="h-2" />

	<Radio {options} bind:radioSelected={searchCatagory} />

	<div class="h-4" />
	{#if searchCatagory == 'track'}
		{#each songs as song}
			<button
				on:click={() => {
					showModal = true;
					songSelected = song;
				}}
			>
				<SongCard {song} />
			</button>
		{/each}
	{:else if searchCatagory == 'artist'}
		{#each artists as artist}
			<ArtistCard {artist} />
		{/each}
	{:else if searchCatagory == 'album'}
		{#each albums as album}
			<AlbumCard {album} />
		{/each}
	{:else if searchCatagory == 'user'}
		<div>Cars</div>
	{/if}
</div>
