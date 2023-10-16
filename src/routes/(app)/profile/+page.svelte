<script lang="ts">
	import PostGrid from '$lib/components/posts/PostGrid.svelte';
	import ProfileBanner from '$lib/components/user/ProfileBanner.svelte';
	import { getPostsForObject, getPostsForUser } from '$lib/post';
	import { uploadProfilePicture, getProfilePicture } from '$lib/storage';
	import { userProfileStore } from '$lib/stores/userStore';

	let fileInput;
	let files;
	let avatar: string | null;

	function getBase64(image) {
		const reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			if (e.target) {
				avatar = e.target.result;
			}
		};
	}

	async function uploadFunction(imgBase64: string) {
		const data = {};
		const imgData = imgBase64.split(',');
		data['image'] = imgData[1];
		console.log(data);
		if (
			$userProfileStore?.user?.uid != '' &&
			$userProfileStore?.user?.uid != undefined &&
			!$userProfileStore?.loading
		) {
			await uploadProfilePicture(imgData[1], $userProfileStore.user.uid);
		}
	}
</script>

<div class="h-full p-4 overflow-hidden flex flex-col">
	{#if avatar}
		<button on:click={() => uploadFunction(avatar)}> Upload </button>
	{/if}

	{#await getProfilePicture($userProfileStore?.user?.uid)}
		<div />
	{:then url}
		<div class="container">
			<input
				class="hidden"
				type="file"
				accept=".png,.jpg"
				bind:files
				bind:this={fileInput}
				on:change={() => getBase64(files[0])}
			/>
			<button class="hover:brightness-75" on:click={() => fileInput.click()}>
				{#if avatar}
					<img class="h-32 w-32 rounded-full overflow-hidden" src={avatar} alt="avatar" />
				{:else if url}
					<img class="h-32 w-32 rounded-full overflow-hidden" src={url} alt="avatar" />
				{:else}
					<div class="h-32 w-32 rounded-full bg-slate-400" />
				{/if}
			</button>
		</div>
	{/await}

	{#if $userProfileStore?.user?.uid != '' && $userProfileStore?.user?.uid != undefined && !$userProfileStore?.loading}
		<ProfileBanner user={$userProfileStore.user} />
		{#await getPostsForUser($userProfileStore?.user?.uid)}
			<div>loading...</div>
		{:then posts}
			<PostGrid {posts} />
		{/await}
	{/if}
</div>
