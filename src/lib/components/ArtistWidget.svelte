<script lang="ts">
	import type { Artist } from '$lib/spotify';

	export let artist: Artist;
</script>

<a href={artist.external_urls.spotify} target="_blank">
	<div class="rounded-lg relative">
		<img class="rounded-lg z-0" src={artist.images[0].url} alt="" />
		<div class="m-4 z-10 top-0 right-0 absolute py-0 px-2 bg-gray-900 rounded-full text-sm w-min text-white">
			Artist
		</div>
		<div
			class="w-full h-1/2 p-4 z-10 bottom-0 absolute rounded-lg bg-gradient-to-t to-transparent from-black flex-col flex justify-end"
		>
			<a href={`/artists/${artist.id}`} class="hover:underline text-white text-lg">
				{artist.name}
			</a>
		</div>
	</div>
</a>
