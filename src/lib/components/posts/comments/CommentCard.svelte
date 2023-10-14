<script lang="ts">
	import type { PostComment } from '$lib/comment';
	import { userProfileStore } from '$lib/stores/userStore';
	import { getUser, type User } from '$lib/user';
	import { format } from 'timeago.js';
	// Get the uid of the currentUser from store
	let currentUid: string | undefined;
	$: currentUid = $userProfileStore?.user?.uid;
	export let comment: PostComment;
	let commentor: User | null;
	getUser(comment.commentorId).then((user) => {
		commentor = user;
	});
</script>

<div class="flex flex-col gap-2 p-2 bg-white dark:bg-gray-600 rounded">
	<div class="flex-row flex items-center w-full">
		<div class="w-8 aspect-square rounded-full bg-green-200" />
		<div class="w-2" />
		<div class="flex-col flex">
			<div>{commentor?.firstName} {commentor?.lastName}</div>
		</div>
		<div class="w-5" />

		<div class="grow" />
		<div class="text-xs">{format(comment.date)}</div>
		{#if currentUid == commentor?.uid}
			<form method="POST" action="?/deleteComment">
				<input type="hidden" value={comment.id} name="commentId" />
				<button><span class="material-symbols-outlined"> delete </span></button>
			</form>
		{/if}
	</div>
	<div>{comment.text}</div>
</div>
