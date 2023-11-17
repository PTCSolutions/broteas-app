<script lang="ts">
	import type { PostComment } from '$lib/comment';
	import { userProfileStore } from '$lib/stores/userStore';
	import { getUser, type User } from '$lib/user';
	import { format } from 'timeago.js';
	import Button from '$lib/components/forms/Button.svelte';
	import ProfilePicture from '$lib/components/user/ProfilePicture.svelte';
	import { comments } from '$lib/stores/commentsStore.js';
	import { enhance } from '$app/forms';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	// Get the uid of the currentUser from store
	let currentUid: string | undefined;
	$: currentUid = $userProfileStore?.user?.uid;
	// The comment to display in comment card
	export let comment: PostComment;
	// Should reply button / subComments show?
	let replyShowing: boolean = false;
	let subcommentsShowing: boolean = false;
	// Child comments list
	let childComments: PostComment[];
	$: childComments = $comments.comments.filter(
		(childComment) => childComment.parentId == comment.id
	);
	// The commentor
	let commentor: User;
	onMount(async () => {
		let user = await getUser(comment.commentorId);
		if (user != null) {
			commentor = user;
		}
	});
</script>

<!--Get the user who made the comment-->
<div
	class="flex flex-col gap-2 p-2 bg-white dark:bg-gray-600 rounded-lg items-start"
	in:fade
>
	<div class="flex-row flex items-center w-full">
		<ProfilePicture user={commentor || null} />
		<div class="w-2" />
		<div class="flex-col flex">
			<a class="hover:underline" href={`/users/${commentor?.uid}`}
				>{commentor?.firstName} {commentor?.lastName}</a
			>
		</div>
		<div class="w-5" />

		<div class="grow" />
		<div class="text-sm">{format(comment.date)}</div>
		{#if currentUid == commentor?.uid}
			<form method="POST" action="?/deleteComment" use:enhance>
				<input type="hidden" value={comment.id} name="commentId" />
				<input type="hidden" value={comment.parentId} name="parentId" />
				<button><span class="material-symbols-outlined"> delete </span></button>
			</form>
		{/if}
	</div>
	<div>{comment.text}</div>
	<div class="flex flex-row gap-2 items-center">
		<button on:click={() => (replyShowing = !replyShowing)}>
			<div class="text-sm hover:font-medium">Reply</div>
		</button>
		<div class="w-4" />
		<button on:click={() => (subcommentsShowing = !subcommentsShowing)}>
			<div class="flex flex-row items-center">
				<span class="material-symbols-outlined" style="font-size: 20px">mode_comment</span>
			</div>
		</button>
		<div class="text-xs">{comment.subCommentIds.length}</div>
	</div>

	{#if replyShowing}
		<form
			method="POST"
			action={`?/newSubComment`}
			use:enhance={({ formElement, formData, action, cancel, submitter }) => {
				return async ({ result, update }) => {
					subcommentsShowing = true;
					await update();
				};
			}}
		>
			<div class="flex flex-row items-center gap-4">
				<!-- <img class="rounded w-1/4 h-1/4" src={getObjectImageSrc(object)} alt="" /> -->
				<textarea
					name="text"
					autocomplete="off"
					placeholder={`Reply to ${commentor?.firstName}`}
					class="bg-white dark:bg-gray-600 dark:text-white appearance-none border border-black rounded w-full h-10 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500 resize-none"
				/>
				<input type="hidden" value={$userProfileStore?.user?.uid} name="commentorId" />
				<input type="hidden" value={comment.id} name="parentId" />
				<div class="w-1/3">
					<Button text="Reply" />
				</div>
			</div>
		</form>
	{/if}
	{#if subcommentsShowing}
		<div class="flex flex-col ml-4" in:fade>
			{#each childComments as comment (comment.id)}
				<svelte:self {comment} />
			{/each}
		</div>
	{/if}
</div>
