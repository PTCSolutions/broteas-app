<script lang="ts">
	import '../../app.css';
	import NavBar from './components/NavBar.svelte';
	import { getUser } from '$lib/user';
	import type { User } from '$lib/user';
	import { onMount, setContext } from 'svelte';
	import {accessToken} from '$lib/stores/accessToken'
	// Get uid of current user from our load function
	export let data;
	let uid = data.uid;
	let access_token = data.token;
	onMount(() => {
		$accessToken = access_token;
	})
	// Set the uid for the user in context, so it can be accessed downstream in the component tree
	setContext('uid', uid);
	// Get a user object from the uid loaded in
	let currentUser: User | null;
	getUser(uid).then((user) => {
		currentUser = user;
	});
</script>

<NavBar />
<div class="flex-row flex">
	<div class="w-32 m-2" />
	<div class="w-2"></div>

	<div class="grow">
		<slot />
	</div>
	<!--If there is no logged in user show Login and signup buttons-->
	{#if uid == ''}
		<div class="flex flex-col">
			<div><a href="/login">Log In</a></div>
			<div><a href="/signup">Sign Up</a></div>
		</div>
		<!-- Otherwise show log out button-->
	{:else}
		<div class="flex flex-col p-4 bg-gray-50">
			<div>{`Hello ${currentUser?.firstName}`}</div>
			<div><a href="/logout">Logout</a></div>
		</div>
	{/if}
</div>
