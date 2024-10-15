<script lang="ts">
	import type { User } from '$lib/user';
	import { spotifyUser } from '$lib/stores/spotifyUserStore';
	import { onMount } from 'svelte';
	onMount(() => {
		console.log($spotifyUser);
	});
</script>

<div class="bg-white dark:bg-gray-600 rounded-lg p-4">
	<div class="flex flex-col gap-3">
        <img class="w-40" src="/SpotifyLogo.png" alt="" />
		{#if $spotifyUser}
			<div>
				Your D1SCO account is connected to this Spotify account:
			</div>
			<div class="flex flex-row gap-4 items-center rounded-lg bg-gray-100 dark:bg-gray-900 p-4">
				<img src={$spotifyUser.img} class="w-20 h-20 rounded-full" alt="SPotify" />
				<div class="flex flex-col gap-1">
					<div class="text-xs">Profile</div>
					<div class="text-3xl font-bold">{$spotifyUser.name}</div>
				</div>
			</div>
		{:else}
			<div>
				Connect to your Spotify account
				<a class="underline font-bold" href="/spotify_login"> here! </a>
			</div>
		{/if}
	</div>
</div>
