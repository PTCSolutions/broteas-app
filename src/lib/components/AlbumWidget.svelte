<script lang="ts">
	import type { Album } from '$lib/spotify';

	export let album: Album;
</script>

<a href={album.external_urls.spotify} target="_blank">
<div class="rounded-lg relative">
	<img class="rounded-lg z-0" src={album.images[0].url} alt="" />
	<div
		class="w-full h-1/2 p-4 z-10 bottom-0 absolute rounded-lg bg-gradient-to-t to-transparent from-black flex-col flex justify-end"
	>
		<div class="text-white text-lg">{album.name}</div>
		<a href={`/artists/${album.artists[0].id}`} class="hover:text-blue-600 text-white">
			{album.artists[0].name}
		</a>
	</div>
</div>
</a>