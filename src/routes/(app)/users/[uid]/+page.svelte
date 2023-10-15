<script lang="ts">
	import type { User } from '$lib/user.js';
	import { getUsersPosts } from '$lib/post.js';
	import PostWidget from '$lib/components/posts/PostWidget.svelte';
	import { fade } from 'svelte/transition';

	export let data;
	const user: User | null = data;
</script>

<div class="h-full p-4 overflow-hidden flex flex-col">
	{#if user}
		<!--Current layout. We give the row a fixed height of 40 pixels. This is the right height
	for two lines since the snippet will only ever take up 2 lines of space.-->
		<div class="h-40 bg-white dark:bg-gray-600 rounded-lg p-4 flex flex-row gap-4 items-center">
			<!-- The image takes up all the height it can in the given space-->
			<div class="h-full aspect-square rounded-full bg-green-300">
				<!-- <img class="rounded h-full w-full" src={artist.images[0].url} alt="" /> -->
			</div>
			<div class="flex flex-col">
				<div class="text-6xl font-semibold">
					{user.firstName}
					{user.lastName}
				</div>
				<div class="h-2" />
				<div class="flex flex-row gap-4">
					<div>Following {user.following.length}</div>
					<div>Followers {user.followers.length}</div>
				</div>
			</div>
		</div>
		<div class="h-4" />
		<div class="text-xl font-medium">{user.firstName}'s posts</div>
		{#await getUsersPosts(user.uid)}
			<div />
		{:then posts}
			<div class="grid grid-cols-3 w-full p-4 justify-between gap-4" in:fade>
				{#each posts as post}
					{#if post}
						<PostWidget {post} />
					{/if}
				{/each}
			</div>
		{/await}
	{:else}
		<div>User cannot be found</div>
	{/if}
</div>
