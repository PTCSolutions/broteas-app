<script lang="ts">
	// Imports
	import { type PostObject, searchSpotify } from '$lib/spotify';
	import Input from '$lib/components/forms/Input.svelte';
	import Radio from '$lib/components/forms/Radio.svelte';
	import { accessToken } from '$lib/stores/accessTokenStore';
	import { searchForOtherUsers, type User } from '$lib/user';
	import { userProfileStore } from '$lib/stores/userStore';
	import SearchUserCard from './search/SearchUserCard.svelte';
	import SearchObjectCard from './search/SearchObjectCard.svelte';
	import type { ObjectType } from '$lib/post';
	import SearchSongCard from './search/SearchSongCard.svelte';
	import { fade } from 'svelte/transition';

	// Whether search widget is to be displayed in search
	// page (FALSE) or in New post model (TRUE)
	export let newPost: boolean = false;
	// Actions to be completed on clicking object card
	// and variable to store object clicked on
	export let onObjectCardClicked: any = null;
	export let objectSelected: PostObject | null = null;

	// Options for search type radio menu
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
		// If we are in new Post DONT show user option
		...(newPost
			? []
			: [
					{
						value: 'user',
						label: 'User'
					}
			  ])
	];
	// We can either search through objects or users
	type SearchType = ObjectType | 'user';
	// Default search category is track
	let searchCategory: SearchType = 'track';
	// Default search text is null
	let searchText: string = '';
	// Array of objects to display
	let objects: Array<PostObject> = [];
	// Array of users to display
	let users: User[] = [];

	// Function which either searches Spotify or our userbase
	async function search(searchText: string, searchCategory: SearchType) {
		if (searchText != null) {
			if (searchCategory != 'user') {
				try {
					objects = await searchSpotify(searchText, searchCategory, $accessToken ?? '');
				} catch (e) {
					objects = [];
				}
			} else {
				users = await searchForOtherUsers(searchText, $userProfileStore?.user!);
			}
		}
	}

	// A function to get the recently played songs from Spotify
	async function getRecent() {
		let uid = $userProfileStore?.user?.uid ?? '';
		let targetUrl = 'https://api.spotify.com/v1/me/player/recently-played';
		const response = await fetch('/spotifyFetch', {
			method: 'POST',
			body: JSON.stringify({ uid, targetUrl }),
			headers: {
				'content-type': 'application/json'
			}
		});
		let json = await response.json();
		return json;
	}

	// Reactive declaration means search runs whenever the reactive variable it
	// depends on (in this case `searchText`) changes. This is ensures that
	// list of songs is always calibrated with searchText
	$: search(searchText, searchCategory);
</script>

<div class="flex-col flex py-2 md:px-4">
	<div class="flex flex-col">
		<Input
			id="search"
			type="text"
			placeholder="Enter Search Term"
			autocomplete={false}
			bind:boundValue={searchText}
		/>
		<div class="h-2" />

		<Radio {options} bind:radioSelected={searchCategory} />
	</div>

	<div class="h-2" />
	<div class={`flex flex-col overflow-auto ${newPost ? "h-[320px]" : "h-[700px]"}`}>
		<div class="h-2" />
		{#if searchCategory != 'user'}
			{#each objects as object}
				<!--Complete action on clicking object card IF it exists-->
				<button
					on:click={() => {
						onObjectCardClicked();
						objectSelected = object;
					}}
				>
					<SearchObjectCard {object} linkToObject={!newPost} />
				</button>
			{/each}
			<!-- IT shouldnt be possible but this statement makes 
		sure we are not in new post and displaying users -->
		{:else if !newPost}
			{#each users as user}
				<SearchUserCard {user} followed={$userProfileStore?.user?.following?.includes(user.uid)} />
			{/each}
		{/if}
		{#if newPost && searchCategory == 'track'}
			{#await getRecent()}
				<div />
			{:then json}
				<div class="flex flex-col" in:fade>
					<div class="my-2 font-medium">or choose one of your recently played on Spotify:</div>
					{#each json.items as item}
						<button
							on:click={() => {
								onObjectCardClicked();
								objectSelected = item.track;
							}}
						>
							<div
								class="flex-row flex bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white my-2 p-2 items-center rounded-lg w-full"
							>
								<SearchSongCard song={item.track} />
							</div>
						</button>
					{/each}
				</div>
			{/await}
		{/if}
	</div>
</div>
