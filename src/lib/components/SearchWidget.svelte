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

	// Exports
	export let onObjectCardClicked: any;
	export let objectSelected: any;
	export let userSearchOn: boolean = true;

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
		}
	];
	userSearchOn &&
		options.push({
			value: 'user',
			label: 'User'
		});

	type SearchType = ObjectType | 'user';
	let searchCatagory: SearchType = 'track';
	let searchText: string = '';
	let objects: Array<PostObject> = [];
	let users: User[] = [];

	// Function which either searches Spotify or our userbase
	async function search(searchText: string, searchCatagory: SearchType) {
		if (searchText != null) {
			if (searchCatagory != 'user') {
				objects = await searchSpotify(searchText, searchCatagory, $accessToken ?? '');
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
		{#if searchCatagory == 'user'}
			{#each users as user}
				<SearchUserCard {user} followed={$userProfileStore?.user?.following?.includes(user.uid)} />
			{/each}
		{:else}
			{#each objects as object}
				<button
					on:click={() => {
						onObjectCardClicked();
						objectSelected = object;
					}}
				>
					<SearchObjectCard {object} />
				</button>
			{/each}
		{/if}
	</div>
</div>
