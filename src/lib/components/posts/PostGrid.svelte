<script lang="ts">
	import { fade } from "svelte/transition";
	import PostWidget from "./PostWidget.svelte";
	import type { PostMeta } from "$lib/post";
    export let posts : PostMeta[];
</script>

<div class="grid grid-cols-3 w-full p-4 justify-between gap-4" in:fade>
    {#each posts as post}
        {#if post}
            <PostWidget {post} />
        {/if}
    {/each}
</div>