<script lang="ts">
	// Imports
	import { type PostObject, searchSpotify } from '$lib/spotify';
	import Input from '$lib/components/forms/Input.svelte';
	import Radio from '$lib/components/forms/Radio.svelte';
	import { accessToken } from '$lib/stores/accessTokenStore';
    import ShareObjectCard from './share/ShareObjectCard.svelte';
	import type { ObjectType } from '$lib/post';

	// Exports
	export let onObjectCardClicked: any;
	export let objectSelected: any;

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

	let searchCatagory: ObjectType = 'track';
	let searchText: string = '';
	let objects: Array<PostObject> = [];

	// Function which either searches Spotify or our userbase
	async function search(searchText: string, searchCatagory: ObjectType) {
		if (searchText != null) {
			try {
				objects = await searchSpotify(searchText, searchCatagory, $accessToken ?? '');
			} catch (e) {
				console.log(e);
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
		{#each objects as object}
			<button
				on:click={() => {
					onObjectCardClicked();
					objectSelected = object;
				}}
			>
				<ShareObjectCard {object} />
			</button>
		{/each}
	</div>
</div>
