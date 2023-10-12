<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import { onMount } from 'svelte';
	import { accessToken } from '$lib/stores/accessTokenStore';
	import { userStore, subscribeToUser } from '$lib/stores/userStore';
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

<div class="flex-row flex bg-gray-50 dark:bg-gray-800 dark:text-white">
	<NavBar />
	<div class="grow ml-32">
		<slot />
	</div>
</div>
