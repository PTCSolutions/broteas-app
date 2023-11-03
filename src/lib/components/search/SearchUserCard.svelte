<script lang="ts">
	import type { User } from '$lib/user';
	import { enhance } from '$app/forms';
	import { userStore } from '$lib/stores/userStore';
	import FollowButton from '../forms/FollowButton.svelte';
	export let user: User;
	export let followed: boolean | undefined;
</script>

<a href={`/users/${user.uid}`}>
	<div
		class="flex-row flex bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white my-2 p-2 items-center rounded-lg"
	>
		<div class="w-12 h-12 bg-blue-500 rounded" />
		<div class="w-4" />
		<div class="flex flex-col">
			<div class="text-lg font-medium">
				{`${user.username}`}
			</div>
			<div class="text-sm font-light">{`${user.firstName} ${user.lastName}`}</div>
		</div>

		<div class="grow" />
		<FollowButton {user} {followed} />
	</div>
</a>
