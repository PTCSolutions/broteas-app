<script lang="ts">
	import SearchWidget from '$lib/components/SearchWidget.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import type { Song , Album, Artist} from '$lib/spotify';
	import ShareObjectWidget from '$lib/components/ShareObjectWidget.svelte';
	let showModal = false;
	let objectSelected: Song | Album | Artist;
</script>

<div class="bg-white">
	<div class="py-4 ml-4 max-w-[600px]">
	<SearchWidget bind:showModal bind:objectSelected/>
</div>
</div>


<Modal bind:showModal>
	<ShareObjectWidget object={objectSelected} objectType={objectSelected?.type}/>
</Modal>
