<script lang="ts">
	import type { PostMeta } from '$lib/post.js';

	export let data;
    let post : PostMeta | null = data;
</script>

<div>
    {post?.text}
</div>