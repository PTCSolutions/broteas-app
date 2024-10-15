<script lang="ts">
	import { fade } from "svelte/transition";
	import type { PostMeta } from "$lib/post";
	import PostWidget from "./PostWidget.svelte";
    export let posts : PostMeta[];
</script>

<div class="grid md:grid-cols-3 grid-cols-1 w-full py-4 justify-between gap-4" in:fade>
    {#each posts as post (post.postId)}
            <PostWidget {post} />
    {/each}
</div>