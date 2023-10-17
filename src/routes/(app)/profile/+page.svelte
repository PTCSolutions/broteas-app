<script lang="ts">
	import PostGrid from '$lib/components/posts/PostGrid.svelte';
	import ProfileBanner from '$lib/components/user/ProfileBanner.svelte';
	import { getPostsForUser } from '$lib/post';
	import { getProfilePicture } from '$lib/storage';
	import { userProfileStore } from '$lib/stores/userStore';
</script>

<div class="h-full p-4 overflow-hidden flex flex-col">
	{#if $userProfileStore?.user?.uid != '' && $userProfileStore?.user?.uid != undefined && !$userProfileStore?.loading}
		<ProfileBanner user={$userProfileStore.user} updatable={true} />
		{#await getPostsForUser($userProfileStore?.user?.uid)}
			<div>loading...</div>
		{:then posts}
			<PostGrid {posts} />
		{/await}
	{/if}
</div>
