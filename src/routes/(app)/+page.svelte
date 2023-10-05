<script lang="ts">
	import PostWidget from './components/PostWidget.svelte';
	import type { User } from '$lib/user';
	import { GetPosts } from '$lib/post';
	import type { PostMeta } from '$lib/post';
	import Modal from './components/Modal.svelte';

	let user: User = {
		firstName: 'Rich',
		lastName: 'Harris',
		uid: '12345',
		email: 'richharris@music.me',
		following: ['11111'],
		followers: ['11111']
	};

	let showModal = false;
	let posts: Array<PostMeta> = [];
	GetPosts().then((res) => {
		posts = res;
	});
</script>

<div class="bg-gray-50 grow flex-col flex items-center">
	<button on:click={() => (showModal = true)} class="fixed right-4 bottom-4"
		>
        <div class="bg-green-100 w-14 h-14 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"
			><path
				d="M186.666-120q-27 0-46.833-19.833T120-186.666v-586.668q0-27 19.833-46.833T186.666-840h382.668v66.666H186.666v586.668h586.668v-382.668H840v382.668q0 27-19.833 46.833T773.334-120H186.666Zm134.001-158v-66.666H640V-278H320.667Zm0-124.667v-66.666H640v66.666H320.667Zm0-124.667V-594H640v66.666H320.667ZM688-602.667V-688h-85.333v-66.667H688V-840h66.667v85.333H840V-688h-85.333v85.333H688Z"
			/></svg
		>
        </div>
        
        </button
	>

	<Modal bind:showModal>
		<div class="w-128 mt-4 rounded-sm p-8 bg-gray-200">
			<form class="my-4" method="POST">
				<div>
					<label class="label text-slate-500 mr-4" for="name">Text </label>
					<input
						type="text"
						name="text"
						autocomplete="off"
						placeholder="Type here"
						class="ring-1 ring-slate-200 focus:outline-none rounded-sm input w-full"
					/>
				</div>
				<div>
					<label class="label text-slate-500 mr-4" for="name">ID </label>
					<input
						type="text"
						name="objectId"
						autocomplete="off"
						placeholder="Type here"
						class="ring-1 ring-slate-200 focus:outline-none rounded-sm input w-full"
					/>
				</div>
				<div class="h-2" />
				<div>
					<button>Post</button>
				</div>
			</form>
		</div>
	</Modal>

	<div class="text-lg">Latest Posts:</div>

	{#each posts as post}
		<div class="p-4">
			<PostWidget {post} />
		</div>
	{/each}
</div>
