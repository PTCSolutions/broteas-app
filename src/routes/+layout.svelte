<script>
	import { onMount } from 'svelte';
	import '../app.css';
	import { userStore, subscribeToUser } from '$lib/stores/userStore';
	import { accessToken } from '$lib/stores/accessTokenStore';
	import { goto } from '$app/navigation';
	import { subscribeToFeedPosts } from '$lib/stores/postsStore';
	// Get uid of current user from our load function
	export let data;
	// Set access token and uid at base layout so the rest of the app can access
	let uid = data.uid;
	let access_token = data.token;
	
	onMount(() => {
		console.log(window.innerWidth)
		if (window.innerWidth < 800) {
			console.log("mobile");
			goto('/mobile');
		}
		// Set store values
		$accessToken = access_token;
		$userStore = uid;
		// Important so that user document in firestore is subscribed to
		subscribeToUser();
		subscribeToFeedPosts(uid);
	});
</script>

<slot />
