<script lang="ts">
	import type { User } from '$lib/user';
	import { getUser } from '$lib/user';
	import { userProfileStore } from '$lib/stores/userStore';
	import { deletePost, likePost, type PostMeta } from '$lib/post';
	import { getObjectJson } from '$lib/spotify';
	import { accessToken } from '$lib/stores/accessTokenStore';
	import { format } from 'timeago.js';
	import SongWidget from '$lib/components/object_widgets/SongWidget.svelte';
	import ArtistWidget from '../object_widgets/ArtistWidget.svelte';
	import AlbumWidget from '../object_widgets/AlbumWidget.svelte';
	// The post in question
	export let post: PostMeta;
	// Get user who posted the post
	let poster: User | null;
	getUser(post.creatorId).then((user) => {
		poster = user;
	});
	// Get the uid of the currentUser from store
	let currentUid : string | undefined;
	$: currentUid = $userProfileStore?.user?.uid;
	// Import like, delete post, get song functions
	let deletePostFunction = () => deletePost(post.postId);
	let likePostFuntion = () => {
		if (currentUid != undefined && post.postId != null) {
			likePost(post.postId, currentUid);
		}
	};
	let getObjectJsonFunction = () => getObjectJson(post.objectId, $accessToken!, post.objectType);
</script>


<div class="w-full h-auto flex flex-row bg-white dark:bg-gray-600 dark:text-white">
	<div class="p-4 flex-col w-full">
		<div class="flex-row flex items-center w-full">
			<div class="w-1/12 aspect-square rounded-full bg-green-200" />
			<div class="w-2" />
			<div class="flex-col flex">
				<div>{poster?.firstName} {poster?.lastName}</div>
				<div class="text-xs">{format(post.date)}</div>
			</div>
			<div class="grow" />
			{#if currentUid == poster?.uid}
				<button on:click={deletePostFunction}
					><img class="w-[1.5vw] aspect-square" src="delete_icon.svg" alt="delete icon" /></button
				>
			{/if}
		</div>
		<div class="h-4" />
		<div class="flex-row flex w-full">
			<div class="w-5/6 aspect-square">
				{#await getObjectJsonFunction()}
					<div>Waiting</div>
				{:then json}
					{#if post.objectType == 'track'}
						<SongWidget song={json} />
					{:else if post.objectType == 'artist'}
						<ArtistWidget artist={json} />
					{:else if post.objectType == 'album'}
						<AlbumWidget album={json} />
					{:else}
						<div />
					{/if}
				{:catch error}
					<div>{error}</div>
				{/await}
			</div>
			<div class="flex-col flex justify-center items-center pl-2 grow">
				<button on:click={likePostFuntion}>
					<span
						class="material-symbols-outlined"
						style={`font-variation-settings: 'FILL' ${post.likes.includes(currentUid || '') ? 1 : 0}`}>favorite</span
					>
				</button>
				<div class="text-xs">{post.likes.length}</div>
				<div class="h-4" />
				<a href={`/posts/${post.postId}`} >
					<span class="material-symbols-outlined">mode_comment</span>
				</a>
				<div class="text-xs">{post.comments.length}</div>
				<div class="h-4" />
				<span class="material-symbols-outlined">share</span>
			</div>
		</div>
		<div class="h-4" />
		<div class="font-medium">
			{post.text}
		</div>
		<div class="h-2" />
	</div>
</div>
