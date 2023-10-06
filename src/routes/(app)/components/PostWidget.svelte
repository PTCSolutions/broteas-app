<script lang="ts">
	import type { PostMeta } from '$lib/post';
	import type { User } from '$lib/user';
	import { getUser } from '$lib/user';
	export let post: PostMeta;
	export let accessToken: string;
	import { format } from 'timeago.js';
    import SongWidget from './SongWidget.svelte';
	// See: https://github.com/hustcc/timeago.js/tree/master

	let poster: User | null;
	getUser(post.creatorId).then((user) => {
		poster = user;
	});

	async function getSongJSON() {
		try {
			const response = await fetch(`https://api.spotify.com/v1/tracks/${post.objectId}`, {
				method: 'GET',
				headers: {
					// Accept: 'application/json'
					Authorization: `Bearer ${accessToken}`
				}
			});
			return response.json();
		} catch (error) {
            return "";
        }
	}
</script>

<div class="w-96 p-2 bg-white flex-col">
	<div class="flex-row flex">
		<div class=" w-10 h-10 rounded-full bg-green-200" />
		<div class="w-2" />
		<div class="flex-col flex">
			<div>{poster?.firstName} {poster?.lastName}</div>
			<div class="text-xs">{format(post.date)}</div>
		</div>
	</div>
	<div class="h-4" />
	<div class="flex-row flex">
		<div class="w-80 h-80 rounded-lg">
			{#await getSongJSON()}
				<div>Waiting</div>
			{:then json}
                <SongWidget src={json.album.images[0].url} artistName={json.artists[0].name} songName={json.name} />
			{:catch error}
				<div>{error}</div>
			{/await}
		</div>

		<div class="flex-col flex justify-center items-center pl-2">
			<a href={`/api/like?postId=${post.postId}`}>
				<div>like</div>
			</a>
			<div class="text-xs">{post.likes.length}</div>
			<div class="h-4" />
			<div>com</div>
			<div class="text-xs">{post.comments.length}</div>
			<div class="h-4" />
			<div>share</div>
		</div>
	</div>
	<div class="h-4" />
	<div class="font-medium">
		{post.text}
	</div>

	<div class="h-2" />
</div>
