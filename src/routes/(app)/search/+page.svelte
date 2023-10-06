<script lang="ts">
	import SearchWidget from '../components/SearchWidget.svelte';

	export let data;
	let accessToken: string = data?.accessToken;
</script>

<div class="py-4">
    <SearchWidget {accessToken} />
</div>

