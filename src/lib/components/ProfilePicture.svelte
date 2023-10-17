<script lang="ts">
	import { getProfilePicture } from '$lib/storage';
	import { fade } from 'svelte/transition';
	export let uid: string | null;
	export let small: boolean = true;
</script>

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
