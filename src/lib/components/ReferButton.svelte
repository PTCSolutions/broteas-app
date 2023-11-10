<script lang="ts">
	import { Modal } from 'flowbite-svelte';
	import ReferWidget from './ReferWidget.svelte';

	let showModal = false;
</script>

<button
	on:click={() => (showModal = true)}
	class="my-1 py-1 px-2 fixed bottom-3 right-3 z-40 rounded-md bg-gray-300 dark:text-white dark:hover:bg-gray-600 text-xl text-left"
	>Share D1SCO</button
>

<Modal bind:open={showModal} outsideclose class=" w-auto">
	<ReferWidget />
</Modal>
