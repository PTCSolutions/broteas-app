<script lang="ts">
	import type { Artist } from '$lib/spotify';
	export let artist: Artist;
</script>

<div class="flex-row flex bg-gray-100 my-2 p-2 items-center rounded-lg w-1/2">
	<div class="w-12 h-12 bg-blue-500 rounded">
		<img class="rounded" src={artist.images[0].url} alt="" />
	</div>
	<div class="w-4" />
	<div class="flex-col flex items-start">
		<a href={`/artists/${artist.id}`} class="hover:text-blue-600 text-lg font-medium">
			{artist.name}
		</a>
	</div>
    <div class="grow"></div>
</div>