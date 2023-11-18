<script lang="ts">
	import { feedPosts, subscribeToFeedPosts } from '$lib/stores/postsStore';
	import PostGrid from '$lib/components/posts/PostGrid.svelte';
	import { DarkMode } from 'flowbite-svelte';
	import ReferButton from '$lib/components/ReferButton.svelte';
    import { userProfileStore } from '$lib/stores/userStore';
    	// Once user's uid has loaded, subscribe to their feed posts  
	$: if ($userProfileStore) subscribeToFeedPosts();
</script>

<div class="flex-col flex items-start min-h-screen px-4">
	<ReferButton />

	<!-- The main section of the page is a grid of 3 columns. Each item is a post widget-->
	<div class="flex flex-row w-full justify-between items-center mt-4">
		<div class="text-2xl font-semibold dark:text-white">
			Your feed
		</div>
		<DarkMode />
	</div>
    {#if $userProfileStore?.user?.following.length == 0}
		<div class="mt-6 text-lg">Posts from the people you follow appear on your feed. Search for a user by their username to follow them now!</div>
	{/if}
	{#if $feedPosts?.loading === false}
		<!-- Should each post individually fade in, or the whole grid fade in as one-->
		<PostGrid posts={$feedPosts.posts} />
	{/if}
	<div class="bg-inherit grow" />
</div>