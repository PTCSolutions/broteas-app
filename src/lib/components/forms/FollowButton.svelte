<script lang="ts">
	import { getUser, type User } from '$lib/user';
	import { userStore } from '$lib/stores/userStore';
	import { enhance } from '$app/forms';
	import { Button } from 'flowbite-svelte';
	export let user: User;
	export let followed: boolean | undefined;

	let route: string;
	$: route = followed ? '/profile?/unfollow' : '/profile?/follow';
</script>

<form
	method="POST"
	action={route}
	use:enhance={() => {
		return async ({ update }) => {
			update();
			const possNullUser = await getUser(user.uid);
			if (possNullUser) {
				user = possNullUser;
			}
		};
	}}
>
	<input type="hidden" name="followedUid" value={user.uid} />
	<input type="hidden" name="currentUid" value={$userStore} />
	{#if followed !== undefined}
		<Button class="bg-blue-600 hover:bg-blue-700 focus:ring-0" size="sm" type="submit">{followed ? 'Unfollow' : 'Follow'}</Button>
	{/if}
</form>
