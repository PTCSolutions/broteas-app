<script lang="ts">
	import type { PostComment } from '$lib/comment';
	import { userProfileStore } from '$lib/stores/userStore';
	import { getUser, type User } from '$lib/user';
	import { format } from 'timeago.js';
	import Button from '$lib/components/forms/Button.svelte';
	import { getSubComments } from '$lib/comment';
	// Get the uid of the currentUser from store
	let currentUid: string | undefined;
	$: currentUid = $userProfileStore?.user?.uid;
	export let comment: PostComment;
	let commentor: User | null;
	getUser(comment.commentorId).then((user) => {
		commentor = user;
	});
	let replyShowing: boolean = false;
</script>

<div class="flex flex-col gap-2 p-2 bg-white dark:bg-gray-600 rounded-lg items-start">
	<div class="flex-row flex items-center w-full">
		<div class="w-8 aspect-square rounded-full bg-green-200" />
		<div class="w-2" />
		<div class="flex-col flex">
			<div>{commentor?.firstName} {commentor?.lastName}</div>
		</div>
		<div class="w-5" />

		<div class="grow" />
		<div class="text-sm">{format(comment.date)}</div>
		{#if currentUid == commentor?.uid}
			<form method="POST" action="?/deleteComment">
				<input type="hidden" value={comment.id} name="commentId" />
				<button><span class="material-symbols-outlined"> delete </span></button>
			</form>
		{/if}
	</div>
	<div>{comment.text}</div>
	<button on:click={() => replyShowing = !replyShowing}>
		<div class="text-sm hover:font-medium">Reply</div>
	</button>
	{#if replyShowing}
		<form method="POST" action={`/posts/${comment.postId}/?/newSubComment`}>
			<div class="flex flex-row items-center gap-4">
				<!-- <img class="rounded w-1/4 h-1/4" src={getObjectImageSrc(object)} alt="" /> -->
				<textarea
					name="text"
					autocomplete="off"
					placeholder={`Reply to ${commentor?.firstName}`}
					class="bg-white appearance-none border border-black rounded w-full h-10 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500 resize-none"
				/>
				<input type="hidden" value={$userProfileStore?.user?.uid} name="commentorId" />
				<input type="hidden" value={comment.id} name="parentId" />
				<div class="w-1/3">
					<Button text="Reply" />
				</div>
			</div>
		</form>
	{/if}

	<div class="flex flex-col ml-4">
		{#await getSubComments(comment.postId, comment.id)}
			<div />
		{:then comments}
			{#each comments as comment (comment.id)}
				<svelte:self {comment} />
			{/each}
		{/await}
	</div>
</div>
