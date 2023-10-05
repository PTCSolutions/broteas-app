<script>
	import '../../app.css';
	import NavBar from './components/NavBar.svelte';
	// Get uid of current user from our load function
	export let data;
	let uid = data.uid;
</script>

<NavBar />
<div class="flex-row flex">
	<div class="w-32"></div>
	<slot />
	<!--If there is no logged in user show Login and signup buttons-->
	{#if uid == ""}
	<div class="flex flex-col">
		<div><a href="/login">Log In</a></div>
		<div><a href="/signup">Sign Up</a></div>
	</div>
	<!-- Otherwise show log out button-->
	{:else}
	<div class="flex flex-col">
		<div>{`User: ${uid}`}</div>
		<div><a href="/logout">Logout</a></div>
	</div>
	{/if}
</div>
