<script lang="ts">
	import type { User } from '$lib/user.js';
	import PostGrid from '$lib/components/posts/PostGrid.svelte';
	import ProfileBanner from '$lib/components/user/ProfileBanner.svelte';
	export let data;
	const user: User | null = data;
	import { onMount } from 'svelte';
	import { usersPosts, subscribeToUsersPosts } from '$lib/stores/postsStore.js';
	onMount(() => {
		if (user?.uid != undefined) {
			subscribeToUsersPosts(user?.uid!);
		}
	});
</script>

<div class="h-full p-4 overflow-hidden flex flex-col">
	{#if user}
		<ProfileBanner {user} />
		{#if $usersPosts.loading == false}
			<PostGrid posts={$usersPosts.posts} />
		{/if}
	{:else}
		<div>User cannot be found</div>
	{/if}
</div>
