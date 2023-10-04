<script lang="ts">
	import PostWidget from './components/PostWidget.svelte';
	import type { User } from '$lib/user';

	let user: User = {
		firstName: 'Rich',
		lastName: 'Harris',
		uid: '12345',
		email: 'richharris@music.me',
		following: ['11111'],
		followers: ['11111']
	};
</script>

<div>
	<h1>Project Broteas HOME</h1>
	<PostWidget user="Mike" />
	<div class="w-128 mt-4 rounded-sm p-8 bg-gray-200">
		<form class="my-4" method="POST">
			<div>
				<label class="label text-slate-500 mr-4" for="name">Text </label>
				<input
					type="text"
					name="text"
					placeholder="Type here"
					class="ring-1 ring-slate-200 focus:outline-none rounded-sm input w-full"
				/>
			</div>
			<div>
				<label class="label text-slate-500 mr-4" for="name">ID </label>
				<input
					type="text"
					name="objectId"
					placeholder="Type here"
					class="ring-1 ring-slate-200 focus:outline-none rounded-sm input w-full"
				/>
			</div>
			<div>
                <button>Post</button>
            </div>
		</form>
	</div>
</div>
