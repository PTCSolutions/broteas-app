<script lang="ts">
	import type { Album } from '$lib/spotify';
	export let album: Album;
</script>

<div class="flex-row flex bg-gray-100 my-2 p-2 items-center rounded-lg w-1/2">
	<div class="w-12 h-12 bg-blue-500 rounded">
		<img class="rounded" src={album.images[0].url} alt="" />
	</div>
	<div class="w-4" />
	<div class="flex-col flex items-start">
		<div  class="text-lg font-medium">
			{album.name}
        </div>
        <div>
            <a href={`/artists/${album.artists[0].id}`} class="hover:text-blue-600">
			{album.artists[0].name}
		</a>
        </div>
	</div>
    <div class="grow"></div>
    <div class="py-0 px-2 bg-white rounded-full text-sm">
        Album
    </div>
</div>