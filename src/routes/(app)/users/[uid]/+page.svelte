<script lang="ts">
	import type { User } from '$lib/user.js';
	import { getPostsForUser } from '$lib/post.js';
	import PostGrid from '$lib/components/posts/PostGrid.svelte';
	import ProfileBanner from '$lib/components/user/ProfileBanner.svelte';
	export let data;
	const user: User | null = data;
	import { onMount } from 'svelte';
	import { usersPostStore, usersSubscribeToMessages } from '$lib/stores/postsStore.js';
	onMount(() => {
		usersSubscribeToMessages(user?.uid!);

	});
</script>

<div class="h-full p-4 overflow-hidden flex flex-col">
	{#if user}
		<ProfileBanner {user} />
		{#if $usersPostStore.loading == false}
			<PostGrid posts={$usersPostStore.posts} />
		{/if}
	{:else}
		<div>User cannot be found</div>
	{/if}
</div>
