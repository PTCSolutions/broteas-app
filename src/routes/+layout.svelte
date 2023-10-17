<script>
	import { onMount } from 'svelte';
	import '../app.css';
	import { userStore, subscribeToUser } from '$lib/stores/userStore';
	import { accessToken } from '$lib/stores/accessTokenStore';
	import { subscribeToMessages } from '$lib/stores/postsStore';
	import { followingFilter } from '$lib/stores/followingFilterStore';
	import { redirect } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
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
	});
	$: subscribeToMessages($followingFilter);
</script>

<slot />
