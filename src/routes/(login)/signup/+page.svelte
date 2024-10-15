<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Input from '$lib/components/forms/Input.svelte';
	import LoginButton from '$lib/components/forms/LoginButton.svelte';
	interface Form {
		error: string;
		location: string;
	}
	let form: Form;
</script>

<!-- TODO: Get this to Use progressive enhancement so that we can get nice transitions if js enabled-->
<form
	class="z-10 md:fixed md:right-0 top-0 md:w-1/2 md:px-12 md:py-20 h-full mx-4 mt-8 md:m-0"
	method="POST"
	use:enhance={() => {
		return ({ result, update }) => {
			form = result.data;
			update();
		};
	}}
>
	<div class="md:p-12 p-6 w-full gap-6 flex flex-col h-full justify-center bg-white rounded-xl">
		<div class="text-6xl font-bold">Sign up</div>
		<div class="flex gap-4">
			<div class="w-1/2">
				<Input id="firstName" type="text" placeholder="First Name" required={true} />
			</div>
			<div class="w-1/2">
				<Input id="lastName" type="text" placeholder="Last Name" required={true} />
			</div>
		</div>
		<div class="flex flex-col gap-2">
			<Input id="username" type="text" placeholder="Username" />
			{#if form?.error != undefined && form?.location == 'username'}
				<!-- TODO: Have used normal css because cant get tailwind to work-->
				<div class="text-red-500">{form.error}</div>
			{/if}
		</div>
		<div class="flex flex-col gap-2">
			<Input id="email" type="email" placeholder="Email" />
			{#if form?.error != undefined && form?.location == 'email'}
				<!-- TODO: Have used normal css because cant get tailwind to work-->
				<div class="text-red-500">{form.error}</div>
			{/if}
		</div>
		<div class="flex flex-col gap-2">
			<Input id="password" type="password" placeholder="Password" />
			{#if form?.error != undefined && form?.location == 'password'}
				<!-- TODO: Have used normal css because cant get tailwind to work-->
				<div class="text-red-500">{form.error}</div>
			{/if}
		</div>
		<div class="flex flex-col gap-2">
			<!-- <div class="text-lg">To sign up to D1SCO use an invite code from one of your friends!</div> -->
			<Input
				id="code"
				type="text"
				placeholder="Invite Code"
				unboundValue={$page.url.searchParams.get('c') || ''}
			/>
			{#if form?.error != undefined && form?.location == 'code'}
				<!-- TODO: Have used normal css because cant get tailwind to work-->
				<div class="text-red-500">{form.error}</div>
			{/if}
		</div>
		<div class="w-full"><LoginButton text="Join" /></div>
		<div>
			Already have an account? <a class="text-blue-500 font-medium" href="/login">Login</a>
		</div>
	</div>
</form>
