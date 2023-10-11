<script lang="ts">
	import { enhance } from '$app/forms';
	import { searchForUsersToFollow, searchForUsersToUnfollow, type User } from '$lib/user';
	import Input from '../../../lib/components/forms/Input.svelte';
	import { userProfileStore } from '$lib/stores/userStore';
	import Button from '$lib/components/forms/Button.svelte';
	export let form;

	// A silly little function to tell the user if the id they entered doesnt exist.
	let canIAlert = (value: any) => {
		if (value != null) {
			if (value.error != undefined) {
				alert(value.error);
			}
		}
	};
	// If form data is returned, alert user
	$: canIAlert(form);

	let searchTextFollow: string = '';
	let searchTextUnfollow: string = '';
	let selectedUsersFollow: User[] = [
		// {
		// 	firstName: 'Tarnu',
		// 	lastName: 'KOte',
		// 	email: 'taru',
		// 	followers: [],
		// 	following: [],
		// 	uid: 'fdskl'
		// },
		// {
		// 	firstName: 'Tarnu',
		// 	lastName: 'KOte',
		// 	email: 'taru',
		// 	followers: [],
		// 	following: [],
		// 	uid: 'fdskl'
		// }
	];
	let selectedUsersUnfollow: User[] = [];
	// Functions which return a list of users that the logged In user can follow/unfollow
	let searchFollow = async (search: string) => {
		selectedUsersFollow = await searchForUsersToFollow(search, $userProfileStore?.user!);
	};
	let searchUnfollow = async (search: string) => {
		selectedUsersUnfollow = await searchForUsersToUnfollow(search, $userProfileStore?.user!);
	};
	// Reactive declaration means search runs whenever the reactive variable it
	// depends on (in this case `searchText`) changes. This is ensures that
	// list of users is always calibrated with searchText
	$: searchFollow(searchTextFollow);
	$: searchUnfollow(searchTextUnfollow);
</script>

<div class="flex flex-col pl-4 pt-4">
	<h1>SETTINGS</h1>
	<h2>Your profile:</h2>
	<!--TODO: Work out whether which of the below it will be-->
	{#if $userProfileStore?.user?.uid != '' && $userProfileStore?.user?.uid != undefined && !$userProfileStore?.loading}
		<!--Run down of users info-->
		<div>{`Uid: ${$userProfileStore?.user?.uid}`}</div>
		<div>{`First Name: ${$userProfileStore?.user?.firstName}`}</div>
		<div>{`Last Name: ${$userProfileStore?.user?.lastName}`}</div>
		<div>{`Followers: ${$userProfileStore?.user?.followers.length}`}</div>
		<div>{`Following: ${$userProfileStore?.user?.following.length}`}</div>
		<div class="h-14" />
		<!--Forms to follow or unfollow other users-->
		<div>Enter the first OR second name of your friends below, and click to follow them!</div>
		<form method="POST" action="?/follow" use:enhance class="my-2">
			<div class="flex flex-row gap-10 w-full">
				<input name="currentUid" type="hidden" value={$userProfileStore?.user?.uid} />
				<div class="w-1/2">
					<Input
						type="text"
						placeholder="uid to follow"
						autocomplete={false}
						bind:boundValue={searchTextFollow}
						onInput={() => (searchTextUnfollow = '')}
					/>
				</div>
			</div>
			<div class="flex flex-col gap-2 mt-2">
				{#each selectedUsersFollow as user}
					<input name="followedUid" type="hidden" value={user.uid} />
					<button class="w-1/2">
						<div class="bg-gray-100 py-2 px-4 w-full rounded-lg">
							{`${user?.firstName} ${user?.lastName}`}
						</div></button
					>
				{/each}
			</div>
		</form>
		<div>Or fill the input below to unfollow!</div>
		<form method="POST" action="?/unfollow" use:enhance class="my-2">
			<div class="flex flex-row gap-10 w-full">
				<input name="currentUid" type="hidden" value={$userProfileStore?.user?.uid} />
				<div class="w-1/2">
					<Input
						type="text"
						placeholder="uid to follow"
						autocomplete={false}
						bind:boundValue={searchTextUnfollow}
						onInput={() => {
							searchTextFollow = '';
						}}
					/>
				</div>
			</div>
			<div class="flex flex-col gap-2 mt-2">
				{#each selectedUsersUnfollow as user}
					<input name="followedUid" type="hidden" value={user.uid} />
					<button class="w-1/2">
						<div class="bg-gray-100 py-2 px-4 w-full rounded-lg">
							{`${user?.firstName} ${user?.lastName}`}
						</div></button
					>
				{/each}
			</div>
		</form>
	{/if}
</div>
<div class="grow" />
