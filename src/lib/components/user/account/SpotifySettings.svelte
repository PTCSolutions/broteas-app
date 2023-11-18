<script lang="ts">
	import type { User } from '$lib/user';
    import {spotifyUser} from "$lib/stores/spotifyUserStore"
	import { onMount } from 'svelte';
    onMount(() => {
        console.log($spotifyUser);
    })
</script>

<div class="bg-white dark:bg-gray-600 rounded-lg p-4">
	<div class="flex flex-col gap-2">
		<div class="flex flex-row gap-2 items-center mb-2">
			<div class="text-xl">Spotify</div>
		</div>
		{#if $spotifyUser}
			<div>
				You are logged into spotify as: <span class="font-semibold ml-2">{$spotifyUser.name}</span>
			</div>
            <img src={$spotifyUser.img} class="w-28" alt="SPotify" />
		{:else}
			<div>
                Connect to spotify
				<a
                class="underline"
					href="/spotify_login"
					> here!
				</a>
			</div>
		{/if}
	</div>
</div>
