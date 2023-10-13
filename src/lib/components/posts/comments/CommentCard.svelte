<script lang="ts">
	import { deleteComment, type PostComment, type PostMeta } from "$lib/post";
	import { userProfileStore } from "$lib/stores/userStore";
	import { getUser, type User } from "$lib/user";
	import { format } from "timeago.js";
	// Get the uid of the currentUser from store
	let currentUid : string | undefined;
	$: currentUid = $userProfileStore?.user?.uid;
    export let comment : PostComment;
    export let post: PostMeta;
    let commentor : User | null;
    getUser(comment.commentorId).then((user) => {commentor = user} );
</script>


<div class="flex-row flex items-center w-full">
    <div class="w-8 aspect-square rounded-full bg-green-200" />
    <div class="w-2" />
    <div class="flex-col flex">
        <div>{commentor?.firstName} {commentor?.lastName}</div>
        <div class="text-xs">{format(comment.date)}</div>
    </div>
    <div class="w-5"></div>
    <div>{comment.text}</div>
    <div class="grow" />
    {#if currentUid == commentor?.uid}
        <button on:click={() => deleteComment(post.postId, comment.commentorId)}
            ><img class="w-[1.5vw] aspect-square" src="delete_icon.svg" alt="delete icon" /></button
        >
    {/if}
</div>