<script export lang="ts">
	import type { Song } from '$lib/spotify';
	import { getContext } from 'svelte';
	import Button from './forms/Button.svelte';
	import { enhance } from '$app/forms';
	let uid = getContext('uid');
	// Disable button if there is no uid
	$: disabled = uid == '' || uid == null;

	export let song: Song | null = null;
</script>

<div class="w-full mt-4 rounded-sm p-8 bg-gray-200">
	<form class="my-4" method="POST" action="/?/newPost" use:enhance>
		<div class="flex flex-col items-center gap-8">
			{#if song != null}
				<div class="flex flex-row gap-10">
					<img class="rounded w-1/4 h-1/4" src={song.album.images[0].url} alt="" />
					<textarea
						name="text"
						autocomplete="off"
						placeholder={`Talk about ${song.name}!`}
						class="bg-white appearance-none border border-black rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500"
					/>
					<input value={song.id} type="hidden" name="objectId" />
				</div>
			{:else}
				<div>
					<label class="label text-slate-500 mr-4" for="name">Text </label>
					<input
						type="text"
						name="text"
						autocomplete="off"
						placeholder="Type here"
						class="bg-white appearance-none border border-black rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500"
					/>
				</div>
				<div>
					<label class="label text-slate-500 mr-4" for="name">ID </label>
					<input
						value=""
						type="text"
						name="objectId"
						autocomplete="off"
						placeholder="Type here"
						class="bg-white appearance-none border border-black rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500"
					/>
				</div>
			{/if}
			<div class="w-1/3">
				<Button text="Post" />
			</div>
		</div>
	</form>
</div>
