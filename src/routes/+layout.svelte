<script>
	import { onMount } from 'svelte';
	import '../app.css';
	import { userStore, subscribeToUser } from '$lib/stores/userStore';
	import { accessToken } from '$lib/stores/accessTokenStore';
	// Get uid of current user from our load function
	export let data;
	// Set access token and uid at base layout so the rest of the app can access
	let uid = data.uid;
	let access_token = data.token;
	onMount(() => {
		// Set store values
		$accessToken = access_token;
		$userStore = uid;
		// Important so that user document in firestore is subscribed to
		subscribeToUser();
	});
</script>

<slot />
