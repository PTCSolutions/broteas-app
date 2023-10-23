<script lang="ts">
	import { enhance } from '$app/forms';
	import PostSettingsBlock from '$lib/components/user/account/PostSettingsBlock.svelte';
	import type { User } from '$lib/user.js';
	import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';

	export let data: User;
	$: user = data;
	let edit = false;

</script>

<div class="h-full p-4 overflow-hidden flex flex-col gap-4">
	{#if user}
		<div class="text-4xl font-semibold">Manage your account</div>
		<div class="bg-white dark:bg-gray-600 rounded-lg flex flex-col gap-1 p-4">
			{#if edit}
				<form
					method="POST"
					use:enhance={() => {
						return async ({ result, update }) => {
							await update({ reset: false });
							edit = false;
						};
					}}
				>
					<div class="flex flex-row gap-2 items-center">
						<div class="text-xl">Profile</div>
						<button
							on:click={() => {
								edit = !edit;
							}}
							class="flex flex-col"
						>
							<span class="material-symbols-outlined text-sm"> edit </span></button
						>
					</div>
					<div class="flex flex-row gap-2 items-center">
						<div>First Name:</div>
						<input
							name={'firstName'}
							type="text"
							class="my-1 border border-black rounded-md px-2"
							value={user.firstName}
						/>
					</div>
					<div class="flex flex-row gap-2 items-center">
						<div>Last Name:</div>
						<input
							name={'lastName'}
							type="text"
							class="my-1 border border-black rounded-md px-2"
							value={user.lastName}
						/>
					</div>
					<div>Username: {user.username}</div>
					<div>Email: {user.email}</div>
					<div class="w-1/12 mt-2"><Button>Save</Button></div>
					<input type="hidden" value={user.uid} name="uid" />
				</form>
			{:else}
				<div class="flex flex-row gap-2 items-center">
					<div class="text-xl">Profile</div>
					<button on:click={() => (edit = !edit)} class="flex flex-col">
						<span class="material-symbols-outlined text-sm"> edit </span></button
					>
				</div>
				<div>First Name: {user.firstName}</div>
				<div>Last Name: {user.lastName}</div>
				<div>Username: {user.username}</div>
				<div>Email: {user.email}</div>
			{/if}
			<!-- <div>Password: ??</div> -->
		</div>
		<PostSettingsBlock />
	{/if}
</div>
