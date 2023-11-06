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
		// Check if the device is small screen (the invalidate all means the page 
		// reloads when directed so it doesnt get stuck on welcome page)
		if (window.innerWidth < 800) {
			console.log('mobile');
			goto('/mobile', { invalidateAll: true });
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
