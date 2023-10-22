<script lang="ts">
	import { feedPosts } from '$lib/stores/postsStore';
	import { userProfileStore } from '$lib/stores/userStore';
	import { fade } from 'svelte/transition';
	import PostGrid from '$lib/components/posts/PostGrid.svelte';
	import { DarkMode } from 'flowbite-svelte';
	let name: string | undefined;
	$: name = $userProfileStore?.user?.firstName;
</script>

<div class="flex-col flex items-start min-h-screen px-4">
	<!-- The main section of the page is a grid of 3 columns. Each item is a post widget-->
	<div class="flex flex-row w-full justify-between items-center mt-4">
		<div class="text-2xl font-semibold dark:text-white">
			Welcome back
			{#if $userProfileStore?.loading === false}
				<span in:fade>
					{name}
				</span>
			{/if}
		</div>
		<DarkMode />
	</div>
	{#if $feedPosts?.loading === false}
		<!-- Should each post individually fade in, or the whole grid fade in as one-->
		<PostGrid posts={$feedPosts.posts} />
	{/if}
	<div class="bg-inherit grow" />
</div>
