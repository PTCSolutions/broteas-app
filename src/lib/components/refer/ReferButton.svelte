<script lang="ts">
	import { Modal } from 'flowbite-svelte';
	import ReferWidget from './ReferWidget.svelte';

	let showModal = false;

</script>

<button
	on:click={() => (showModal = true)}
	class="py-1 px-2 fixed bottom-3 right-3 z-40 overflow-hidden w-10 h-10 hover:w-40 transition-all rounded-md bg-blue-300 dark:bg-blue-600 dark:text-white text-lg text-left"
	><div class="flex flex-row items-center gap-2">
		<span class="material-symbols-outlined"> featured_seasonal_and_gifts </span>
		<div class="whitespace-nowrap">Share D1SCO</div>
	</div></button
>

<Modal bind:open={showModal} outsideclose class=" w-auto">
	<ReferWidget />
</Modal>
