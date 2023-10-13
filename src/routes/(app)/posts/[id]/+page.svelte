<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/forms/Button.svelte';
	import CommentCard from '$lib/components/posts/comments/CommentCard.svelte';
	import type { PostComment, PostMeta } from '$lib/post.js';
	import type { Album, Artist, PostObjectInfo, Song } from '$lib/spotify.js';
	import { userProfileStore } from '$lib/stores/userStore.js';
	import type { User } from '$lib/user.js';

	export let data;
	let post: PostMeta | undefined | null = data.post;
	let object: PostObjectInfo;
	let poster: User | undefined | null = data.poster;
	let comments: PostComment[] | undefined = data.comments;
	if (post?.objectType == 'artist') {
		let artist = data.object as Artist;
		object = { img: artist.images[0].url, name: artist.name };
	} else if (post?.objectType == 'album') {
		let album = data.object as Album;
		object = { img: album.images[0].url, name: album.name };
	} else {
		let song = data.object as Song;
		object = { img: song.album.images[0].url, name: song.name };
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
					<div class="text-xl">{`${post.text} : ${poster?.firstName} ${poster?.lastName}`}</div>
				</div>
			</div>
			<div class="h-4" />
			<div class="text-xl font-medium">Comments</div>
			{#if comments}
				{#each comments as comment (comment.id)}
					<CommentCard {comment} {post} />
				{/each}
			{/if}
		</div>
		<form method="POST" action="?/newComment" >
			<div class="flex flex-col items-center gap-4">
				<!-- <img class="rounded w-1/4 h-1/4" src={getObjectImageSrc(object)} alt="" /> -->
				<textarea
					name="text"
					autocomplete="off"
					placeholder={`Talk about ${object.name}!`}
					class="bg-white appearance-none border border-black rounded w-full h-20 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500 resize-none"
				/>
                <input type="hidden" value={$userProfileStore?.user?.uid}  name="commentorId"/>
				<div class="w-1/3">
					<Button text="Post" />
				</div>
			</div>
		</form>
	</div>
{/if}
