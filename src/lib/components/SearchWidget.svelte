<script lang="ts">
	import type { Song, Artist, Album } from '$lib/spotify';
	import Input from '$lib/components/forms/Input.svelte';
	import Radio from '$lib/components/forms/Radio.svelte';
	import SearchSongCard from './search/SearchSongCard.svelte';
	import SearchArtistCard from './search/SearchArtistCard.svelte';
	import SearchAlbumCard from './search/SearchAlbumCard.svelte';
	import { accessToken } from '$lib/stores/accessTokenStore';
	import { searchForOtherUsers, type User } from '$lib/user';
	import { userProfileStore } from '$lib/stores/userStore';
	import SearchUserCard from './search/SearchUserCard.svelte';
	import type { ObjectType } from '$lib/post';
	export let onObjectCardClicked : any;
	export let objectSelected: any;
	export let userSearchOn: boolean = true;

	const options = userSearchOn
		? [
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
		  ]
		: [
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
				}
		  ];

	let searchCatagory: ObjectType = 'track';
	let searchText: string = '';
	let songs: Array<Song> = [];
	let artists: Array<Artist> = [];
	let albums: Array<Album> = [];
	let users: User[] = [];
	// Function which returns a list of songs from spotify
	async function search(searchText: string, searchCatagory: ObjectType | "user") {
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
							break;
						case 'artist':
							artists = json.artists.items;
							break;
						case 'album':
							albums = json.albums.items;
							break;
						default:
							console.log('error');
					}
				}
			} else {
				users = await searchForOtherUsers(searchText, $userProfileStore?.user!);
			}
		}
	}
	// Reactive declaration means search runs whenever the reactive variable it
	// depends on (in this case `searchText`) changes. This is ensures that
	// list of songs is always calibrated with searchText
	$: search(searchText, searchCatagory);
</script>

<div class="flex-col flex py-2 px-4">
	<div class="flex flex-col">
		<Input
			id="search"
			type="text"
			placeholder="Enter Search Term"
			autocomplete={false}
			bind:boundValue={searchText}
		/>
		<div class="h-2" />

		<Radio {options} bind:radioSelected={searchCatagory} />
	</div>

	<div class="h-2" />
	<div class="flex flex-col h-80 overflow-auto">
		<div class="h-2" />
		{#if searchCatagory == 'track'}
			{#each songs as song}
				<button
					on:click={() => {
						onObjectCardClicked();
						objectSelected = song;
					}}
				>
					<SearchSongCard {song} />
				</button>
			{/each}
		{:else if searchCatagory == 'artist'}
			{#each artists as artist}
				<button
					on:click={() => {
						onObjectCardClicked();
						objectSelected = artist;
					}}
				>
					<SearchArtistCard {artist} />
				</button>
			{/each}
		{:else if searchCatagory == 'album'}
			{#each albums as album}
				<button
					on:click={() => {
						onObjectCardClicked();
						objectSelected = album;
					}}
					><SearchAlbumCard {album} />
				</button>
			{/each}
		{:else if searchCatagory == 'user'}
			{#each users as user}
				<SearchUserCard {user} followed={$userProfileStore?.user?.following?.includes(user.uid)} />
			{/each}
		{/if}
	</div>
</div>
