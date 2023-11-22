<script lang="ts">
	import SearchSongCard from '$lib/components/search/SearchSongCard.svelte';
	import EditAccount from '$lib/components/user/account/EditAccount.svelte';
	import SpotifySettings from '$lib/components/user/account/SpotifySettings.svelte';
	import { spotifyUser } from '$lib/stores/spotifyUserStore.js';
	import { userProfileStore } from '$lib/stores/userStore.js';
	import { onMount } from 'svelte';
	export let data;
	if (data.spotify_user) {
		$spotifyUser = data.spotify_user;
	}
	let recentJson = data.json;
	let uid = data.uid ?? '';
	let targetUrl = 'https://api.spotify.com/v1/me/player/recently-played';
	onMount(async () => {});

	async function getRecent() {
		const response = await fetch('/spotifyFetch', {
			method: 'POST',
			body: JSON.stringify({ uid, targetUrl }),
			headers: {
				'content-type': 'application/json'
			}
		});
		let json = await response.json();
		return json;
		// console.log("Fetch code: " + response.statusText);
		// console.log("Fetch RESPONSE: " + json.items[0].track.name);
	}
</script>

<div class="h-full p-4 overflow-hidden flex flex-col gap-4">
	{#if $userProfileStore?.user}
		<div class="text-4xl font-semibold">Manage your account</div>
		<EditAccount user={$userProfileStore?.user} />
		<SpotifySettings />
		<!-- {#if recentJson}
			{#each recentJson.items as item}
				<SearchSongCard song={item.track} />
			{/each}
		{/if} -->
		{#await getRecent()}
			<div>loading</div>
		{:then json}
			{#each json.items as item}
				<a href={`/songs/${item.track.id}`} class="w-full">
					<div
						class="flex-row flex bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white my-2 p-2 items-center rounded-lg w-full"
					>
						<SearchSongCard song={item.track} />
					</div></a
				>
			{/each}
		{/await}
	{/if}
</div>
