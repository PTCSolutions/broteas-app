<script lang="ts">
	import SearchWidget from '$lib/components/SearchWidget.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import NewPostWidget from '$lib/components/NewPostWidget.svelte';
	import type { Song } from '$lib/spotify';
	let showModal = false;
	let songSelected: Song;
</script>

<div class="py-4 max-w-[600px]">
	<SearchWidget bind:showModal bind:songSelected />
</div>

<Modal bind:showModal>
	<NewPostWidget song={songSelected} />
</Modal>
