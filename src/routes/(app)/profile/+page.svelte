<script lang="ts">
	import PostGrid from '$lib/components/posts/PostGrid.svelte';
	import ProfileBanner from '$lib/components/user/ProfileBanner.svelte';
	import { subscribeToUsersPosts, usersPosts } from '$lib/stores/postsStore';
	import { userStore, userProfileStore } from '$lib/stores/userStore';
	// Once user's uid has loaded, subscribe to their posts  
	$: if ($userStore) subscribeToUsersPosts($userStore!);
</script>

<div class="h-full p-4 overflow-hidden flex flex-col">
	{#if $userProfileStore?.user?.uid != '' && $userProfileStore?.user?.uid != undefined && !$userProfileStore?.loading}
		<ProfileBanner user={$userProfileStore.user} updatable={true} />
		{#if $usersPosts.loading == false}
			<PostGrid posts={$usersPosts.posts} />
		{/if}
	{/if}
</div>
