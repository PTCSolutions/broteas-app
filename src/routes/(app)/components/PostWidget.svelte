<script lang="ts">
	import { deletePost, type PostMeta } from '$lib/post';
	import type { User } from '$lib/user';
	import { getUser } from '$lib/user';
	import { format } from 'timeago.js';
	import SongWidget from './SongWidget.svelte';
	import { getContext } from 'svelte';
	// The post in question
	export let post: PostMeta;
	// The access token for spotify calls
	export let accessToken: string;
	// Get user who posted the post
	let poster: User | null;
	getUser(post.creatorId).then((user) => {
		poster = user;
	});
	// Get the uid of the currentUser from context
	let currentUid: String | null = getContext('uid');
	// Get the json info of the song in the post widget
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
			return '';
		}
	}

	let deletePostFunction = () => deletePost(post.postId);
</script>

<div class="w-96 p-2 bg-white flex-col">
	<div class="flex-row flex">
		<div class=" w-10 h-10 rounded-full bg-green-200" />
		<div class="w-2" />
		<div class="flex-col flex">
			<div>{poster?.firstName} {poster?.lastName}</div>
			<div class="text-xs">{format(post.date)}</div>
		</div>
		<div class="grow" />
		{#if currentUid == poster?.uid}
			<button on:click={deletePostFunction}><img class="w-5 h-5" src="delete_icon.svg" alt="delete icon"/></button>
		{/if}
	</div>
	<div class="h-4" />
	<div class="flex-row flex">
		<div class="w-80 h-80 rounded-lg">
			{#await getSongJSON()}
				<div>Waiting</div>
			{:then json}
				<SongWidget
					src={json.album.images[0].url}
					artistName={json.artists[0].name}
					songName={json.name}
				/>
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
