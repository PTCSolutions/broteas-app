<script lang="ts">
	import type { PostMeta } from '$lib/post';
	export let post: PostMeta;
</script>

<div class="w-96 p-2 bg-white flex-col">
	<div class="flex-row flex">
		<div class=" w-10 h-10 rounded-full bg-green-200" />
        <div class="w-2"></div>
		<div class="flex-col flex">
			<div>{post.creatorId}</div>
			<div class="text-xs">{post.date}</div>
		</div>
	</div>
<div class="h-4"></div>
	<div class="w-80 h-80 bg-gray-100">
		Object id is {post.objectId}
	</div>
    <div class="h-4"></div>
	<div class="font-medium">
		{post.text}
	</div>
	<div>
		Shared by user {post.creatorId}
	</div>
	<div class="flex-row flex">
		<div>
			Likes: {post.likes.length}
		</div>
		<div class="w-4" />
		<div>
			Comments: {post.comments.length}
		</div>
	</div>
</div>
