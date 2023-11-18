<script lang="ts">
	import { enhance } from '$app/forms';
	import EditAccount from '$lib/components/user/account/EditAccount.svelte';
	import SpotifySettings from '$lib/components/user/account/SpotifySettings.svelte';
	import type { User } from '$lib/user.js';
	import { Button, Dropdown, DropdownItem, Input } from 'flowbite-svelte';

	export let data: User;
	$: user = data;
	let edit = false;
</script>

<div class="h-full p-4 overflow-hidden flex flex-col gap-4">
	{#if user}
		<div class="text-4xl font-semibold">Manage your account</div>
		<EditAccount {user} />
		<SpotifySettings {user} />
	{/if}
</div>
