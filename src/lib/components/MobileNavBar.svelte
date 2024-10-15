<script>
	import { BottomNav, BottomNavItem, Skeleton, ImagePlaceholder } from 'flowbite-svelte';
	import {
		HomeSolid,
		WalletSolid,
		SearchOutline,
		PlusOutline,
        UserSettingsOutline
	} from 'flowbite-svelte-icons';
	import { page } from '$app/stores';
	import { Modal } from 'flowbite-svelte';
	import NewPost from './new_post/NewPost.svelte';
	$: activeUrl = $page.url.pathname;

	let showModal = false;
</script>

<BottomNav {activeUrl} position="fixed" classInner="grid-cols-5">
	<BottomNavItem btnName="Explore" href="/">
		<HomeSolid />
	</BottomNavItem>
	<BottomNavItem btnName="Feed" href="/feed" exact={false}>
		<WalletSolid />
	</BottomNavItem>
	<BottomNavItem btnName="Search" href="/search">
		<SearchOutline />
	</BottomNavItem>
	<BottomNavItem btnName="Post" on:click={() => (showModal = true)}>
		<PlusOutline />
	</BottomNavItem>
    <BottomNavItem btnName="Account" href="/account">
		<UserSettingsOutline />
	</BottomNavItem>
</BottomNav>

<Modal bind:open={showModal} outsideclose class=" w-auto">
	<NewPost bind:showModal />
</Modal>
