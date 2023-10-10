<script lang="ts">
	import { deletePost, likePost, type PostMeta } from '$lib/post';
	import type { User } from '$lib/user';
	import { getUser } from '$lib/user';
	import { format } from 'timeago.js';
	import SongWidget from './SongWidget.svelte';
	import { getContext } from 'svelte';
	import { getSongJson } from '$lib/spotify';
	import { accessToken } from '$lib/stores/accessTokenStore';
	import { horizontalSlide } from '$lib/transition/transition';
	import { userProfileStore } from '$lib/stores/userStore';
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
	let getSongJsonFunction = () => getSongJson(post.objectId, $accessToken);
</script>

<div class="flex flex-row h-auto">
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
				<button on:click={deletePostFunction}
					><img class="w-5 h-5" src="delete_icon.svg" alt="delete icon" /></button
				>
			{/if}
		</div>
		<div class="h-4" />
		<div class="flex-row flex">
			<div class="w-80 h-80 rounded-lg">
				{#await getSongJsonFunction()}
					<div>Waiting</div>
				{:then json}
					<SongWidget
						song={json}
					/>
				{:catch error}
					<div>{error}</div>
				{/await}
			</div>

			<div class="flex-col flex justify-center items-center pl-2">
				<button on:click={likePostFuntion}>
					<div>like</div>
					<div class="text-xs">{post.likes.length}</div>
				</button>
				<div class="h-4" />
				<button on:click={() => (commentsOpen = !commentsOpen)}>
					<div>com</div>
					<div class="text-xs">{post.comments.length}</div>
				</button>
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
