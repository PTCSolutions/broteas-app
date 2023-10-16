<script lang="ts">
	import type { User } from '$lib/user';
	import { userStore } from '$lib/stores/userStore';
	import { enhance } from '$app/forms';
	export let user: User;
	export let followed: boolean | undefined;
	// let action = () => {
	// 	if (followed == undefined) {
	// 		return null;
	// 	} else if (followed) {
	// 		return '/profile?/unfollow';
	// 	} else {
	// 		return '/profile?/follow';
	// 	}
	// };
    let route: string;
    $: route = followed ? '/profile?/unfollow' : '/profile?/follow';
</script>

<form method="POST" action={route} use:enhance>
	<input type="hidden" name="followedUid" value={user.uid} />
	<input type="hidden" name="currentUid" value={$userStore} />
	<button class="py-1 px-4 bg-blue-400 rounded text-m font-medium">
		{followed ? 'Unfollow' : 'Follow'}</button
	>
</form>
