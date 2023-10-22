<script lang="ts">
	import PostGrid from '$lib/components/posts/PostGrid.svelte';
	import ProfileBanner from '$lib/components/user/ProfileBanner.svelte';
	import { getPostsForUser } from '$lib/post';
	import { subscribeToUsersPosts, usersPosts } from '$lib/stores/postsStore';
	import { userProfileStore } from '$lib/stores/userStore';
	import { onMount } from 'svelte';
	onMount(() => {
		subscribeToUsersPosts($userProfileStore?.user?.uid!);
	});
</script>

<div class="h-full p-4 overflow-hidden flex flex-col">
	{#if $userProfileStore?.user?.uid != '' && $userProfileStore?.user?.uid != undefined && !$userProfileStore?.loading}
		<ProfileBanner user={$userProfileStore.user} updatable={true} />
		{#if $usersPosts.loading == false}
			<PostGrid posts={$usersPosts.posts} />
		{/if}
	{/if}
</div>
