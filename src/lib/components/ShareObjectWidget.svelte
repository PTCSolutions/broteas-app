<script export lang="ts">
	import Button from '$lib/components/forms/Button.svelte';
	import { enhance } from '$app/forms';
	import { userProfileStore } from '$lib/stores/userStore';
	import type { SvelteComponent } from 'svelte';
	import SongCard from './object_cards/SongCard.svelte';
	import ArtistCard from './object_cards/ArtistCard.svelte';
	import AlbumCard from './object_cards/AlbumCard.svelte';

	let uid = $userProfileStore?.user?.uid;
	// Disable button if there is no uid
	$: disabled = uid == '' || uid == null;
	export let object: any;
	export let objectType: string = 'track';

	function getObjectCard(object: any): string {
		switch (objectType) {
			case 'track':
				return object.album.images[0].url;
			case 'artist':
				return object.images[0].url;
			case 'album':
				return object.images[0].url;
			default:
				return '';
		}
	}
</script>

{#if object != null}
	<div class="p-4 rounded-lg bg-white overflow-hidden w-[550px]">
		<form method="POST" action="/?/newPost" use:enhance>
			<div class="flex flex-col items-center gap-4">

					<!-- <img class="rounded w-1/4 h-1/4" src={getObjectImageSrc(object)} alt="" /> -->
					{#if objectType == 'track'}
						<SongCard song={object} />
					{:else if objectType == 'artist'}
						<ArtistCard artist={object} />
					{:else if objectType == 'album'}
						<AlbumCard album={object} />
					{:else}
						<div />
					{/if}
					<textarea
						name="text"
						autocomplete="off"
						placeholder={`Talk about ${object.name}!`}
						class="bg-white appearance-none border border-black rounded w-full h-20 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500 resize-none"
					/>
					<input value={object.id} type="hidden" name="objectId" />
					<input value={objectType} type="hidden" name="objectType" />


				<div class="w-1/3">
					<Button text="Post" {disabled} />
				</div>
			</div>
		</form>
	</div>
{:else}
	<div>Empty</div>
{/if}
