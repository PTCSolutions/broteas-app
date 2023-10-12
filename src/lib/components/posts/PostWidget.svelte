<script lang="ts">
	import type { User } from '$lib/user';
	import { getUser } from '$lib/user';
	import { userProfileStore } from '$lib/stores/userStore';
	import { deletePost, likePost, type PostMeta } from '$lib/post';
	import { getObjectJson } from '$lib/spotify';
	import { accessToken } from '$lib/stores/accessTokenStore';
	import { format } from 'timeago.js';
	import { horizontalSlide } from '$lib/transition/transition';
	import SongWidget from '$lib/components/SongWidget.svelte';
	import ArtistWidget from '../ArtistWidget.svelte';
	import AlbumWidget from '../AlbumWidget.svelte';
	// The post in question
	export let post: PostMeta;
	// Get user who posted the post
	let poster: User | null;
	getUser(post.creatorId).then((user) => {
		poster = user;
	});
	// Boolean representing if comments are open
	let commentsOpen = false;
	// Get the uid of the currentUser from store
	let currentUid: string | undefined = $userProfileStore?.user?.uid;
	// Import like, delete post, get song functions
	let deletePostFunction = () => deletePost(post.postId);
	let likePostFuntion = () => {
		if (currentUid != undefined && post.postId != null) {
			likePost(post.postId, currentUid);
		}
	};
	let getObjectJsonFunction = () => getObjectJson(post.objectId, $accessToken, post.objectType);
</script>

<link
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,100..700,0..1,-50..200"
	rel="stylesheet"
/>
<div class="w-full h-auto flex flex-row bg-white">
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
				<button on:click={() => (commentsOpen = !commentsOpen)}>
					<span class="material-symbols-outlined">mode_comment</span>
				</button>
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
	<!-- If comments are open show a panel to the side of the post widget-->
	{#if commentsOpen}
		<!-- This panel horizontally slides in and out on clicking the comment button-->
		<div
			class="w-60 bg-[#f2f2f0] flex flex-col"
			transition:horizontalSlide={{ axis: 'x', duration: 400 }}
		>
			<!-- If no comments show "NO comments" text-->
			{#if post.comments.length == 0}
				<div>No comments to show</div>
			{:else}
				<!-- Else display comments-->
				{#each post.comments as comment (comment.id)}
					<p>{`User ${comment.commentorId}: ${comment.text}`}</p>
				{/each}
			{/if}
		</div>
	{/if}
</div>
