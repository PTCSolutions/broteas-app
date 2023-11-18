<script lang="ts">
	import type { User } from '$lib/user';
	import { getUser } from '$lib/user';
	import { userProfileStore } from '$lib/stores/userStore';
	import { deletePost, likePost, type PostMeta } from '$lib/post';
	import { getObjectJson } from '$lib/spotify';
	import { accessToken } from '$lib/stores/accessTokenStore';
	import { format } from 'timeago.js';
	import PostObjectWidget from './widgets/PostObjectWidget.svelte';
	import ProfilePicture from '../user/ProfilePicture.svelte';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import NewsPost from './NewsPost.svelte';
	import { getNewsJSON } from '$lib/news';
	// The post in question
	export let post: PostMeta;
	// Get the uid of the currentUser from store
	let currentUid: string | undefined;
	$: currentUid = $userProfileStore?.user?.uid;
	let poster: User;
	onMount(async () => {
		if (post.creatorId) {
			let user = await getUser(post.creatorId);
			if (user != null) {
				poster = user;
			}
		}
	});
	// Import like, delete post, get song functions
	let deletePostFunction = () => deletePost(post.postId);
	let likePostFuntion = () => {
		if (currentUid != undefined && post.postId != null) {
			likePost(post.postId, currentUid);
		}
	};
	let getObjectJsonFunction = () => {
		if (post.objectType == "news") {
			return getNewsJSON(post.objectId, post.objectType);
		} else {
			return getObjectJson(post.objectId, $accessToken!, post.objectType);
		}
		
	};
</script>

<a
	href={`/posts/${post.postId}`}
	class="w-full h-auto flex flex-row bg-white dark:bg-gray-600 dark:text-white rounded-lg hover:shadow-sm"
>
	<div class="p-4 flex-col w-full">
		<div class="flex-row flex items-center w-full">
			{#if poster}
				<ProfilePicture user={poster || null} />
				<div class="w-2" />
				<div class="flex-col flex">
					<a class="hover:underline" href={`/users/${poster?.uid}`}>@{poster?.username}</a>
					<div class="text-xs">{format(post.date)}</div>
				</div>
				<div class="grow" />
				{#if currentUid == poster?.uid}
					<button on:click|preventDefault={deletePostFunction}
						><img class="w-[1.5vw] aspect-square" src="delete_icon.svg" alt="delete icon" /></button
					>
				{/if}
			{/if}
		</div>
		<div class="h-4" />
		<div class="flex-row flex">
			{#if post.objectType == 'news'}
				{#await getObjectJsonFunction()}
					<div />
				{:then json}
					<div class="w-5/6 aspect-square" in:fade>
						<NewsPost object={json}/>
					</div>
				{:catch error}
					<div>{error}</div>
				{/await}
			{:else}
				{#await getObjectJsonFunction()}
					<div />
				{:then json}
					<div class="w-5/6 aspect-square" in:fade>
						<PostObjectWidget object={json} />
					</div>
				{:catch error}
					<div>{error}</div>
				{/await}
			{/if}

			<div class="flex-col flex justify-center items-center pl-1 grow">
				<button
					class="hover:bg-gray-200 dark:hover:bg-gray-500 p-2 rounded"
					on:click|preventDefault={likePostFuntion}
				>
					<span
						class="material-symbols-outlined"
						style={`font-variation-settings: 'FILL' ${
							post.likes.includes(currentUid || '') ? 1 : 0
						}`}>favorite</span
					>
				</button>
				<div class="text-xs">{post.likes.length}</div>
				<div class="h-4" />
				<a
					class="hover:bg-gray-200 dark:hover:bg-gray-500 p-2 rounded"
					href={`/posts/${post.postId}`}
				>
					<span class="material-symbols-outlined">mode_comment</span>
				</a>
				<div class="text-xs">{post.commentIds.length}</div>
				<div class="h-4" />
				<span class="material-symbols-outlined">share</span>
			</div>
		</div>
		{#if post.objectType != 'news'}
			<div class="h-4" />
			<div class="font-medium line-clamp-5">
				{post.text}
			</div>
			<div class="h-2" />
		{/if}
	</div>
</a>
