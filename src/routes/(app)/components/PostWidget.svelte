<script lang="ts">
	import type { PostMeta } from '$lib/post';
	export let post: PostMeta;
</script>

<div class="w-64 p-2 bg-gray-200 flex-col">
	<div>
		Object id is {post.objectId}
	</div>
    <div class="text-lg font-medium">
		{post.text}
	</div>
	<div>
		Shared by user {post.creatorId}
	</div>
	<div class="flex-row flex">
		<div>
			Likes: {post.likes.length}
		</div>
        <div class="w-4">
        </div>
		<div>
			Comments: {post.comments.length}
		</div>
	</div>
</div>
