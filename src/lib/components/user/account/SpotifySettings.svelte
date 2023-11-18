<script lang="ts">
	import type { User } from "$lib/user";

    export let user: User
    let spotifyUser = false;
</script>

<div class="bg-white dark:bg-gray-600 rounded-lg p-4">
    <div class="flex flex-col gap-2">
        <div class="flex flex-row gap-2 items-center mb-2">
            <div class="text-xl">Spotify</div>
        </div>
        {#if spotifyUser}
        <div>You are logged into spotify as: <span class="font-semibold ml-2">{user.email}</span></div>
        {:else}
<div> Connect to spotify here!</div>
        {/if}
    </div>
</div>