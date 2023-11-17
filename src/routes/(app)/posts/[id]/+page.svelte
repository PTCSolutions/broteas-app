<script lang="ts">
	import type { PostComment } from '$lib/comment.js';
	import Button from '$lib/components/forms/Button.svelte';
	import CommentCard from '$lib/components/posts/comments/CommentCard.svelte';
	import type { PostMeta } from '$lib/post.js';
	import type { Album, Artist, PostObject, PostObjectInfo, Song } from '$lib/spotify.js';
	import { userProfileStore } from '$lib/stores/userStore.js';
	import type { User } from '$lib/user.js';
	import PostObjectWidget from '$lib/components/posts/widgets/PostObjectWidget.svelte';
	import { format } from 'timeago.js';
	import ProfilePicture from '$lib/components/user/ProfilePicture.svelte';
	import { enhance } from '$app/forms';
	import {comments} from "$lib/stores/commentsStore.js"

	export let data;
	let post: PostMeta | undefined | null = data.post;
	// let object: PostObjectInfo | null;
	let poster: User | undefined | null = data.poster;
	let object: PostObject | undefined = data.object;
	// Top comments
	let topComments: PostComment[];
	$: topComments = $comments.comments.filter((comment) => comment.parentId == post?.postId)
</script>

{#if post && object}
	<div class="p-4 h-full flex flex-col gap-2">
			<div class="bg-white dark:bg-gray-600 rounded-lg p-4 flex flex-row">
				<div class="w-40">
					<PostObjectWidget {object} />
				</div>
				<div class="w-4" />
				<div class="flex flex-col gap-3 w-full">
					<div class="flex-row flex items-center w-full">
						<ProfilePicture user={poster || null} />
						<div class="w-3" />
						<div class="text-2xl">{poster?.firstName} {poster?.lastName}</div>

						<div class="grow" />
						<div>{format(post.date)}</div>
					</div>
					<div>
						{post.text}
					</div>
				</div>
			</div>
			<div class="h-2" />
			<div class="text-xl font-medium">Comments</div>

			{#if topComments}
				{#each topComments as comment (comment.id)}
					<CommentCard {comment} />
				{/each}
			{/if}
			<div class="h-2" />
			<form method="POST" action="?/newComment" use:enhance>
				<div class="flex flex-row items-center gap-4">
					<textarea
						name="text"
						autocomplete="off"
						placeholder={`Reply to ${poster?.firstName}`}
						class="bg-white dark:bg-gray-600 dark:text-white appearance-none border border-black rounded w-full h-10 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500 resize-none"
					/>
					<input type="hidden" value={$userProfileStore?.user?.uid} name="commentorId" />
					<div class="w-1/3">
						<Button text="Reply" />
					</div>
				</div>
			</form>
	</div>
{/if}
