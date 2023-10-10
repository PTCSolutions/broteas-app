<script lang="ts">
	import type { Song } from '$lib/spotify';
	import Button from './forms/Button.svelte';
	import Input from './forms/Input.svelte';
	import SongCard from './SongCard.svelte';
	import { accessToken } from '$lib/stores/accessToken';
	export let showModal: boolean;
	export let songSelected: Song;

	let token: string | null;

	accessToken.subscribe((value) => {
		token = value;
	});

	let searchText: string = '';
	let songs: Array<Song> = [];
	// Function which returns a list of songs from spotify
	async function search(searchText: string) {
		if (searchText != null) {
			const response = await fetch(`https://api.spotify.com/v1/search?q=${searchText}&type=track`, {
				method: 'GET',
				headers: {
					// Accept: 'application/json'
					Authorization: `Bearer ${$accessToken}`
				}
			});
			if (response.status == 200) {
				let json = await response.json();
				songs = json.tracks.items;
			} else {
				songs = [];
			}
		}
	}
	// Reactive declaration means search runs whenever the reactive variable it
	// depends on (in this case `searchText`) changes. This is ensures that
	// list of songs is always calibrated with searchText
	$: search(searchText);
</script>

<div class="flex-col flex">
	<div class="flex-row flex">
		<div class="w-1/2">
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
			<Button text="Search" onClick={() => search(searchText)} />
		</div>
	</div>
	<div class="h-4" />
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
</div>
