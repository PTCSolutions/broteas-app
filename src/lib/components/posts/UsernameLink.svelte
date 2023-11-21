<script lang="ts">
	import { Popover, Button, Avatar } from 'flowbite-svelte';
	import type { User } from '$lib/user';
	import ProfilePicture from '../user/ProfilePicture.svelte';

	export let user: User;
</script>

<a id={user.uid} class="hover:underline" href={`/users/${user.uid}`}>@{user.username}</a>
<Popover
	triggeredBy={`#${user.uid}`}
	class="w-64 z-50 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800 shadow-none"
>
	<div>
		<a href={`/users/${user.uid}`} class="p-3">
			<ProfilePicture {user} />
			<div class="h-2" />
			<div class="text-base font-semibold leading-none text-gray-900 dark:text-white">
				<a href="/">{user.firstName} {user.lastName}</a>
			</div>
			<div class="mb-3 text-sm font-normal">
				@{user.username}
			</div>
			<ul class="flex text-sm font-light">
				<li class="mr-2">
					<div>
						<span class="font-semibold text-gray-900 dark:text-white">{user.following.length}</span>
						<span>Following</span>
					</div>
				</li>
				<li>
					<div>
						<span class="font-semibold text-gray-900 dark:text-white">{user.followers.length}</span>
						<span>Followers</span>
					</div>
				</li>
			</ul>
		</a>
	</div>
</Popover>
