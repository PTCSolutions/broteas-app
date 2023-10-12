<script>
	import MenuItem from './MenuItem.svelte';
	import { userProfileStore } from '$lib/stores/userStore';
</script>

<aside class="flex-col flex w-32 bg-gray-50 min-h-screen p-2 border-r-2 fixed">
	<div>
		<a href="/">Logo</a>
	</div>
	<div class="grow" />
	<div class="flex-col flex gap-8">
		<MenuItem title="Home" href="/" />
		<MenuItem title="News" href="/news" />
		<MenuItem title="Search" href="/search" />
	</div>

	<div class="grow" />
	<MenuItem title="Settings" href="/settings" small={true}/>

	{#if $userProfileStore?.loading}
		<div />
		<!--If there is no logged in user show Login and signup buttons-->
	{:else if $userProfileStore?.user?.uid == '' || $userProfileStore?.user?.uid == undefined}
		<MenuItem title="Login" href="/login" small={true} />
		<MenuItem title="Signup" href="/signup" small={true} />

		<!-- Otherwise if users info has loaded, show them log out button-->
	{:else}
		<MenuItem title="Logout" href="/logout" small={true} />

		<!-- Otherwise show empty row-->
	{/if}
</aside>
