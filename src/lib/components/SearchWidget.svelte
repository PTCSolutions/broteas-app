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
	// Reactive declaration means search runs whenever the reactive variable it
	// depends on (in this case `searchText`) changes. This is ensures that
	// list of songs is always calibrated with searchText
	$: search(searchText, searchCategory);
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

		<Radio {options} bind:radioSelected={searchCategory} />
	</div>

	<div class="h-2" />
	<div class="flex flex-col overflow-auto height" style:--height={newPost ? '320px' : '700px'}>
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
					<SearchObjectCard {object} />
				</button>
			{/each}
		<!-- IT shouldnt be possible but this statement makes 
		sure we are not in new post and displaying users -->
		{:else if !newPost}
			{#each users as user}
				<SearchUserCard {user} followed={$userProfileStore?.user?.following?.includes(user.uid)} />
			{/each}
		{/if}
	</div>
</div>

<style>
	.height {
		height: var(--height);
	}
</style>
