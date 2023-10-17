<script lang="ts">
	import type { User } from '$lib/user';
    import { enhance } from '$app/forms';
	import { userStore } from '$lib/stores/userStore';
	import FollowButton from '../forms/FollowButton.svelte';
	export let user: User;
	export let followed: boolean | undefined;
</script>

<div class="flex-row flex bg-gray-100 dark:bg-gray-600 dark:text-white my-2 p-2 items-center rounded-lg">
	<div class="w-12 h-12 bg-blue-500 rounded" />
	<div class="w-4" />
	<div class="flex flex-col">
		<a class="text-lg font-medium hover:underline" href={`/users/${user.uid}`}>
			{`${user.username}`}
		</a>
		<div class="text-sm font-light">{`${user.firstName} ${user.lastName}`}</div>
	</div>
	
	<div class="grow" />
	<FollowButton {user} {followed} />
</div>
