<script lang="ts">
	import PostGrid from '$lib/components/posts/PostGrid.svelte';
	import ProfileBanner from '$lib/components/user/ProfileBanner.svelte';
	import { getPostsForObject, getPostsForUser } from '$lib/post';
	import { userProfileStore } from '$lib/stores/userStore';
</script>

<div class="h-full p-4 overflow-hidden flex flex-col">
	{#if $userProfileStore?.user?.uid != '' && $userProfileStore?.user?.uid != undefined && !$userProfileStore?.loading}
		<ProfileBanner user={$userProfileStore.user} />
		{#await getPostsForUser($userProfileStore?.user?.uid)}
			<div>loading...</div>
		{:then posts}
			<PostGrid {posts} />
		{/await}
	{/if}
</div>
