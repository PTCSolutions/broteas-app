<script lang="ts">
	export let accessToken: string;
    import type { Song } from "$lib/spotify";
	import SongCard from "./SongCard.svelte";
	import SongWidget from "./SongWidget.svelte";

	let searchText: string;
	let songs: Array<Song> = [];

	async function search() {
		const response = await fetch(`https://api.spotify.com/v1/search?q=${searchText}&type=track`, {
			method: 'GET',
			headers: {
				// Accept: 'application/json'
				Authorization: `Bearer ${accessToken}`
			}
		});

		let json = await response.json();
		songs = json.tracks.items;
	}
</script>

<div class="flex-col flex">
	<div class="flex-row flex">
		<div class="md:w-2/3">
			<input
				class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
				id="search"
				type="text"
				placeholder="Enter Search Term"
				autocomplete="off"
				bind:value={searchText}
				on:input
			/>
		</div>
		<div class="w-4" />
		<div class="md:w-2/3">
			<button
				class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
				type="button"
				on:click={search}
			>
				Search
			</button>
		</div>
	</div>
	<div class="h-4" />
	{#each songs as song}
		<SongCard {song} />
	{/each}
</div>
