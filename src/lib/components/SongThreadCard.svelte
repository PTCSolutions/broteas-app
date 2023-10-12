<script lang="ts">
	import type { Song } from '$lib/spotify';
	export let song: Song;
</script>

<div class="flex-col flex bg-white my-2 p-2 items-start dark:bg-gray-600">
	<a href={song.external_urls.spotify} target="_blank">
		<div class="rounded-lg relative w-40 h-40">
			<img class="rounded-lg z-0" src={song.album.images[0].url} alt="" />
			<div
				class="w-full h-1/2 p-4 z-10 bottom-0 absolute rounded-lg bg-gradient-to-t to-transparent from-black flex-col flex justify-end"
			>
				<div class="text-white text-lg">{song.name}</div>
			</div>
		</div>
	</a>
    <div class="flex-row flex">
        <div>com</div>
        <div>share</div>
    </div>
</div>
