<script lang="ts">
	import MenuItem from './MenuItem.svelte';
	import { userProfileStore } from '$lib/stores/userStore';
	import Modal from './Modal.svelte';
	import NewPost from './NewPost.svelte';

	let showModal: boolean = false;
	let showSettings: boolean = false;
</script>

<aside
	class="flex-col flex w-32 bg-gray-100 dark:bg-gray-800 dark:border-gray-600 min-h-screen p-2 border-r-2 fixed"
>
	<div class="w-full items-center flex flex-col mt-2">
		<a href="/">
			<img class="w-20 h-20" src="/BROLOGOWHITE.png" alt="" />
		</a>
	</div>
	<div class="grow" />
	<div class="flex-col flex gap-8">
		<MenuItem title="Home" href="/" />
		<!-- <MenuItem title="News" href="/news" /> -->
		<MenuItem title="Search" href="/search" />
		<button
			on:click={() => (showModal = true)}
			class="my-1 py-1 px-2 rounded-md hover:bg-gray-300 dark:text-white dark:hover:bg-gray-600 text-xl text-left"
			>New Post</button
		>
	</div>

	<div class="grow" />
	<button
		on:mouseover={() => (showSettings = !showSettings)}
		on:focus={() => (showSettings = !showSettings)}
		class="my-1 py-1 px-2 rounded-md hover:bg-gray-300 dark:text-white dark:hover:bg-gray-600 text-md text-left"
		>Settings</button
	>
	<!-- <MenuItem title="Settings" href="/settings" small={true} /> -->

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

{#if showSettings}
	<button
		on:mouseleave={() => (showSettings = false)}
		on:mouseover={() => (showSettings = true)}
		on:focus={() => (showSettings = true)}
		class=" z-30 p-2 bg-gray-100 ml-28 bottom-4 fixed rounded-lg flex flex-col border-2"
	>
		<a
			on:click={() => (showSettings = false)}
			href="/profile"
			class="my-1 py-1 px-2 rounded-md hover:bg-gray-300 dark:text-white dark:hover:bg-gray-600 text-md text-left"
			>Profile</a
		>
		<a
			on:click={() => (showSettings = false)}
			href="/account"
			class="my-1 py-1 px-2 rounded-md hover:bg-gray-300 dark:text-white dark:hover:bg-gray-600 text-md text-left"
			>Account</a
		>
	</button>
{/if}

<Modal bind:showModal>
	<NewPost />
</Modal>
