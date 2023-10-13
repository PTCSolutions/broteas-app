<script lang="ts">
	import type { PostMeta } from '$lib/post.js';
	import type { Album, Artist, PostObject, PostObjectInfo, Song} from '$lib/spotify.js';

	export let data;
	let post: PostMeta | undefined | null = data.post;
	let object: PostObjectInfo;
    if (post?.objectType == "artist") {
       let artist = data.object as Artist;
       object = {img: artist.images[0].url, name:artist.name};
    } else if (post?.objectType == "album") {
        let album = data.object as Album;
       object = {img: album.images[0].url, name:album.name};
    } else {
        let song = data.object as Song;
        object = {img: song.album.images[0].url, name: song.name};
    }
</script>

{#if post}
	<div class="bg-gray-50 h-full">
		<div class="p-4">
			<div class="bg-white rounded-lg p-4 flex flex-row">
				<div class="w-28 h-28 bg-blue-500 rounded">
					<img class="rounded" src={object.img} alt="" />
				</div>
				<div class="w-4" />
				<div class="flex flex-col">
					<div class="text-7xl font-semibold">
						{object.name}
					</div>
					<div class="h-2" />
					<div class="text-xl">{post.text}</div>
				</div>
			</div>
			<div class="h-4" />
			<div class="text-xl font-medium">Popular songs</div>
		</div>
	</div>
{/if}
