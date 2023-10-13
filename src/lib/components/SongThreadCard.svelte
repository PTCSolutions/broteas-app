<script lang="ts">
	import { getPostsForObject } from '$lib/post';
	import type { Song } from '$lib/spotify';
	export let song: Song;
</script>

<div class="flex-col flex bg-white my-2 p-2 gap-1 items-start dark:bg-gray-600">
	<a href={`/songs/${song.id}`}>
		<div class="rounded-lg relative w-40 h-40 hover:brightness-75">
			<img class="rounded-lg z-0" src={song.album.images[0].url} alt="" />

			<div
				class="w-full h-1/2 p-4 z-10 bottom-0 absolute rounded-lg bg-gradient-to-t to-transparent from-black flex-col flex justify-end"
			>
				<div class="text-white text-lg">{song.name}</div>
			</div>
		</div>
	</a>
	<div class="h-1" />
	{#await getPostsForObject(song.id)}
		<div>Loading</div>
	{:then posts}
		<div class="flex-row flex gap-1 items-center">
			<span class="material-symbols-outlined" style="font-size: 20px">mode_comment</span>
			<div class="text-xs">{posts.length}</div>
			<div class="w-1" />
			<span class="material-symbols-outlined" style="font-size: 20px">share</span>
		</div>
	{:catch error}
		<div>{error}</div>
	{/await}
</div>
