<script lang="ts">
	import type { PostMeta } from '$lib/post';
	import type { User } from '$lib/user';
	import { getUser } from '$lib/user';
	export let post: PostMeta;

	let poster: User | null;
	getUser(post.creatorId).then((user) => {
		poster = user;
	});
</script>

<div class="w-96 p-2 bg-white flex-col">
	<div class="flex-row flex">
		<div class=" w-10 h-10 rounded-full bg-green-200" />
		<div class="w-2" />
		<div class="flex-col flex">
			<div>{poster?.firstName} {poster?.lastName}</div>
			<div class="text-xs">{post.date}</div>
		</div>
	</div>
	<div class="h-4" />
	<div class="flex-row flex">
		<!-- <div class="w-80 h-80 bg-gray-100 rounded-lg">
			Object id is {post.objectId}
		</div> -->
		<div class="w-80 h-80 rounded-lg">
			<img
            class="rounded-lg"
				src="https://img.buzzfeed.com/buzzfeed-static/complex/images/bebllwzjpsujz9ffwp6s/tyler-the-creator-scum-fuck-flower-boy-cover.png?output-format=jpg&output-quality=auto"
				alt=""
			/>
		</div>
		<div class="flex-col flex justify-center items-center pl-2">
			<div>like</div>
			<div class="text-xs">{post.likes.length}</div>
			<div class="h-4" />
			<div>com</div>
			<div class="text-xs">{post.comments.length}</div>
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
