<script export lang="ts">
	import Button from '$lib/components/forms/Button.svelte';
	import { enhance } from '$app/forms';
	import { userProfileStore } from '$lib/stores/userStore';
	import SearchSongCard from '../search/SearchSongCard.svelte';
	import SearchArtistCard from '../search/SearchArtistCard.svelte';
	import SearchAlbumCard from '../search/SearchAlbumCard.svelte';
	import SearchObjectCard from '../search/SearchObjectCard.svelte';
	import type { PostObject } from '$lib/spotify';

	let uid: string | undefined;
	$: uid = $userProfileStore?.user?.uid;
	// Disable button if there is no uid
	let disabled: boolean;
	$: disabled = uid == '' || uid == null;
	export let object: PostObject;
	export let objectType: string = 'track';
	// Allows the widget to affect the state of an external modal.
	export let showModal;
</script>

{#if object != null}
	<div
		class="md:p-4 pt-4 rounded-lg bg-white dark:bg-gray-800 dark:text-white overflow-hidden md:w-[550px] md:h-full"
	>
		<form
			method="POST"
			action="/?/newPost"
			use:enhance={({}) => {
				return async ({ update }) => {
					await update();
				};
			}}
			class="h-full"
		>
			<div class="flex flex-col items-center h-full justify-between">
				<!-- <img class="rounded w-1/4 h-1/4" src={getObjectImageSrc(object)} alt="" /> -->
				<SearchObjectCard object={object} linkToObject={true}/>
				<textarea
					name="text"
					autocomplete="off"
					placeholder={`Talk about ${object.name}!`}
					class="bg-white dark:bg-gray-600 dark:text-white appearance-none border border-black rounded w-full grow py-2 px-4 my-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500 resize-none"
				/>
				<input value={object.id} type="hidden" name="objectId" />
				<input value={objectType} type="hidden" name="objectType" />
				<input value={uid} type="hidden" name="uid" />
				<div class="md:w-1/3 w-full">
					<!-- // On click, close modal -->
					<Button text="Post" {disabled} onClick={() => (showModal = false)} />
				</div>
			</div>
		</form>
	</div>
{:else}
	<div>Empty</div>
{/if}
