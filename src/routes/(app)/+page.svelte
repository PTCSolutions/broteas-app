<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import { postStore } from '$lib/stores/postsStore';
	import PostWidget from '$lib/components/posts/PostWidget.svelte';
	import { userProfileStore } from '$lib/stores/userStore';
	import NewPost from '$lib/components/posts/NewPost.svelte';
	let showModal = false;

	let name: string = $userProfileStore?.user?.firstName || '';
</script>

<div class="bg-gray-50 flex-col flex items-start">
	<!-- The main section of the page is a grid of 3 columns. Each item is a post widget-->
	<div class="text-2xl font-semibold mt-4 mx-4">Welcome back {name}</div>
	<div class="grid grid-cols-3 w-full p-4 justify-between gap-4">
		{#each $postStore as post (post.postId)}
			<PostWidget {post} />
		{/each}
	</div>
</div>
