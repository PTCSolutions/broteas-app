<script lang="ts">
	import '../../app.css';
	import NavBar from './components/NavBar.svelte';

	import { onMount, setContext } from 'svelte';
	import { accessToken } from '$lib/stores/accessTokenStore';
	import { userStore, userProfileStore } from '$lib/stores/userStore';
	import { fade } from 'svelte/transition';
	// Get uid of current user from our load function
	export let data;
	// Set access token and uid at base layout so the rest of the app can access
	let uid = data.uid;
	let access_token = data.token;
	onMount(() => {
		$accessToken = access_token;
		$userStore = uid;
	});
</script>

<NavBar />
<div class="flex-row flex">
	<div class="w-32 m-2" />
	<div class="w-2" />

	<div class="grow">
		<slot />
	</div>
	<div class="w-1/12">
		{#if $userProfileStore?.loading}
		<div class="flex flex-col p-4 bg-gray-50" />
		<!--If there is no logged in user show Login and signup buttons-->
		{:else if $userProfileStore?.user?.uid == '' || $userProfileStore?.user?.uid == undefined}
			<div class="flex flex-col">
				<div><a href="/login">Log In</a></div>
				<div><a href="/signup">Sign Up</a></div>
			</div>
		<!-- Otherwise if users info has loaded, show them log out button-->
		{:else}
			<div in:fade class="flex flex-col p-4 bg-gray-50">
				<div>{`Hello ${$userProfileStore?.user?.firstName}`}</div>
				<div><a href="/logout">Logout</a></div>
			</div>
			<!-- Otherwise show empty row-->
		{/if}
	</div>
</div>
