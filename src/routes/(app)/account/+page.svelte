<script lang="ts">
	import EditAccount from '$lib/components/user/account/EditAccount.svelte';
	import SpotifySettings from '$lib/components/user/account/SpotifySettings.svelte';
	import { spotifyUser } from '$lib/stores/spotifyUserStore.js';
	import { userProfileStore } from '$lib/stores/userStore.js';
	export let data;
	if (data.spotify_user) {
		$spotifyUser = data.spotify_user;
	}
</script>

<div class="h-full p-4 overflow-hidden flex flex-col gap-4">
	{#if $userProfileStore?.user}
		<div class="text-4xl font-semibold">Manage your account</div>
		<EditAccount user={$userProfileStore?.user} />
		<SpotifySettings />
	{/if}
</div>
