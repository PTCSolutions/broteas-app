<script lang="ts">
	import SearchWidget from '../components/SearchWidget.svelte';
	import Modal from '../components/Modal.svelte';
	import NewPostWidget from '../components/NewPostWidget.svelte';
	import type { Song } from '$lib/spotify';
	let showModal = false;
	let songSelected: Song;
</script>

<div class="py-4">
	<SearchWidget bind:showModal bind:songSelected />
</div>

<Modal bind:showModal>
	<NewPostWidget song={songSelected} />
</Modal>
