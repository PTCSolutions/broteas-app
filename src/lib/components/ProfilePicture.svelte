<script lang="ts">
	import { getProfilePicture } from '$lib/storage';
	import { userProfileStore } from '$lib/stores/userStore';
	import { fade } from 'svelte/transition';
	export let uid: string | null;
	export let small: boolean = true;
	export let updatable: boolean = false;

	let fileInput;
	let files;
	let avatar: string | null;

	async function getBase64(image) {
		const reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = async (e) => {
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

{#if !updatable}
	{#await getProfilePicture(uid)}
		<div class={`${small ? 'h-10 w-10' : 'h-32 w-32'} rounded-full bg-white`} />
	{:then url}
		{#if url}
			<img
				class={`${small ? 'h-10 w-10' : 'h-32 w-32'} rounded-full overflow-hidden`}
				src={url}
				alt="avatar"
				in:fade
			/>
		{:else}
			<div class={`${small ? 'h-10 w-10' : 'h-32 w-32'} rounded-full bg-slate-400`} />
		{/if}
	{:catch error}
		<div class={`${small ? 'h-10 w-10' : 'h-32 w-32'} rounded-full bg-slate-400`} />
	{/await}
{:else}
	{#await getProfilePicture($userProfileStore?.user?.uid)}
		<div />
	{:then url}
		<div class="container h-32 w-32">
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
{/if}
