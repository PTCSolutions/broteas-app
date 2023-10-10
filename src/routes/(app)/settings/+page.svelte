<script lang="ts">
	import { enhance } from '$app/forms';
	import type { User } from '$lib/user';
	import Input from '../components/forms/Input.svelte';
	import { userStore, userProfileStore } from '$lib/stores/userStore';

	// Get User from load page, and form data from form actions
	export let data: User | null;
	let user = data;
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
</script>

<div class="flex flex-col">
	<h1>SETTINGS</h1>
	<h2>Your profile:</h2>
	<!--TODO: Solve error when no logged in user-->
	{#if $userStore?.uid != ""}
	<!--Run down of users info-->
		<div>{`Uid: ${user?.uid}`}</div>
		<div>{`First Name: ${user?.firstName}`}</div>
		<div>{`Last Name: ${user?.lastName}`}</div>
		<div>{`Followers: ${user?.followers.length}`}</div>
		<div>{`Following: ${user?.following.length}`}</div>
		<div class="h-14" />
		<!--Forms to follow or unfollow other users-->
		<div>Enter the uid of your friends below, and click the button to follow them!</div>
		<form method="POST" action="?/follow" use:enhance>
			<div class="flex flex-row gap-10 w-full">
				<input name="currentUid" type="hidden" value={user?.uid} />
				<div class="w-1/2">
					<Input id="followedUid"
					type="text"
					placeholder="uid to follow"
					/>
				</div>
				<button
					class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
					>Follow!</button
				>
			</div>
		</form>
		<div>Or unfollow them!</div>
		<form method="POST" action="?/unfollow" use:enhance>
			<div class="flex flex-row gap-10 w-full">
				<input name="currentUid" type="hidden" value={user?.uid} />
				<div class="w-1/2">
					<Input id="followedUid"
					type="text"
					placeholder="uid to unfollow"
					/>
				</div>
				<button
					class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
					>Unfollow!</button
				>
			</div>
		</form>
	{/if}
</div>
<div class="grow" />
