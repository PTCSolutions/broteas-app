<script lang="ts">
	import SearchWidget from '$lib/components/SearchWidget.svelte';
	import type { Song, Album, Artist } from '$lib/spotify';
	import { Modal } from 'flowbite-svelte';
	import NewPost from '$lib/components/NewPost.svelte';
	import ShareObjectWidget from '$lib/components/ShareObjectWidget.svelte';
	// Should the modal be showing
	let showModal = false;
	// Object selected on the search page
	let objectSelected: Song | Album | Artist;
</script>

<div class="bg-white">
	<div class="py-4 ml-4 max-w-[600px]">
		<!-- // On clicking object card, show modal -->
		<SearchWidget bind:objectSelected onObjectCardClicked={() => (showModal = true)} />
	</div>
</div>

<!-- Show the currently selected object in modal-->
<Modal bind:open={showModal} outsideclose class=" w-auto">
	<ShareObjectWidget object={objectSelected} objectType={objectSelected.type} bind:showModal />
</Modal>
