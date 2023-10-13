<script lang="ts">
    import { getPostsForObject } from '$lib/post.js';
	import type { Song } from '$lib/spotify.js';
	export let data;
	let song: Song = data;
</script>

<div>
	{song.name}

	{#await getPostsForObject(song.id)}
		<div>Loading</div>
	{:then posts}
        {#each posts as post}
            <div>{post?.text} - {post?.creatorId}</div>
        {/each}
	{:catch error}
		<div>{error}</div>
	{/await}
</div>
