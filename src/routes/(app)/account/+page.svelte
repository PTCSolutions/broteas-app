<script lang="ts">
	import { enhance } from '$app/forms';
	import type { User } from '$lib/user.js';
	import { Button, Dropdown, DropdownItem, Input } from 'flowbite-svelte';

	export let data: User;
	$: user = data;
	let edit = false;
</script>

<div class="h-full p-4 overflow-hidden flex flex-col gap-4">
	{#if user}
		<div class="text-4xl font-semibold">Manage your account</div>
		<div class="bg-white dark:bg-gray-600 rounded-lg p-4">
			<form
				class="flex flex-col gap-2"
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
						type="button"
						on:click={() => {
							edit = !edit;
						}}
						class="flex flex-col"
					>
						<span class="material-symbols-outlined text-sm"> edit </span></button
					>
				</div>
				<div>Email<span class="font-semibold ml-2">{user.email}</span></div>
				<div>Username<span class="font-semibold ml-2">{user.username}</span></div>
				<div class="flex flex-row gap-2 items-center">
					<div>First Name</div>
					{#if edit}
						<Input
							class="w-50 border-none focus:ring-0"
							name={'firstName'}
							type="text"
							value={user.firstName}
						/>
					{:else}
						<Input
							class="w-50 border-none focus:ring-0 cursor-default"
							name={'firstName'}
							type="text"
							readonly
							value={user.firstName}
						/>
					{/if}
				</div>
				<div class="flex flex-row gap-2 items-center">
					<div>Last Name</div>
					{#if edit}
						<Input
							class="w-50 border-none focus:ring-0"
							name={'lastName'}
							type="text"
							value={user.lastName}
						/>
					{:else}
						<Input
							class="w-50 border-none focus:ring-0 cursor-default"
							name={'lastName'}
							type="text"
							readonly
							value={user.lastName}
						/>
					{/if}
				</div>
				{#if edit}
					<div class="w-1/12">
						<Button type="submit" class="focus:ring-0" color="dark" size="sm">Save</Button>
					</div>
				{/if}
				<input type="hidden" value={user.uid} name="uid" />
			</form>
		</div>
	{/if}
</div>
