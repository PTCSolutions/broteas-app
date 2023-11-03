<script lang="ts">
	import type { Album } from '$lib/spotify';

	export let album: Album;
</script>

<a href={album.external_urls.spotify} target="_blank">
	<div class="rounded-lg relative">
		<img class="rounded-lg z-0" src={album.images[0].url} alt="" />
		<div class="m-4 z-10 top-0 right-0 absolute py-0 px-2 text-black bg-gray-300 rounded-full text-sm w-min">
			Album
		</div>
		<div
			class="w-full h-1/2 p-4 z-10 bottom-0 absolute rounded-lg bg-gradient-to-t to-transparent from-black flex-col flex justify-end"
		>
			<div class="text-white text-lg">{album.name}</div>
			<a href={`/artists/${album.artists[0].id}`} class="hover:underline text-white">
				{album.artists[0].name}
			</a>
		</div>
	</div>
</a>
