<script lang="ts">
	import type { User } from '$lib/user.js';
	import { getUsersPosts } from '$lib/post.js';
	import PostGrid from '$lib/components/posts/PostGrid.svelte';
	import ProfileBanner from '$lib/components/user/ProfileBanner.svelte';

	export let data;
	const user: User | null = data;
</script>

<div class="h-full p-4 overflow-hidden flex flex-col">
	{#if user}
		<ProfileBanner {user} />
		{#await getUsersPosts(user.uid)}
			<div />
		{:then posts}
			<PostGrid {posts}/>
		{/await}
	{:else}
		<div>User cannot be found</div>
	{/if}
</div>
