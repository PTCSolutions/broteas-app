<script lang="ts">
	import type { Song } from '$lib/spotify';

	export let song: Song;
</script>

<div class="rounded-lg relative">
	<img class="rounded-lg z-0" src={song.album.images[0].url} alt="" />
	<div
		class="w-full h-1/2 p-4 z-10 bottom-0 absolute rounded-lg bg-gradient-to-t to-transparent from-black flex-col flex justify-end"
	>
		<div class="text-white text-lg">{song.name}</div>
		<a href={`/artists/${song.artists[0].id}`} class="hover:text-blue-600 text-white">
			{song.artists[0].name}
		</a>
	</div>
</div>