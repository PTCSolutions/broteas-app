<script lang="ts">
	import CommentCard from '$lib/components/posts/comments/CommentCard.svelte';
	import { getPostsForObject } from '$lib/post.js';
	import type { Song } from '$lib/spotify.js';
	export let data;
	let song: Song = data;
</script>

<div class="p-4 h-full">
	<div class="bg-white dark:bg-gray-600 rounded-lg p-4 flex flex-row">
		<div class="w-28 h-28 flex flex-col justify-center">
			<img class="rounded" src={song.album.images[0].url} alt="" />
		</div>
		<div class="w-4 " />
		<div class="flex flex-col">
			<div class="text-7xl font-semibold">
				{song.name}
			</div>
			<div class="h-2" />
			<a href={`/artists/${song.artists[0].id}`} class="text-xl hover:underline"
				>{`${song.artists[0].name}`}</a
			>
		</div>
	</div>
	<div class="h-4" />
	<div class="text-xl font-medium mb-2">Latest discussion</div>
	<div>
		{#await getPostsForObject(song.id)}
			<div>Loading</div>
		{:then comments}
			{#if comments.length != 0}
				{#if comments}
					{#each comments as comment}
						{#if comment}
							<CommentCard {comment} />
						{/if}
					{/each}
				{/if}
			{:else}
				<div>
					Looks like no one is talking about {song.name}, be the first to start the discussion today!
				</div>
			{/if}
		{:catch error}
			<div>{error}</div>
		{/await}
	</div>
</div>
<!-- <form method="POST" action="?/newComment">
			<div class="flex flex-col items-center gap-4">

				<textarea
					name="text"
					autocomplete="off"
					placeholder={`Talk about ${object.name}!`}
					class="bg-white appearance-none border border-black rounded w-full h-20 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500 resize-none"
				/>
				<input type="hidden" value={$userProfileStore?.user?.uid} name="commentorId" />
				<div class="w-1/3">
					<Button text="Post" />
				</div>
			</div>
		</form> -->
