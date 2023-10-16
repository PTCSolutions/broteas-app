<script lang="ts">
	import { userProfileStore } from '$lib/stores/userStore';
	import type { User } from '$lib/user';
	import { get } from 'svelte/store';
	import FollowButton from '../forms/FollowButton.svelte';
	export let user: User;

	let getName = () => {
		if (user.uid === $userProfileStore?.user?.uid) {
			return 'Your';
		} else {
			return `${user.firstName}'s`;
		}
	};
</script>

<div class="h-40 bg-white dark:bg-gray-600 rounded-lg p-4 flex flex-row gap-4 items-center">
	<!-- The image takes up all the height it can in the given space-->
	<div class="h-full aspect-square rounded-full bg-green-300">
		<!-- <img class="rounded h-full w-full" src={artist.images[0].url} alt="" /> -->
	</div>
	<div class="flex flex-col">
		<div class="flex flex-col gap-1">
			<div class="text-6xl font-semibold">
				{`${user?.firstName} ${user?.lastName}`}
			</div>
			<div class="text-lg font-normal">
				@{user?.username}
			</div>
		</div>
		<div class="h-2" />
		<div class="flex flex-row gap-4 items-center">
			<div>Following {user?.following.length}</div>
			<div>Followers {user?.followers.length}</div>
			{#if user.uid != $userProfileStore?.user?.uid}
				<FollowButton {user} followed={$userProfileStore?.user?.following?.includes(user.uid)} />
			{/if}
		</div>
	</div>
</div>
<div class="h-4" />
<div class="text-xl font-medium">{`${getName()} posts`}</div>
