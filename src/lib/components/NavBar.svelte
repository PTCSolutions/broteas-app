<script lang="ts">
	import MenuItem from './MenuItem.svelte';
	import { userProfileStore } from '$lib/stores/userStore';
	import { Modal } from 'flowbite-svelte';
	import NewPost from './new_post/NewPost.svelte';
	import MenuItemMobile from './MenuItemMobile.svelte';

	let showSettings: boolean = false;
	let showModal = false;
</script>

<!-- Wide Screen -->
<aside
	class="flex-col w-32 bg-gray-100 dark:bg-gray-800 dark:border-gray-600 min-h-screen p-2 border-r-2 fixed hidden md:flex"
>
	<div class="w-full items-center flex flex-col mt-4">
		<a href="/">
			<img class="w-[90px]" src="/D1SCO_Logo.png" alt="" />
		</a>
	</div>
	<div class="grow" />
	<div class="flex-col flex gap-4">
		<MenuItem title="Explore" href="/" />
		<MenuItem title="Feed" href="/feed" />
		<MenuItem title="Search" href="/search" />
		<button
			on:click={() => (showModal = true)}
			class="my-1 py-1 px-2 rounded-md hover:bg-gray-300 dark:text-white dark:hover:bg-gray-600 text-xl text-left"
			>New Post</button
		>
	</div>

	<div class="grow" />
	<!--TODO: Use flowbite navbar and dropdown for this-->
	<button
		on:click={() => {
			showSettings = !showSettings;
		}}
		class="my-1 py-1 px-2 rounded-md hover:bg-gray-300 dark:text-white dark:hover:bg-gray-600 text-md text-left"
		>Settings</button
	>
	<!-- <MenuItem title="Settings" href="/settings" small={true} /> -->
</aside>

<!-- Mobile -->
 <aside
	class="flex-row min-w-full h-16 bg-gray-100 dark:bg-gray-800 dark:border-gray-600 p-2 border-t-2 fixed bottom-0 md:hidden z-50"
>
	<!-- <div class="w-full items-center flex flex-row mt-4">
		<a href="/">
			<img class="w-[90px]" src="/D1SCO_Logo.png" alt="" />
		</a>
	</div> -->
	<!-- <div class="grow" /> -->
	<div class="flex-row flex gap-4">
		<MenuItemMobile title="Explore" href="/" />
		<MenuItemMobile title="Feed" href="/feed" />
		<MenuItemMobile title="Search" href="/search" />
		<button
			on:click={() => (showModal = true)}
			class="my-1 py-1 px-2 rounded-md hover:bg-gray-300 dark:text-white dark:hover:bg-gray-600 text-xl text-left"
			>New Post</button
		>
	</div>

	<div class="grow" />
	<!--TODO: Use flowbite navbar and dropdown for this-->
	<button
		on:click={() => {
			showSettings = !showSettings;
		}}
		class="my-1 py-1 px-2 rounded-md hover:bg-gray-300 dark:text-white dark:hover:bg-gray-600 text-md text-left"
		>Settings</button
	>
	<!-- <MenuItem title="Settings" href="/settings" small={true} /> -->
</aside>


{#if showSettings}
	<button
		class=" z-30 p-2 bg-gray-100 dark:bg-gray-800 ml-28 bottom-4 fixed rounded-lg flex flex-col border-2"
	>
		<a
			on:click={() => (showSettings = false)}
			href="/profile"
			class="my-1 py-1 px-2 w-full rounded-md hover:bg-gray-300 dark:text-white dark:hover:bg-gray-600 text-md text-left"
			>Profile</a
		>
		<a
			on:click={() => (showSettings = false)}
			href="/account"
			class="my-1 py-1 px-2 w-full rounded-md hover:bg-gray-300 dark:text-white dark:hover:bg-gray-600 text-md text-left"
			>Account</a
		>
		{#if $userProfileStore?.loading}
			<div />
			<!--If there is no logged in user show Login and signup buttons-->
		{:else if $userProfileStore?.user?.uid == '' || $userProfileStore?.user?.uid == undefined}
			<MenuItem title="Login" href="/login" small={true} />
			<MenuItem title="Signup" href="/signup" small={true} />
			<!-- Otherwise if users info has loaded, show them log out button-->
		{:else}
			<MenuItem title="Logout" href="/logout" small={true} logout={true} />

			<!-- Otherwise show empty row-->
		{/if}
	</button>
{/if}

<Modal bind:open={showModal} outsideclose class=" w-auto">
	<NewPost bind:showModal />
</Modal>
