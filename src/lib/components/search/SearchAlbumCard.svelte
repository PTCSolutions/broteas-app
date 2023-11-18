<script lang="ts">
	import type { Album } from '$lib/spotify';
	export let album: Album;
</script>

<div class="w-12 h-12 rounded">
	<img class="rounded" src={album.images[0].url} alt="" />
</div>
<div class="w-4" />
<div class="flex-col flex items-start">
	<div class="text-lg font-medium">
		{album.name}
	</div>
	<div>
		<a href={`/artists/${album.artists[0].id}`} class="hover:underline">
			{album.artists[0].name}
		</a>
	</div>
</div>
<div class="grow" />
<div class="py-0 px-2 bg-white rounded-full text-sm">Album</div>
