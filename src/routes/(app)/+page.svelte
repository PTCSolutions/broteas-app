<script lang="ts">
	import PostWidget from './components/PostWidget.svelte';
	import { NewPost } from '$lib/post';
	import type { User } from '$lib/user';
	import type { Post } from '$lib/post';
    import { serverTimestamp } from 'firebase/firestore';

	let user: User = {
		firstName: 'Rich',
		lastName: 'Harris',
		uid: '12345',
		email: 'richharris@music.me',
		following: ['11111'],
		followers: ['11111']
	};

	let post: Post = {
		postId: 'xxxxx',
		creatorId: "12345",
		date: serverTimestamp(),
		objectId: 'yyyyy',
		likes: ['11111'],
		comments: [],
	};

    
</script>

<div>
	<h1>Project Broteas HOME</h1>
	<PostWidget user="Mike" />
	<button on:click={() => NewPost(post)}> New Post </button>
</div>
