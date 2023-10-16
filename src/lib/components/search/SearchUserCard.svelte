<script lang="ts">
	import type { User } from '$lib/user';
    import { enhance } from '$app/forms';
	import { userStore } from '$lib/stores/userStore';
	import FollowButton from '../forms/FollowButton.svelte';
	export let user: User;
	export let followed: boolean | undefined;
	// let action = () => {
	// 	if (followed == undefined) {
	// 		return null;
	// 	} else if (followed) {
	// 		return 'profile?/unfollow';
	// 	} else {
	// 		return 'profile?/follow';
	// 	}
	// };
</script>

<div class="flex-row flex bg-gray-100 dark:bg-gray-600 dark:text-white my-2 p-2 items-center rounded-lg">
	<div class="w-12 h-12 bg-blue-500 rounded" />
	<div class="w-4" />
	<a class="text-lg font-medium hover:underline" href={`/users/${user.uid}`}>
		{`${user.firstName} ${user.lastName}`}
	</a>
	<div class="grow" />
	<FollowButton {user} {followed} />
	<!-- <form method="POST" action={action()} use:enhance>
        <input type="hidden" name="followedUid" value={user.uid}/>
        <input type="hidden" name="currentUid" value={$userStore}/>
		<button class="py-1 px-4 bg-white rounded-full text-m font-medium">
			{followed ? 'Unfollow' : 'Follow'}</button
		>
	</form> -->
</div>
