<script lang="ts">
	import { postStore } from '$lib/stores/postsStore';
	import PostWidget from '$lib/components/posts/PostWidget.svelte';
	import { userProfileStore } from '$lib/stores/userStore';
	import { fade } from 'svelte/transition';
	let name: string | undefined;
	$: name = $userProfileStore?.user?.firstName;
</script>

<div class="flex-col flex items-start min-h-screen">
	<!-- The main section of the page is a grid of 3 columns. Each item is a post widget-->
	<div class="text-2xl font-semibold mt-4 mx-4 dark:text-white">
		Welcome back
		{#if $userProfileStore?.loading === false}
			<span in:fade>
				{name}
			</span>
		{/if}
	</div>
	{#if $postStore?.loading === false}
	<!-- Should each post individually fade in, or the whole grid fade in as one-->
		<div class="grid grid-cols-3 w-full p-4 justify-between gap-4" in:fade>
			{#each $postStore.posts as post (post.postId)}
				<PostWidget {post} />
			{/each}
		</div>
	{/if}
	<div class="bg-inherit grow"></div>
</div>
