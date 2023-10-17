<script lang="ts">
	import PostGrid from '$lib/components/posts/PostGrid.svelte';
	import ProfileBanner from '$lib/components/user/ProfileBanner.svelte';
	import { getPostsForObject, getPostsForUser } from '$lib/post';
	import { uploadProfilePicture, getProfilePicture } from '$lib/storage';
	import { userProfileStore } from '$lib/stores/userStore';

	let fileInput;
	let files;
	let avatar: string | null;

	async function getBase64(image) {
		const reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = async (e) =>  {
			if (e.target) {
				avatar = e.target.result;
				await uploadFunction(avatar);
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
	{#if $userProfileStore?.user?.uid != '' && $userProfileStore?.user?.uid != undefined && !$userProfileStore?.loading}
		<!-- <ProfileBanner user={$userProfileStore.user} /> -->

		<div class="h-40 bg-white dark:bg-gray-600 rounded-lg p-4 flex flex-row gap-4 items-center">
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

			<div class="flex flex-col">
				<div class="flex flex-col gap-1">
					<div class="text-6xl font-semibold">
						{`${$userProfileStore.user.firstName} ${$userProfileStore.user.lastName}`}
					</div>
					<div class="text-lg font-normal">
						@{$userProfileStore.user.username}
					</div>
				</div>
				<div class="h-2" />
				<div class="flex flex-row gap-4 items-center">
					<div>Following {$userProfileStore.user.following.length}</div>
					<div>Followers {$userProfileStore.user.followers.length}</div>
				</div>
			</div>
		</div>
		<div class="h-4" />
		<div class="text-xl font-medium">Your posts:</div>
		{#await getPostsForUser($userProfileStore?.user?.uid)}
			<div>loading...</div>
		{:then posts}
			<PostGrid {posts} />
		{/await}
	{/if}
</div>
