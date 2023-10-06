<script lang="ts">
	import '../../app.css';
	import NavBar from './components/NavBar.svelte';
	import { getUser } from '$lib/user';
	import type { User } from '$lib/user';
	import { userStore } from '$lib/stores/stores';
	// // Get uid of current user from our load function
	// export let data;
	// let uid = data.uid;
	$: console.log(`In layout: User is ${$userStore}`);

</script>

<NavBar />
<div class="flex-row flex">
	<div class="w-32" />
	<div class="grow">
		<slot />
	</div>
	<!--If there is no logged in user show Login and signup buttons-->
	{#if $userStore == null}
		<div class="flex flex-col">
			<div><a href="/login">Log In</a></div>
			<div><a href="/signup">Sign Up</a></div>
		</div>
		<!-- Otherwise show log out button-->
	{:else}
		<div class="flex flex-col p-4 bg-gray-50">
			<div>{`Hello ${$userStore?.firstName}`}</div>
			<div><a href="/logout">Logout</a></div>
		</div>
	{/if}
</div>
