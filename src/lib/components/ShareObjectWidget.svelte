<script export lang="ts">
	import Button from '$lib/components/forms/Button.svelte';
	import { enhance } from '$app/forms';
	import { userProfileStore } from '$lib/stores/userStore';

	let uid = $userProfileStore?.user?.uid;
	// Disable button if there is no uid
	$: disabled = uid == '' || uid == null;
	export let object: any;
	export let objectType: string = 'track';

	function getObjectImageSrc(object: any): string {
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
	<div class="w-full mt-4 rounded-sm p-8 bg-gray-200">
		<form class="my-4" method="POST" action="/?/newPost" use:enhance>
			<div class="flex flex-col items-center gap-8">
				<div class="flex flex-row gap-10">
					<img class="rounded w-1/4 h-1/4" src={getObjectImageSrc(object)} alt="" />
					<textarea
						name="text"
						autocomplete="off"
						placeholder={`Talk about ${object.name}!`}
						class="bg-white appearance-none border border-black rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500"
					/>
					<input value={object.id} type="hidden" name="objectId" />
                    <input value={objectType} type="hidden" name="objectType" />
				</div>

				<div class="w-1/3">
					<Button text="Post" {disabled} />
				</div>
			</div>
		</form>
	</div>
{:else}
	<div>Empty</div>
{/if}
