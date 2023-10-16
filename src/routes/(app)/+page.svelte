<script lang="ts">
	import { postStore } from '$lib/stores/postsStore';
	import { userProfileStore } from '$lib/stores/userStore';
	import { fade } from 'svelte/transition';
	import PostGrid from '$lib/components/posts/PostGrid.svelte';
	import Radio from '$lib/components/forms/Radio.svelte';
	import { followingFilter } from '$lib/stores/followingFilterStore';
	let name: string | undefined;
	$: name = $userProfileStore?.user?.firstName;
	let options = [
		{
			value: 'global',
			label: 'global'
		},
		{
			value: 'following',
			label: 'following'
		}
	];
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
		<Radio {options} bind:radioSelected={$followingFilter} column={true} />
	</div>
	{#if $postStore?.loading === false}
		<!-- Should each post individually fade in, or the whole grid fade in as one-->
		<PostGrid posts={$postStore.posts} />
	{/if}
	<div class="bg-inherit grow" />
</div>
