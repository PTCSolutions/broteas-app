<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import NewPostWidget from '$lib/components/posts/NewPostWidget.svelte';
	import { postStore } from '$lib/stores/postsStore';
	import PostWidget from '$lib/components/posts/PostWidget.svelte';
	let showModal = false;
</script>

<div class="bg-gray-50 flex-col flex items-center">
	<button on:click={() => (showModal = true)} class="fixed right-4 bottom-4">
		<div class="bg-green-100 w-14 h-14 rounded-full">
			<svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"
				><path
					d="M186.666-120q-27 0-46.833-19.833T120-186.666v-586.668q0-27 19.833-46.833T186.666-840h382.668v66.666H186.666v586.668h586.668v-382.668H840v382.668q0 27-19.833 46.833T773.334-120H186.666Zm134.001-158v-66.666H640V-278H320.667Zm0-124.667v-66.666H640v66.666H320.667Zm0-124.667V-594H640v66.666H320.667ZM688-602.667V-688h-85.333v-66.667H688V-840h66.667v85.333H840V-688h-85.333v85.333H688Z"
				/></svg
			>
		</div>
	</button>

	<Modal bind:showModal>
		<NewPostWidget />
	</Modal>
	<!-- The main section of the page is a grid of 3 columns. Each item is a post widget-->
	<div class="text-lg p-1">Latest Posts:</div>
	<div class="grid grid-cols-3 w-full p-4 justify-between gap-4 ">
		{#each $postStore as post (post.postId)}
			<PostWidget {post} />
		{/each}
	</div>
</div>
